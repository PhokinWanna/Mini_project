"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import login from "./login";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import { style } from "@/app/constants/style";

export default function LoginPage() {
  const router = useRouter();
  const [data, action] = useFormState(login, {});

  useEffect(() => {
    if (data.message) {
      router.push("/game"); // Redirect to game page after successful login
    }
  }, [data.message, router]);

  const handleRegisterRedirect = () => {
    router.push("api/auth/register/");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-center text-2xl font-bold">Login</h2>
      <form action={action} className="mt-4">
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email</label>
          <input className={style} type="email" name="email" id="email" required />
          {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password">Password</label>
          <input className={style} type="password" name="password" id="password" required />
          {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
        </div>
        <div>
          <input className="w-6 h-6 mr-2 mb-6" type="checkbox" name="remember" id="remember" />
          <label className="align-top" htmlFor="remember">Remember me</label>
        </div>
        <div>
          {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
        </div>
        <SubmitButton label="Login" />
      </form>
      <div className="mt-4 text-center">
        <p>Don't have an account?</p>
        <button
          onClick={handleRegisterRedirect}
          className="text-blue-500 hover:underline"
        >
          Register here
        </button>
      </div>
    </div>
  );
}
