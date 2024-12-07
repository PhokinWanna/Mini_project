
import { NextResponse } from "next/server";
import prisma from "../../../utils/db";
import { getSession } from "@/utils/loginUser";

export async function POST(req: Request) {
  const user = await getSession();

    try {
        const body = await req.json();
        const { value } = body;

        // Mock getting the user ID from the session
        // Replace with actual user ID retrieval
        const userId = 1; // Example: get user ID from session or token

        if (!userId) {
            throw new Error("User not authenticated.");
        }

        // Check if the user already has a score
        const existingScore = await prisma.score.findUnique({
            where: { userId },
        });

        let updatedScore;
        if (existingScore) {
            // Increment the user's score
            updatedScore = await prisma.score.update({
                where: { userId },
                data: { value: existingScore.value + value },
            });
        } else {
            // Create a new score entry
            updatedScore = await prisma.score.create({
                data: {
                    value,
                    userId,
                },
            });
        }

        return NextResponse.json({ success: true, updatedScore });
    } catch (error) {
        console.error("Error saving score:", error);
        const errorMessage =
            error instanceof Error ? error.message : "An unexpected error occurred";
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}