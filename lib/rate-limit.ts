export interface RateLimitInfo {
  lastTime: number;
  count: number;
}

const rateLimitMap = new Map<string, RateLimitInfo>();

/**
 * Simple in-memory rate limiter.
 * In a serverless environment (like Vercel), this Map will persist only as long as the instance stays warm.
 * For more robust limiting across instances, use Redis.
 */
export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const info = rateLimitMap.get(ip);

  if (!info) {
    rateLimitMap.set(ip, { lastTime: now, count: 1 });
    return true;
  }

  // If the window has passed, reset the count
  if (now - info.lastTime > windowMs) {
    rateLimitMap.set(ip, { lastTime: now, count: 1 });
    return true;
  }

  if (info.count < limit) {
    info.count += 1;
    return true;
  }

  return false;
}

// Cleanup old entries every hour
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [ip, info] of rateLimitMap.entries()) {
            if (now - info.lastTime > 3600000) { // 1 hour
                rateLimitMap.delete(ip);
            }
        }
    }, 600000); // Check every 10 min
}
