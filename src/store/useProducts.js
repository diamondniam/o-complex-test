import { getErrorWithMeta, getObjectWithMeta, useFetchFn } from "@/utils";
import { create } from "zustand";

const PAGE_SIZE = 20;

export const useProducts = create((set, get) => ({
  products: getObjectWithMeta({ object: [], page: true }),

  fetch: async (page) => {
    const { products } = get();

    set({
      products: { ...products, isLoading: true, error: getErrorWithMeta() },
    });

    return useFetchFn({
      path: "products",
      params: { page, page_size: PAGE_SIZE },
    })
      .then((data) => {
        const { products } = get();
        const currentData = products.data;

        set({
          products: {
            ...products,
            data: [...currentData, ...data.items],
            page,
          },
        });
      })
      .catch((error) => {
        const { products } = get();
        set({ products: { ...products, error: getErrorWithMeta(error) } });
      })
      .finally(() => {
        const { products } = get();
        set({ products: { ...products, isLoading: false } });
      });
  },
}));
