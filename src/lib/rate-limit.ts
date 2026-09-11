export class RateLimiter {
  private tokens: Map<string, number> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userTokens = this.tokens.get(identifier) || 0;

    if (userTokens < this.maxRequests) {
      this.tokens.set(identifier, userTokens + 1);
      return true;
    }

    return false;
  }

  reset(identifier: string): void {
    this.tokens.delete(identifier);
  }
}

export const apiLimiter = new RateLimiter(100, 60000);
