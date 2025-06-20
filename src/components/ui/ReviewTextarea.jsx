import React from "react";

export default function ReviewTextarea({ review, setReview, error }) {
  return (
    <textarea
      value={review}
      onChange={(e) => setReview(e.target.value)}
      placeholder="Escribe tu reseña aquí..."
      className={`w-full h-52 border-2 rounded-lg p-4 text-lg resize-none outline-none transition
        ${error ? "border-red-500" : "border-blue-500"}`}
    ></textarea>
  );
}