import { cookies } from "next/headers";

export async function serverFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${path}`, {
    credentials: "include",
    headers: {
      cookie: cookieHeader,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
