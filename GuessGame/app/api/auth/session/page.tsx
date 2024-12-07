import { getSession } from "@/utils/loginUser";
import { redirect } from "next/navigation";

export default async function checkUser() {
  const user = await getSession();

  if (!user) {
    // Redirect to login page if not logged in
    redirect("/api/auth/login");
  } else {
    // Redirect to game page if logged in
    redirect("/game");
  }

  return null;
}
