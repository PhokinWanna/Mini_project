'use server'
import { NextResponse } from 'next/server';
import prisma from '../../../utils/db';

export async function GET() {
  try {
    const leaderboard = await prisma.score.findMany({
      select: {
        value: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        value: 'desc', // Sort scores in descending order
      },
      take: 10, // Limit to top 10 scores
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
