"use client"
import { useFormState } from "react-dom"
import register from "./register"
import { redirect } from "next/navigation"
import Link from "next/link"
import SubmitButton from "@/components/SubmitButton"
import {style} from "@/app/constants/style"

export default function RegisterPage() {

    const [data, action] = useFormState(register, {})

    if (data.message) {
        redirect("/api/auth/login")
    }

    return (
        // <div>
        //     Register
        //     <hr />
        //     <form action={action} className="mt-4">
        //         <div className="flex flex-col mb-2">
        //             <label htmlFor="name">Name</label>
        //             <input className={style} type="text" name="name" id="name" required />
        //             {data.error?.name && <div className="text-red-600">{data.error?.name[0]}</div>}
        //         </div>
        //         <div className="flex flex-col mb-2">
        //             <label htmlFor="email">Email</label>
        //             <input className={style} type="email" name="email" id="email" required />
        //             {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
        //         </div>
        //         <div className="flex flex-col mb-6">
        //             <label htmlFor="password">Password</label>
        //             <input className={style} type="password" name="password" id="password" required />
        //             {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
        //         </div>
        //         <div>
        //             {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
        //         </div>
        //         <div>
        //             {data.message ? <p>{data.message}</p> : <SubmitButton label="Register" />}
        //         </div>
        //     </form>
        // </div>
        <div className="max-w-md mx-auto mt-10">
        <h2 className="text-center text-7xl font-bold">Register</h2>
        <form action={action} className="mt-4">
        <div className="flex flex-col text-xl mb-2">
            <label htmlFor="name">Name</label>
            <input className={style} type="name" name="name" id="name" required />
            {data.error?.name && <div className="text-red-600">{data.error?.name[0]}</div>}
            </div>
          <div className="flex flex-col text-xl mb-2">
            <label htmlFor="email">Email</label>
            <input className={style} type="email" name="email" id="email" required />
            {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
          </div>
          <div className="flex flex-col text-xl mb-4">
            <label htmlFor="password">Password</label>
            <input className={style} type="password" name="password" id="password" required />
            {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
          </div>
          
          <div>
            {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
          </div>
          <div>
            {data.message ? <p>{data.message}</p> : <SubmitButton label="Register" />}
          </div>
        </form>
      </div>
    )
}




