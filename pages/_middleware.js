import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedUrls = ["/", "/auth/changePassword"]
const unprotectedUrls = ["/auth/login", "/auth/signup", "/auth/reset"]

export async function middleware(req) {
  const url = req.nextUrl.pathname;
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isProtected = protectedUrls.includes(url);
  const isUnProtected = unprotectedUrls.includes(url)

  if (session && !isProtected && isUnProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (!session && isProtected && !isUnProtected) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  
  return NextResponse.next();
}