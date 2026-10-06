import { NextResponse, type NextRequest } from "next/server";
import { mockAuthCookies } from "@/utlis/mockAuth";

// MVP mock: there is no OAuth provider, so any visit to the callback simply
// signs the demo customer in.
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const response = NextResponse.redirect(`${url.origin}/post-auth-loading`);

  for (const { name, value } of mockAuthCookies()) {
    response.cookies.set(name, value, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return response;
}
