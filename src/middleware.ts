import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const protectedRoutes = [
    '/dashboard',
    '/chat',
    '/image',
    '/video',
    '/avatar',
    '/voice',
    '/files',
    '/agents',
    '/code',
    '/settings',
    '/admin',
  ];

  const pathname = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected) {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
