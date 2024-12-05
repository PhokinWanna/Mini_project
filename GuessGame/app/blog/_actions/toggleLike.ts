'use server'
import prisma from "@/utils/db";
import { getSession } from "@/utils/loginUser";

export async function toggleLike(postId: number) {
  const user = await getSession(); // Get the logged-in user
  if (!user) {
    throw new Error("User is not logged in.");
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId,
      },
    },
  });

  if (existingLike) {
    // Unlike the post: Remove the like
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: user.id,
          postId,
        },
      },
    });

    // Decrement the score of the post
    await prisma.post.update({
      where: { id: postId },
      data: { score: { decrement: 1 } },
    });
  } else {
    // Like the post: Add the like
    await prisma.like.create({
      data: {
        userId: user.id,
        postId,
      },
    });

    // Increment the score of the post
    await prisma.post.update({
      where: { id: postId },
      data: { score: { increment: 1 } },
    });
  }
}