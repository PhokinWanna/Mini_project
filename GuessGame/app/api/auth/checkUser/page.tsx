import { getSession } from "@/utils/loginUser";
import { redirect } from "next/navigation";

export default async function checkUser() {
  const user = await getSession();

  if (user) {
    redirect("/game"); // If logged in, go to the game page
  } else {
    redirect("/api/auth/login"); // If not logged in, go to login page
  }

  return null;
}
