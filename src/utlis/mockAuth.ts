// Forced mock authentication: no Supabase, no OAuth, no network.
// A signed-in visitor is always the demo admin user.

import type { Session, User } from "@supabase/supabase-js";

export const MOCK_SESSION_COOKIE = "mock_session";
export const MOCK_TOKEN_COOKIE = "sb-access-token";
export const MOCK_ACCESS_TOKEN = "mock-access-token";
export const MOCK_USER_ID = "demo-customer";
export const MOCK_USER_EMAIL = "demo@clothingstore.dev";

export const mockUser = {
  id: MOCK_USER_ID,
  aud: "authenticated",
  role: "authenticated",
  email: MOCK_USER_EMAIL,
  email_confirmed_at: "2025-01-15T10:00:00.000Z",
  phone: "",
  confirmed_at: "2025-01-15T10:00:00.000Z",
  last_sign_in_at: "2025-01-15T10:00:00.000Z",
  app_metadata: { provider: "mock", providers: ["mock"] },
  user_metadata: {
    role: "admin",
    full_name: "Demo User",
    email: MOCK_USER_EMAIL,
    avatar_url: "/user.svg",
  },
  identities: [],
  created_at: "2025-01-15T10:00:00.000Z",
  updated_at: "2025-01-15T10:00:00.000Z",
} as unknown as User;

export const mockSession = {
  access_token: MOCK_ACCESS_TOKEN,
  token_type: "bearer",
  expires_in: 86400,
  expires_at: Math.floor(Date.now() / 1000) + 86400,
  refresh_token: "mock-refresh-token",
  user: mockUser,
} as unknown as Session;

export const mockAuthCookies = () => [
  { name: MOCK_SESSION_COOKIE, value: "authenticated" },
  { name: MOCK_TOKEN_COOKIE, value: MOCK_ACCESS_TOKEN },
];

export function readCookie(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

export function hasMockSession(cookieHeader: string | undefined) {
  return Boolean(
    readCookie(cookieHeader, MOCK_SESSION_COOKIE) ||
      readCookie(cookieHeader, MOCK_TOKEN_COOKIE),
  );
}

/* ------------------------------- browser ------------------------------- */

type AuthListener = (event: string, session: Session | null) => void;
const listeners = new Set<AuthListener>();

function browserCookie(name: string) {
  if (typeof document === "undefined") return null;
  return readCookie(document.cookie, name);
}

function emit(event: string, session: Session | null) {
  listeners.forEach((listener) => listener(event, session));
}

export function signInMock() {
  if (typeof document === "undefined") return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${MOCK_SESSION_COOKIE}=authenticated; path=/; max-age=604800${secure}`;
  document.cookie = `${MOCK_TOKEN_COOKIE}=${MOCK_ACCESS_TOKEN}; path=/; max-age=604800${secure}`;
  emit("SIGNED_IN", mockSession);
}

export function signOutMock() {
  if (typeof document === "undefined") return;
  document.cookie = `${MOCK_SESSION_COOKIE}=; path=/; max-age=0`;
  document.cookie = `${MOCK_TOKEN_COOKIE}=; path=/; max-age=0`;
  emit("SIGNED_OUT", null);
}

export function createMockBrowserClient() {
  const currentUser = () => (browserCookie(MOCK_SESSION_COOKIE) ? mockUser : null);
  const currentSession = () =>
    browserCookie(MOCK_SESSION_COOKIE) ? mockSession : null;

  return {
    auth: {
      async getUser(_jwt?: string) {
        const user = currentUser();
        return user
          ? { data: { user }, error: null }
          : {
              data: { user: null },
              error: { message: "Auth session missing!", name: "AuthSessionMissingError" },
            };
      },
      async getSession() {
        return { data: { session: currentSession() }, error: null };
      },
      async signInWithOAuth(_options?: unknown) {
        signInMock();
        if (typeof window !== "undefined") window.location.assign("/");
        return { data: { provider: "mock", url: "/" }, error: null };
      },
      async signInWithIdToken(_options?: unknown) {
        signInMock();
        return { data: { user: mockUser, session: mockSession }, error: null };
      },
      async exchangeCodeForSession(_code?: string) {
        signInMock();
        return { data: { user: mockUser, session: mockSession }, error: null };
      },
      async signOut() {
        signOutMock();
        return { error: null };
      },
      onAuthStateChange(callback: AuthListener) {
        listeners.add(callback);
        callback("INITIAL_SESSION", currentSession());
        return {
          data: {
            subscription: {
              unsubscribe: () => {
                listeners.delete(callback);
              },
            },
          },
        };
      },
    },
  };
}

/* -------------------------------- server -------------------------------- */

export function createMockServerClient(
  cookieValue: (name: string) => string | undefined = () => undefined,
) {
  const signedIn = Boolean(
    cookieValue(MOCK_SESSION_COOKIE) || cookieValue(MOCK_TOKEN_COOKIE),
  );

  return {
    auth: {
      async getUser() {
        return signedIn
          ? { data: { user: mockUser }, error: null }
          : {
              data: { user: null },
              error: { message: "Auth session missing!", name: "AuthSessionMissingError" },
            };
      },
      async getSession() {
        return { data: { session: signedIn ? mockSession : null }, error: null };
      },
      async signOut() {
        return { error: null };
      },
      async exchangeCodeForSession() {
        return { data: { user: mockUser, session: mockSession }, error: null };
      },
      onAuthStateChange() {
        return {
          data: { subscription: { unsubscribe: () => {} } },
        };
      },
    },
  };
}
