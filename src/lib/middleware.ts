import { NextRequest, NextResponse } from 'next/server';
import { apiLimiter } from '@/lib/rate-limit';

export function withRateLimit(handler: Function) {
  return async (req: NextRequest) => {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';

    if (!apiLimiter.isAllowed(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 },
      );
    }

    return handler(req);
  };
}
