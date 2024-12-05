'use client'
import { useState } from "react";
import  {toggleLike}  from "@/app/blog/_actions/toggleLike";
// import prisma from "@/utils/db";

export default function LikeButton({ postId, currentScore }: { postId: number; currentScore: number }) {
    const [score, setScore] = useState(currentScore);
    const [liked, setLiked] = useState(false); // Track whether the user has liked the post
  
    const handleLikeClick = async () => {
      try {
        await toggleLike(postId); // Call the toggleLike function to update the like
        setLiked(!liked); // Toggle the like status
        setScore((prevScore) => (liked ? prevScore - 1 : prevScore + 1)); // Update the UI with the new score
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    };
  
    return (
      <div>
        <button onClick={handleLikeClick}>{liked ? "Unlike" : "Like"}</button>
        <p>Likes: {score}</p>
      </div>
    );
  }