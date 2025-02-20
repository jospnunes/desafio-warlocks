import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Tenta obter o token do cookie "token"
  const token = request.cookies.get("token")?.value;
  console.log("Token from NextRequest.cookies:", token);

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url), 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
