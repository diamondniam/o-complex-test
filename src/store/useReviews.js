import { getErrorWithMeta, getObjectWithMeta, useFetchFn } from "@/utils";
import { create } from "zustand";

export const useReviews = create((set, get) => ({
  reviews: getObjectWithMeta({ object: [] }),

  fetch: async (page) => {
    const { reviews } = get();

    set({
      reviews: { ...reviews, isLoading: true, error: getErrorWithMeta() },
    });

    return useFetchFn({
      path: "reviews",
    })
      .then((data) => {
        const { reviews } = get();

        set({
          reviews: {
            ...reviews,
            data,
          },
        });
      })
      .catch((error) => {
        const { reviews } = get();
        set({ reviews: { ...reviews, error: getErrorWithMeta(error) } });
      })
      .finally(() => {
        const { reviews } = get();
        set({ reviews: { ...reviews, isLoading: false } });
      });
  },
}));
