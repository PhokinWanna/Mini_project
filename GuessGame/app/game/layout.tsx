// /app/game/layout.tsx
import React from "react";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-green-500 text-white py-6">
        <h1 className="text-center text-3xl font-bold ">Simple Guess The Number Game 💭</h1>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      {/* <footer className="bg-gray-200 text-center py-2 text-sm">
        &copy; {new Date().getFullYear()} Guess Number Game
      </footer> */}
    </div>
  );
}
