import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
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
        <h1 className="text-2xl font-bold text-[#2D2016] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#8B7355] mb-8">Last updated: March 16, 2026</p>

        <div className="prose-sm space-y-6 text-[#4A3728] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">1. Overview</h2>
            <p>vibeclod is an online learning platform that teaches vibe coding — building software products with AI tools. By using vibeclod, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">2. Accounts</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must sign in with a valid GitHub account.</li>
              <li>You are responsible for your account and any activity under it.</li>
              <li>One account per person. Do not share your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">3. Free and Pro Plans</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Free</strong> — Worlds 0-1 (6 levels) are free forever.</li>
              <li><strong>Pro</strong> — One-time payment of $29 for lifetime access to all 23 levels and future content.</li>
              <li>Prices may change for new customers. Existing purchases are honored.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">4. Payments and Refunds</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Payments are processed by Whop.</li>
              <li>All sales are final. Since you get immediate access to all content upon purchase, we do not offer refunds.</li>
              <li>If you experience a technical issue preventing access, contact <a href="mailto:support@vibeclod.com" className="text-[#E8A445] underline">support@vibeclod.com</a> and we will resolve it.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">5. GitHub Access</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>We request read access to your GitHub repositories to verify level completion.</li>
              <li>We never write to, modify, or delete anything in your repositories.</li>
              <li>You can revoke access at any time via GitHub Settings &rarr; Applications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">6. AI Code Reviews</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Code snippets from your repository may be sent to Anthropic&apos;s Claude API for AI review.</li>
              <li>AI feedback is for educational purposes only and should not be treated as professional advice.</li>
              <li>We are not responsible for any issues arising from following AI suggestions in your projects.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">7. Your Content</h2>
            <p>You own all code you write. vibeclod does not claim any ownership of your projects, repositories, or code.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">8. Prohibited Use</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Do not abuse the platform (automated scripts, bots, spam).</li>
              <li>Do not attempt to bypass the paywall or manipulate verification.</li>
              <li>Do not use the platform for anything illegal.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">9. Limitation of Liability</h2>
            <p>vibeclod is provided &ldquo;as is&rdquo; without warranties. We are not liable for any damages arising from your use of the platform. Maximum liability is limited to the amount you paid ($29).</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">10. Changes</h2>
            <p>We may update these terms. Continued use of the platform after changes means you accept them.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#2D2016] mb-2">11. Contact</h2>
            <p>Questions? Email <a href="mailto:support@vibeclod.com" className="text-[#E8A445] underline">support@vibeclod.com</a>.</p>
          </section>
        </div>
      </article>
    </div>
  );
}
