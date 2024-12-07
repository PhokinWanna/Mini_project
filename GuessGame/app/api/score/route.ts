import { NextResponse } from "next/server";
import prisma from "../../../utils/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { value, userId } = body;

    const newScore = await prisma.score.create({
      data: {
        value,
        userId,
      },
    });

    return NextResponse.json({ success: true, newScore });
  } catch (error) {
    console.error("Error saving score:", error);

    // Ensure error is handled properly
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
