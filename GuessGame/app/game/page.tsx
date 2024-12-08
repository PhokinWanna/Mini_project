"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

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
                    credentials: "include",
                });
                if (response.status === 401) {
                    router.push("/api/auth/login");
                } else if (response.status === 200) {
                    setNumber(Math.floor(Math.random() * 100) + 1);
                }
            } catch (error) {
                console.error("Error checking session:", error);
                router.push("/");
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
                const response = await fetch("/api/score", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ value: 1 }), // Replace 1 with the actual score
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error saving score:", error);
            }
            setTimeout(() => router.push("/dashboard"), 1000);
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
            {/* <style>
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Concert+One&family=Dancing+Script:wght@400..700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Concert+One&family=Dancing+Script:wght@400..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

            </style> */}
            <h2 className="text-center text-5xl font-nunito font-bold">Guess the Number</h2>
            <h3 className="text-center text-7xl mt-4 font-nunito font-bold">
              🤔
            </h3>
            <p className="mt-5 text-center text-xl text-gray-600">
               {number}Lives Remaining: {lives} ❤️
            </p>
            {feedback && <p className="mt-4 text-3xl text-center font-dancing">{feedback}</p>}
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
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded"
                    >
                        Submit Guess
                    </button>
                </form>
            ) : (
                <div className="text-center mt-6">
                    <h3 className="text-red-500 text-center text-3xl font-bold">
                        Game Over! 🥲
                    </h3>
                    <h4 className="text-red-400 text-xl text-center font-thin">
                        let's try again!!
                    </h4>
                    <button
                        onClick={handleRestart}
                        className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
                    >
                        Restart Game
                    </button>
                </div>
            )}
        </div>
    );
}