const WHOP_API_BASE = "https://api.whop.com/api/v5";

/**
 * Verify if a Whop user has a valid membership.
 * Uses the Whop REST API directly — no SDK needed.
 */
export async function verifyMembership(whopUserId: string): Promise<boolean> {
  const apiKey = process.env.WHOP_API_KEY;
  if (!apiKey) {
    console.error("WHOP_API_KEY is not set");
    return false;
  }

  try {
    const url = `${WHOP_API_BASE}/memberships?user_id=${encodeURIComponent(whopUserId)}&valid=true`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      console.error(`Whop API error: ${res.status} ${res.statusText}`);
      return false;
    }

    const data = await res.json();
    // If there's at least one valid membership, the user is paid
    return Array.isArray(data.data) && data.data.length > 0;
  } catch (error) {
    console.error("Failed to verify Whop membership:", error);
    return false;
  }
}

/**
 * Build the Whop checkout URL with user metadata.
 * Appends ?metadata[userId]={userId} so the webhook can link purchase back to our user.
 */
export function getCheckoutUrl(userId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_WHOP_CHECKOUT_URL ?? "";
  if (!baseUrl) {
    console.error("NEXT_PUBLIC_WHOP_CHECKOUT_URL is not set");
    return "/pricing";
  }

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}metadata[userId]=${encodeURIComponent(userId)}`;
}
