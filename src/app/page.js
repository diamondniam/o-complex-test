import Cart from "@/components/cart";
import Products from "@/components/products";
import Reviews from "@/components/reviews";

export default function Home() {
  return (
    <div className="gapL">
      <Reviews />

      <Cart />

      <Products />
    </div>
  );
}
