import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl.clone()

    if (token?.length) {
        try {
            if (url.pathname === '/login' || url.pathname === '/register') {
                return NextResponse.redirect(new URL('/', req.url));
            }
        } catch (e) {
            const response = NextResponse.next();
            return response;
        }
    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if(!token && url.pathname === '/'){
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/','/dashboard/:path*', '/register', '/login'],
};
