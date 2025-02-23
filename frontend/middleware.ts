import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  
  const token = request.cookies.get("token")?.value;
  console.log("Token from NextRequest.cookies:", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url), 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
