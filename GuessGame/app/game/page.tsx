"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const [guess, setGuess] = useState("");
  const [number, setNumber] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [lives, setLives] = useState(5);
  const [isGameOver, setIsGameOver] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include", // Ensure cookies are included
        });

        if (response.status === 401) {
          // Redirect to login page if unauthorized
          router.push("/api/auth/login");
        } else if (response.status === 200) {
          // Proceed with the game if authorized
          setNumber(Math.floor(Math.random() * 100) + 1);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        router.push("/"); // Redirect to home on error
      }
    };

    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userGuess = parseInt(guess, 10);
    if (!number) return;

    if (userGuess === number) {
      setFeedback("🎉 Correct! You guessed the number.");
      setNumber(null);

      try {
        await fetch("/api/score", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `value=1`, // Use URL-encoded data instead of JSON
        });
      } catch (error) {
        console.error("Error saving score:", error);
      }

      setTimeout(() => router.push("/dashboard"), 2000);
    } else {
      setFeedback(userGuess < number ? "🔻 Too low!" : "🔺 Too high!");
      setLives((prev) => prev - 1);

      if (lives - 1 <= 0) {
        setIsGameOver(true);
      }
    }
    setGuess("");
  };

  const handleRestart = () => {
    setNumber(Math.floor(Math.random() * 100) + 1);
    setLives(5);
    setFeedback("");
    setIsGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-center text-2xl font-bold">Guess the Number</h2>
      <p className="text-center text-gray-600">Lives Remaining: {lives} ❤️</p>
      {feedback && <p className="mt-4 text-center">{feedback}</p>}

      {!isGameOver ? (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter your guess (1-100)"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Submit Guess
          </button>
        </form>
      ) : (
        <div className="text-center mt-6">
          <h3 className="text-red-500 text-xl font-bold">Game Over!</h3>
          <button onClick={handleRestart} className="mt-4 px-6 py-2 bg-green-500 text-white rounded">
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}
