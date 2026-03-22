const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = "vibeclod <noreply@vibeclod.com>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://vibeclod.com";

export async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) return; // Skip if no key configured

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

// ---------------------
// Shared inline styles
// ---------------------

const emailWrapper = `
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAF6F0;
  padding: 40px 20px;
  color: #2D2016;
`;

const card = `
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 32px;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid #E8E0D4;
`;

const ctaButton = `
  display: inline-block;
  background-color: #E8A445;
  color: #FFFFFF;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 28px;
  border-radius: 12px;
  margin-top: 24px;
`;

const footerText = `
  text-align: center;
  font-size: 12px;
  color: #8B7355;
  margin-top: 24px;
`;

// ---------------------
// Email templates
// ---------------------

export function welcomeEmail(name: string): { subject: string; html: string } {
  const firstName = name?.split(" ")[0] || "there";

  return {
    subject: "Welcome to vibeclod! \uD83C\uDFAE",
    html: `
      <div style="${emailWrapper}">
        <div style="${card}">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #E8A445, #D4932E); width: 48px; height: 48px; border-radius: 12px; line-height: 48px; text-align: center;">
              <span style="color: white; font-weight: bold; font-size: 20px;">V</span>
            </div>
          </div>

          <h1 style="font-size: 24px; font-weight: 700; color: #2D2016; margin: 0 0 8px 0;">
            Hey ${firstName}!
          </h1>

          <p style="font-size: 16px; color: #E8A445; font-weight: 600; margin: 0 0 16px 0;">
            You're now a vibe coder.
          </p>

          <p style="font-size: 14px; color: #4A3728; line-height: 1.6; margin: 0 0 8px 0;">
            Here's how it works:
          </p>

          <ol style="font-size: 14px; color: #4A3728; line-height: 1.8; padding-left: 20px; margin: 0 0 16px 0;">
            <li>Connect your GitHub repo in Settings</li>
            <li>Complete missions by building real code with AI</li>
            <li>Push to GitHub and we verify your work</li>
            <li>Level up, earn XP, and keep your streak alive</li>
          </ol>

          <p style="font-size: 14px; color: #4A3728; line-height: 1.6; margin: 0;">
            Worlds 0-1 are free — 6 levels to get you shipping. By Level 22, you'll have a live, paying product.
          </p>

          <div style="text-align: center;">
            <a href="${APP_URL}/dashboard" style="${ctaButton}">
              Start Level 1
            </a>
          </div>
        </div>

        <p style="${footerText}">
          vibeclod — Learn to ship software with AI
        </p>
      </div>
    `,
  };
}

export function levelCompleteEmail(
  name: string,
  levelTitle: string,
  xpEarned: number,
  nextLevelTitle?: string
): { subject: string; html: string } {
  const firstName = name?.split(" ")[0] || "there";

  return {
    subject: `Level passed! +${xpEarned} XP \u26A1`,
    html: `
      <div style="${emailWrapper}">
        <div style="${card}">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 48px;">🎉</span>
          </div>

          <h1 style="font-size: 22px; font-weight: 700; color: #2D2016; margin: 0 0 8px 0; text-align: center;">
            Nice work, ${firstName}!
          </h1>

          <p style="font-size: 14px; color: #4A3728; line-height: 1.6; text-align: center; margin: 0 0 16px 0;">
            You passed <strong>${levelTitle}</strong> and earned
            <span style="color: #E8A445; font-weight: 700;">${xpEarned} XP</span>.
          </p>

          <div style="background-color: #E8F5E8; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 16px;">
            <span style="font-size: 24px; font-weight: 700; color: #4CAF50;">+${xpEarned} XP</span>
          </div>

          ${
            nextLevelTitle
              ? `
            <p style="font-size: 14px; color: #8B7355; text-align: center; margin: 0 0 4px 0;">
              Next up:
            </p>
            <p style="font-size: 16px; font-weight: 600; color: #2D2016; text-align: center; margin: 0;">
              ${nextLevelTitle}
            </p>
          `
              : `
            <p style="font-size: 14px; color: #8B7355; text-align: center; margin: 0;">
              You're making great progress. Keep shipping!
            </p>
          `
          }

          <div style="text-align: center;">
            <a href="${APP_URL}/dashboard" style="${ctaButton}">
              Continue your journey
            </a>
          </div>
        </div>

        <p style="${footerText}">
          vibeclod — Learn to ship software with AI
        </p>
      </div>
    `,
  };
}

export function streakReminderEmail(
  name: string,
  streakDays: number
): { subject: string; html: string } {
  const firstName = name?.split(" ")[0] || "there";

  return {
    subject: `Don't lose your ${streakDays}-day streak! \uD83D\uDD25`,
    html: `
      <div style="${emailWrapper}">
        <div style="${card}">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 48px;">🔥</span>
          </div>

          <h1 style="font-size: 22px; font-weight: 700; color: #2D2016; margin: 0 0 8px 0; text-align: center;">
            ${firstName}, don't break the chain!
          </h1>

          <p style="font-size: 14px; color: #4A3728; line-height: 1.6; text-align: center; margin: 0 0 16px 0;">
            You're on a <strong style="color: #E8A445;">${streakDays}-day streak</strong> — keep it alive!
          </p>

          <div style="background-color: #FFF8F0; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 16px; border: 1px solid #F5E0C0;">
            <span style="font-size: 32px; font-weight: 700; color: #E8A445;">${streakDays}</span>
            <span style="font-size: 14px; color: #8B7355; display: block;">days in a row</span>
          </div>

          <p style="font-size: 14px; color: #8B7355; text-align: center; margin: 0;">
            Even a small push today counts. Open your level and keep shipping.
          </p>

          <div style="text-align: center;">
            <a href="${APP_URL}/dashboard" style="${ctaButton}">
              Open vibeclod
            </a>
          </div>
        </div>

        <p style="${footerText}">
          vibeclod — Learn to ship software with AI
        </p>
      </div>
    `,
  };
}
