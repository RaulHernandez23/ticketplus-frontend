import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ rating, setRating, hovered, setHovered }) {
  return (
    <div className="flex gap-3 mb-8">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => setRating(star)}
          className="bg-transparent border-none p-0"
        >
          <Star
            fill={(hovered || rating) >= star ? "yellow" : "none"}
            stroke="gray"
            className="w-12 h-12 cursor-pointer"
          />
        </button>
      ))}
    </div>
  );
}