import { cookies } from "next/headers";
import { createMockServerClient } from "@/utlis/mockAuth";

export async function createClient() {
  const cookieStore = await cookies();

  return createMockServerClient((name) => cookieStore.get(name)?.value);
}
