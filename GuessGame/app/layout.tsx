// import prisma from '@/utils/db';
import Link from 'next/link';
import { getSession } from "@/utils/loginUser";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logout from '@/components/logout';
import { style } from './constants/style';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guess it!",
  description: "Mni Project",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const user = await getSession()

  return (
    <html lang="en">
      {/* <style>
      @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Concert+One&family=Dancing+Script:wght@400..700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Concert+One&family=Dancing+Script:wght@400..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
      </style> */}
      <body>
        <header className="bg-blue-500 text-white p-4">
          <nav className="flex justify-evenly mx-auto ">
            <div className="flex row-auto">
              <a href="/">
              <img src="https://cdn-icons-png.flaticon.com/128/772/772167.png" alt=""  className='h-[35px] w-[35px]' />
              </a>
              <Link href="/" className="font-sans text-2xl">
              Mini Games
            </Link>
            </div>
              {/* <Link href="/api/auth/session">Play</Link> */}
            <Link href="/dashboard" className="flex text-center font-bold text-6xl hover:text-rose-600">Leaderboard🏆</Link>
            <div className='font-semi flex row-auto text-2xl'>
                {user ?
                    <div className='flex row-auto space-x-5 '>Wellcome, {user.name} <div className="flex row-auto"><img src="https://cdn-icons-png.flaticon.com/128/3889/3889524.png" alt="" className='h-[25px] ml-10 sm:h-[25px]' /><Logout /></div> </div> :
                    <div className='space-x-5'>
                      <Link className="" href="/api/auth/login">Login</Link><Link className="text-neutral-300" href="/api/auth/register">Register</Link>
                    </div>}
            </div>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
