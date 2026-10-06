import type { NextRequest } from "next/server";
import {
  MOCK_ACCESS_TOKEN,
  hasMockSession,
  mockUser,
} from "@/utlis/mockAuth";

export async function verifyUser(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (token === MOCK_ACCESS_TOKEN || token === "mock") {
    return mockUser;
  }

  if (hasMockSession(request.headers.get("cookie") ?? undefined)) {
    return mockUser;
  }

  return null;
}
