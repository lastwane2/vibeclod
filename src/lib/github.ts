import { Octokit } from "@octokit/rest";
import type { GitHubCheck } from "@/types";

export function createOctokit(token: string) {
  return new Octokit({ auth: token });
}

interface RepoInfo {
  owner: string;
  repo: string;
}

function parseRepo(connectedRepo: string): RepoInfo {
  const [owner, repo] = connectedRepo.split("/");
  return { owner, repo };
}

/** Fetch the file tree (top-level + recursive) */
export async function getRepoTree(
  octokit: Octokit,
  connectedRepo: string,
  ref = "HEAD"
) {
  const { owner, repo } = parseRepo(connectedRepo);
  const { data } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: ref,
    recursive: "true",
  });
  return data.tree.map((item) => item.path!).filter(Boolean);
}

/** Read a single file's content from the repo */
export async function getFileContent(
  octokit: Octokit,
  connectedRepo: string,
  path: string
): Promise<string | null> {
  const { owner, repo } = parseRepo(connectedRepo);
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if ("content" in data && data.encoding === "base64") {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }
    return null;
  } catch {
    return null;
  }
}

/** Get multiple files' content */
export async function getFilesContent(
  octokit: Octokit,
  connectedRepo: string,
  paths: string[]
): Promise<{ path: string; content: string }[]> {
  const results: { path: string; content: string }[] = [];

  for (const path of paths) {
    const content = await getFileContent(octokit, connectedRepo, path);
    if (content !== null) {
      results.push({ path, content });
    }
  }

  return results;
}

/** Get commit count */
export async function getCommitCount(
  octokit: Octokit,
  connectedRepo: string,
  since?: string
): Promise<number> {
  const { owner, repo } = parseRepo(connectedRepo);
  try {
    const { data } = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: 100,
      ...(since ? { since } : {}),
    });
    return data.length;
  } catch {
    return 0;
  }
}

/** Get total file count in repo */
export async function getFileCount(
  octokit: Octokit,
  connectedRepo: string
): Promise<number> {
  const tree = await getRepoTree(octokit, connectedRepo);
  return tree.filter((p) => !p.includes("/") || !p.endsWith("/")).length;
}

/** Check if repo has deployment config */
function hasDeployConfig(filePaths: string[]): boolean {
  const deployFiles = [
    "vercel.json",
    "railway.toml",
    "Dockerfile",
    "docker-compose.yml",
    "docker-compose.yaml",
    "fly.toml",
    "render.yaml",
    "netlify.toml",
    "app.yaml",
    "Procfile",
  ];
  return filePaths.some((p) => deployFiles.includes(p));
}

export interface GitHubCheckResult {
  passed: boolean;
  details: {
    check: string;
    passed: boolean;
    message: string;
  }[];
}

/** Run all GitHub checks for a level */
export async function runGitHubChecks(
  octokit: Octokit,
  connectedRepo: string,
  checks: GitHubCheck,
  levelStartedAt?: string
): Promise<GitHubCheckResult> {
  const details: GitHubCheckResult["details"] = [];
  const tree = await getRepoTree(octokit, connectedRepo);

  // fileExists
  if (checks.fileExists) {
    for (const file of checks.fileExists) {
      const exists = tree.includes(file);
      details.push({
        check: `File exists: ${file}`,
        passed: exists,
        message: exists
          ? `Found ${file}`
          : `Missing ${file} — make sure it's pushed to your repo`,
      });
    }
  }

  // fileContains
  if (checks.fileContains) {
    for (const fc of checks.fileContains) {
      const content = await getFileContent(octokit, connectedRepo, fc.path);
      if (!content) {
        details.push({
          check: `File contains check: ${fc.path}`,
          passed: false,
          message: `Could not read ${fc.path}`,
        });
        continue;
      }
      const contentLower = content.toLowerCase();
      for (const substr of fc.contains) {
        const found = contentLower.includes(substr.toLowerCase());
        details.push({
          check: `${fc.path} contains "${substr}"`,
          passed: found,
          message: found
            ? `Found "${substr}" in ${fc.path}`
            : `"${substr}" not found in ${fc.path}`,
        });
      }
    }
  }

  // minCommits
  if (checks.minCommits) {
    const since =
      checks.commitAfter === "level_start" ? levelStartedAt : undefined;
    const count = await getCommitCount(octokit, connectedRepo, since);
    const passed = count >= checks.minCommits;
    details.push({
      check: `Minimum ${checks.minCommits} commits`,
      passed,
      message: passed
        ? `${count} commits found`
        : `Only ${count} commits — need at least ${checks.minCommits}`,
    });
  }

  // minFiles
  if (checks.minFiles) {
    const count = await getFileCount(octokit, connectedRepo);
    const passed = count >= checks.minFiles;
    details.push({
      check: `Minimum ${checks.minFiles} files`,
      passed,
      message: passed
        ? `${count} files in repo`
        : `Only ${count} files — need at least ${checks.minFiles}`,
    });
  }

  // hasPackageJson
  if (checks.hasPackageJson) {
    const exists = tree.includes("package.json");
    details.push({
      check: "Has package.json",
      passed: exists,
      message: exists
        ? "Found package.json"
        : "Missing package.json — run npm init",
    });
  }

  // hasDeploy
  if (checks.hasDeploy) {
    const has = hasDeployConfig(tree);
    details.push({
      check: "Has deployment config",
      passed: has,
      message: has
        ? "Deployment config found"
        : "No deploy config found (vercel.json, railway.toml, Dockerfile, etc.)",
    });
  }

  const allPassed = details.every((d) => d.passed);
  return { passed: allPassed, details };
}
