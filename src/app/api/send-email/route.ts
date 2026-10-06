import { NextResponse } from "next/server";

// MVP mock: no SMTP, no Redis. Messages are acknowledged and dropped.
export async function POST(req: Request) {
  const { email, message } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  return NextResponse.json({ success: true, mocked: true });
}
