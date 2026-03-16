import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[#E8E0D4]/50 bg-[#FAF6F0]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-3 sm:px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="vibeclod" className="h-8 w-8" />
            <span className="text-sm font-pixel text-[#2D2016]">vibeclod</span>
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold text-[#2D2016] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#8B7355] mb-8">Last updated: March 16, 2026</p>

        <div className="prose-sm space-y-6 text-[#4A3728] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">1. What We Collect</h2>
            <p>When you use vibeclod, we collect:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Account data</strong> — your GitHub username, email, and profile picture (via GitHub OAuth).</li>
              <li><strong>Repository data</strong> — read-only access to your public and private repos to verify level completion. We never modify your code.</li>
              <li><strong>Progress data</strong> — levels completed, XP earned, streaks, and block scores.</li>
              <li><strong>Payment data</strong> — processed by Whop. We store your plan status but never see your card details.</li>
              <li><strong>Usage data</strong> — pages visited, features used, collected via Google Analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">2. How We Use It</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and improve the vibeclod learning platform.</li>
              <li>To verify your code against level requirements via GitHub API.</li>
              <li>To track your learning progress and streaks.</li>
              <li>To process payments and manage your subscription.</li>
              <li>To send transactional emails (welcome, progress updates).</li>
              <li>To analyze usage patterns and improve the product.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">3. Third-Party Services</h2>
            <p>We use the following services:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>GitHub</strong> — authentication and code verification.</li>
              <li><strong>Whop</strong> — payment processing.</li>
              <li><strong>Anthropic (Claude)</strong> — AI code reviews. Your code snippets are sent to Claude for evaluation but are not stored by Anthropic.</li>
              <li><strong>Google Analytics</strong> — anonymous usage statistics.</li>
              <li><strong>Resend</strong> — transactional emails.</li>
              <li><strong>Railway</strong> — hosting.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">4. Data Storage</h2>
            <p>Your data is stored on servers hosted by Railway (US). We use PostgreSQL for structured data. We do not sell your data to anyone.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">5. Your Rights</h2>
            <p>You can:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Request a copy of your data.</li>
              <li>Request deletion of your account and all associated data.</li>
              <li>Revoke GitHub access at any time via GitHub Settings &rarr; Applications.</li>
            </ul>
            <p className="mt-2">To make a request, email <a href="mailto:support@vibeclod.com" className="text-[#E8A445] underline">support@vibeclod.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">6. Cookies</h2>
            <p>We use essential cookies for authentication (session tokens) and Google Analytics cookies for usage statistics. No advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">7. Changes</h2>
            <p>We may update this policy. Changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">8. Contact</h2>
            <p>Questions? Email <a href="mailto:support@vibeclod.com" className="text-[#E8A445] underline">support@vibeclod.com</a>.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
