"use client";

import { useReviews } from "@/store/useReviews";
import Review from "./review";
import { useEffect } from "react";
import ReviewSkeleton from "./reviewSkeleton";

export default function Reviews() {
  const { reviews, fetch } = useReviews();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {reviews.data.length && !reviews.error.is
        ? reviews.data.map((review) => <Review key={review.id} data={review} />)
        : Array.from({ length: 3 }).map((_, index) => (
            <ReviewSkeleton key={index} />
          ))}
    </div>
  );
}
