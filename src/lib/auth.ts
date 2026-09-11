import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    try {
      const session = await getServerSession();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return handler(req, session);
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
    }
  };
}
