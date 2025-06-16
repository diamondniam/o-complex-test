"use client";

import { useProducts } from "@/store/useProducts";
import { useEffect, useState } from "react";
import Card from "./card";
import { useCart } from "@/store/useCart";
import { useScrollFetch } from "@/utils";
import CardSkeleton from "./cardSkeleton";

export default function Products() {
  const { products, fetch } = useProducts();
  const { addItem, removeItem } = useCart();
  const [page, setPage] = useState(1);

  const handleQuantityChange = (product, quantity) => {
    if (quantity === 0) {
      removeItem(product.id);
    } else {
      addItem({ product, quantity });
    }
  };

  useEffect(() => {
    fetch(page);
  }, []);

  useScrollFetch({
    fetchCallback: () => fetch(page + 1),
    onSuccess: () => setPage(page + 1),
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.data.length && !products.error.is
          ? products.data.map((product) => (
              <Card
                data={product}
                key={product.id}
                onChange={(quantity) => handleQuantityChange(product, quantity)}
              />
            ))
          : null}

        {(!products.data.length || products.isLoading || products.error.is) &&
          Array.from({ length: 20 }).map((_, index) => (
            <CardSkeleton key={`card-skeleton-${index}`} />
          ))}
      </div>
    </div>
  );
}
