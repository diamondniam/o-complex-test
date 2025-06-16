"use client";

import { useReviews } from "@/store/useReviews";
import Review from "./review";
import { useEffect } from "react";

export default function Reviews() {
  const { reviews, fetch } = useReviews();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {reviews.data.map((review) => (
        <Review key={review.id} data={review} />
      ))}
    </div>
  );
}
