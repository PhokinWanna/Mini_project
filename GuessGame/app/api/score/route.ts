
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
        // const userId = 1; // Example: get user ID from session or token

        if (!user.id) {
            throw new Error("User not authenticated.");
        }

// Assuming `user.id` is available
const userId = user.id;

const existingScore = await prisma.score.findUnique({
    where: { userId }, // Correct field is `userId`
});

let updatedScore;
if (existingScore) {
    // Increment the user's score if they already have one
    updatedScore = await prisma.score.update({
        where: { userId },
        data: { value: existingScore.value + value },
    });
} else {
    // Create a new score if the user doesn't have one
    updatedScore = await prisma.score.create({
        data: {
            value,
            userId, // Correct field is `userId`
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