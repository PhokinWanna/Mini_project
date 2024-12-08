"use client"

import { logoutUser } from "@/utils/loginUser";

export default function Logout() {
  return (
  <button className=" text-neutral-300 font-sans mb-9 ml-2" onClick={async () => await logoutUser()}>Logout</button>)
}