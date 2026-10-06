import { NextResponse, type NextRequest } from "next/server";
import { MOCK_ACCESS_TOKEN, hasMockSession, mockUser } from "@/utlis/mockAuth";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    return response;
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  const signedIn =
    token === MOCK_ACCESS_TOKEN ||
    hasMockSession(request.headers.get("cookie") ?? undefined);

  // If user is not logged in, redirect to login
  const isLoginRoute = request.nextUrl.pathname === "/";
  if (!signedIn) {
    if (!isLoginRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  }

  const role = mockUser.user_metadata?.role;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/api/private");
  const isDashboardAdmin = request.nextUrl.pathname.startsWith("/admin");

  // protect private API routes only admin role
  if (isAdminRoute) {
    if (role !== "admin") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return response;
  }

  // protect admin/dashboard pages only admin
  if (isDashboardAdmin && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/private/:path*"],
};
