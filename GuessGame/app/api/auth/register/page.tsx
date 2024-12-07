// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // Correct import for App Router
// import bcrypt from 'bcryptjs';
// import prisma from '@/utils/db';
// import { z } from 'zod';

// const registerSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export default function RegisterPage() {
//   const router = useRouter();
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const name = formData.get('name') as string;
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     // Validate inputs with Zod
//     const result = registerSchema.safeParse({ name, email, password });
//     if (!result.success) {
//       setError(result.error.errors[0].message); // Show the first validation error
//       return;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     try {
//       await prisma.user.create({
//         data: { name, email, password: hashedPassword },
//       });
//       router.push('/auth/login');
//     } catch (err) {
//       setError("Email already exists");
//       console.error("Error is :" + err)
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-center text-2xl font-bold">Register</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" placeholder="Name" required className="w-full px-4 py-2 border" />
//         <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-2 border" />
//         <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-2 border" />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2">Register</button>
//       </form>
//     </div>
//   );
// }













// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { z } from 'zod';

// const registerSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export default function RegisterPage() {
//   const router = useRouter();
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const name = formData.get('name') as string;
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;

//     // Validate inputs with Zod
//     const result = registerSchema.safeParse({ name, email, password });
//     if (!result.success) {
//       setError(result.error.errors[0].message); // Show the first validation error
//       return;
//     }

//     try {
//       const response = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (response.ok) {
//         router.push('/auth/login');
//       } else {
//         const { error } = await response.json();
//         setError(error || 'Registration failed');
//       }
//     } catch (err) {
//       setError('An unexpected error occurred');
//       console.error('Error:', err);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h2 className="text-center text-2xl font-bold">Register</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" placeholder="Name" required className="w-full px-4 py-2 border" />
//         <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-2 border" />
//         <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-2 border" />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2">Register</button>
//       </form>
//     </div>
//   );
// }






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
        <div>
            Register
            <hr />
            <form action={action} className="mt-4">
                <div className="flex flex-col mb-2">
                    <label htmlFor="name">Name</label>
                    <input className={style} type="text" name="name" id="name" required />
                    {data.error?.name && <div className="text-red-600">{data.error?.name[0]}</div>}
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="email">Email</label>
                    <input className={style} type="email" name="email" id="email" required />
                    {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
                </div>
                <div className="flex flex-col mb-6">
                    <label htmlFor="password">Password</label>
                    <input className={style} type="password" name="password" id="password" required />
                    {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
                </div>

                {/* === Todo 4: add new user with validation === */}
                <div>
                    {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
                </div>
                <div>
                    {data.message ? <p>{data.message}</p> : <SubmitButton label="Register" />}
                </div>
            </form>
            <br /><hr />
            <Link href="/blog">Back</Link>
        </div>
    )
}




// 'use client';

// import { useFormState } from 'react-dom';
// import register from './register';
// import { redirect } from 'next/navigation';
// import Link from 'next/link';
// import SubmitButton from '@/components/SubmitButton';
// import { style } from '@/app/constants/style';

// export default function RegisterPage() {
//   const [data, action] = useFormState(register, {});

//   if (data.message) {
//     redirect('/api/auth/login');
//   }

//   return (
//     <div>
//       Register
//       <hr />
//       <form method="POST" action="/api/auth/register" className="mt-4">
//         <div className="flex flex-col mb-2">
//           <label htmlFor="name">Name</label>
//           <input className={style} type="text" name="name" id="name" required />
//           {data.error?.name && <div className="text-red-600">{data.error?.name[0]}</div>}
//         </div>
//         <div className="flex flex-col mb-2">
//           <label htmlFor="email">Email</label>
//           <input className={style} type="email" name="email" id="email" required />
//           {data.error?.email && <div className="text-red-600">{data.error?.email[0]}</div>}
//         </div>
//         <div className="flex flex-col mb-6">
//           <label htmlFor="password">Password</label>
//           <input className={style} type="password" name="password" id="password" required />
//           {data.error?.password && <div className="text-red-600">{data.error?.password[0]}</div>}
//         </div>

//         <div>
//           {data.error?.message && <div className="text-red-600">{data.error?.message}</div>}
//         </div>
//         <div>
//           {data.message ? <p>{data.message}</p> : <SubmitButton label="Register" />}
//         </div>
//       </form>
//       <br />
//       <hr />
//       <Link href="/blog">Back</Link>
//     </div>
//   );
// }
