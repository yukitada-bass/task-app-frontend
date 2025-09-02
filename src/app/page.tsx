import "server-only";
import { cookies } from "next/headers";
import { decrypt } from "../lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const session = await decrypt(accessToken);
  const userId = session?.sub && String(session.sub);

  if (userId) {
    return redirect(`/u/${userId}`);
  }

  return redirect("/login");
}
