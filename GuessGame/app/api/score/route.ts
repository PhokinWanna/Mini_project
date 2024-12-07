// import { NextResponse } from "next/server";
// import prisma from "../../../utils/db";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { value, userId } = body;

//     // Create a new score entry for the user
//     const newScore = await prisma.score.create({
//       data: {
//         value,
//         userId,
//       },
//     });

//     return NextResponse.json({ success: true, newScore });
//   } catch (error) {
//     console.error("Error saving score:", error);
//     const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
//     return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import prisma from "../../../utils/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { value } = body;

        // Mock getting the user ID from the session
        // Replace with actual user ID retrieval
        const userId = 1; // Example: get user ID from session or token

        if (!userId) {
            throw new Error("User not authenticated.");
        }

        const newScore = await prisma.score.create({
            data: {
                value,
                userId,
            },
        });

        return NextResponse.json({ success: true, newScore });
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
