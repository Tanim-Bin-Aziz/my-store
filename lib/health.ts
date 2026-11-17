// Server-side backend health probe. Used to decide whether the storefront
// renders normally or falls back to its degraded (skeleton) homepage.

const HEALTH_TTL_MS = 20_000;
const PROBE_TIMEOUT_MS = 3_000;

let cache: { healthy: boolean; at: number } | null = null;

export async function isBackendHealthy(): Promise<boolean> {
  const now = Date.now();
  if (cache && now - cache.at < HEALTH_TTL_MS) return cache.healthy;
  const healthy = await probe().catch(() => false);
  cache = { healthy, at: now };
  return healthy;
}

async function probe(): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return false;
  const res = await fetch(`${url}/auth/v1/health`, {
    headers: { apikey: key },
    cache: "no-store",
    signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
  });
  return res.ok;
}
