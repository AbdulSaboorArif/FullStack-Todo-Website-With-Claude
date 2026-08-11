export type User = {
  name: string;
  email: string;
};

const STORAGE_KEY = "seerah_qa_user";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function register(name: string, email: string, password: string): User {
  if (typeof window === "undefined") {
    throw new Error("Not available during SSR");
  }
  const usersRaw = window.localStorage.getItem("seerah_qa_users");
  const users: Record<string, { name: string; password: string }> = usersRaw
    ? (JSON.parse(usersRaw) as Record<string, { name: string; password: string }>)
    : {};

  if (users[email]) {
    throw new Error("An account with this email already exists.");
  }

  users[email] = { name, password };
  window.localStorage.setItem("seerah_qa_users", JSON.stringify(users));

  const user: User = { name, email };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function login(email: string, password: string): User {
  if (typeof window === "undefined") {
    throw new Error("Not available during SSR");
  }
  const usersRaw = window.localStorage.getItem("seerah_qa_users");
  const users: Record<string, { name: string; password: string }> = usersRaw
    ? (JSON.parse(usersRaw) as Record<string, { name: string; password: string }>)
    : {};

  // Demo account so the flow works out of the box.
  users["demo@seerah.app"] ??= { name: "Demo Learner", password: "demo1234" };

  const record = users[email];
  if (!record) {
    throw new Error("No account found with this email.");
  }
  if (record.password !== password) {
    throw new Error("Incorrect password. Please try again.");
  }

  const user: User = { name: record.name, email };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
