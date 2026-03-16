// Google Analytics event tracking

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: GTagEvent) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (!gtag) return;

  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

// ─── Pre-built events ────────────────────────────────────────

/** User completed a level */
export function trackLevelComplete(levelId: number, worldId: number, xp: number) {
  trackEvent({
    action: "level_complete",
    category: "progression",
    label: `world_${worldId}_level_${levelId}`,
    value: xp,
  });
}

/** User completed a block within a level */
export function trackBlockComplete(blockId: string, blockType: string, levelId: number) {
  trackEvent({
    action: "block_complete",
    category: "progression",
    label: `${blockType}_${blockId}`,
    value: levelId,
  });
}

/** User started a level */
export function trackLevelStart(levelId: number, worldId: number) {
  trackEvent({
    action: "level_start",
    category: "progression",
    label: `world_${worldId}_level_${levelId}`,
  });
}

/** User clicked upgrade / checkout */
export function trackUpgradeClick() {
  trackEvent({
    action: "upgrade_click",
    category: "monetization",
  });
}

/** User signed up */
export function trackSignUp() {
  trackEvent({
    action: "sign_up",
    category: "auth",
  });
}

/** User connected a repo */
export function trackRepoConnect() {
  trackEvent({
    action: "repo_connect",
    category: "onboarding",
  });
}

/** Build verification attempt */
export function trackVerifyAttempt(levelId: number, passed: boolean) {
  trackEvent({
    action: passed ? "verify_pass" : "verify_fail",
    category: "verification",
    value: levelId,
  });
}
