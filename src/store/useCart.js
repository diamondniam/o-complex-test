import { getErrorWithMeta, getObjectWithMeta, useFetchFn } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create()(
  persist(
    (set, get) => ({
      items: [],
      submit: getObjectWithMeta({ object: false }),

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.product.id === item.product.id
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product.id === item.product.id ? { ...i, ...item } : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      submitOrder: async (phone) => {
        const { submit, items } = get();
        set({ submit: { ...submit, isLoading: true } });

        return useFetchFn({
          path: "order",
          method: "post",
          data: {
            phone: phone.replace(/\D/g, ""),
            cart: items
              ? items.map((item) => ({
                  id: item.product.id,
                  quantity: item.quantity,
                }))
              : [],
          },
        })
          .then(() => {
            set({ submit: { ...get().submit, data: true } });
            set({ items: [] });
          })
          .catch((error) => {
            set({
              submit: { ...get().submit, error: getErrorWithMeta(error) },
            });
          })
          .finally(() => {
            set({ submit: { ...get().submit, isLoading: false } });
          });
      },

      resetSubmit: () => set({ submit: getObjectWithMeta({ object: false }) }),

      getItem: (id) => get().items.find((item) => item.product.id === id),

      removeItem: (id) =>
        set({ items: get().items.filter((item) => item.product.id !== id) }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
