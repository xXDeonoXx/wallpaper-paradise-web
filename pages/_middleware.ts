import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  if (pathname == '/admin') {
    return NextResponse.redirect('/admin/dashboard');
  }
}
