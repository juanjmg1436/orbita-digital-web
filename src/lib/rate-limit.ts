import "server-only";

/**
 * Límite simple de solicitudes en memoria, por identificador (IP).
 * Pensado como protección básica contra spam en el formulario de contacto.
 *
 * Nota: en entornos serverless cada instancia tiene su propia memoria, por lo
 * que el límite es "best effort" y no reemplaza una solución centralizada
 * (Redis, Upstash, etc.) si en el futuro se necesita mayor robustez.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_IDENTIFIERS = 5000;

type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const hits = new Map<string, RateLimitEntry>();

function pruneExpired(now: number) {
  for (const [key, entry] of hits) {
    if (now - entry.windowStart > WINDOW_MS) {
      hits.delete(key);
    }
  }
}

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();

  if (hits.size > MAX_TRACKED_IDENTIFIERS) {
    pruneExpired(now);
  }

  const entry = hits.get(identifier);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(identifier, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil(
      (entry.windowStart + WINDOW_MS - now) / 1000
    );
    return { allowed: false, retryAfterSeconds };
  }

  entry.count += 1;
  return { allowed: true };
}
