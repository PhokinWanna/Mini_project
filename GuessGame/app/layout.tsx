import prisma from '@/utils/db';
import Link from 'next/link';
import { getSession } from "@/utils/loginUser";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logout from '@/components/logout';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guess it!",
  description: "Mni Project",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const user = await getSession()

  return (
    <html lang="en">
      <body>
        <header className="bg-blue-500 text-white p-4">
          <nav className="flex justify-between max-w-4xl mx-auto">
            <Link href="/" className="font-bold">
              Guess Game
            </Link>
            <div className="flex space-x-4">
              <Link href="/api/auth/session">Play</Link>
              <Link href="/dashboard">Leaderboard</Link>
            </div>
            <div>
                {user ?
                    <>Hello: {user.name} | <Logout /> </> :
                    <>
                      <Link className="ml-2" href="/api/auth/login">Login</Link> | 
                      <Link className="ml-2" href="/api/auth/register">Register</Link>
                    </>}
            </div>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
