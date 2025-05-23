import React, { forwardRef } from "react";
import { Product } from "@/types/Product";
import styles from "./styles.module.scss";
import { useWishlistStore } from "@/store/wishlistStore";

interface ProductCardProps {
  product: Product;
  className?: string;
  heroClassName?: string;
}

function ProductCard(
  { product, className, heroClassName }: ProductCardProps,
  ref: React.Ref<HTMLDivElement>
) {
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const inWishlist = useWishlistStore((state) =>
    state.wishlist.some((p) => p.id === product.id)
  );

  return (
    <div
      ref={ref}
      key={product.id}
      className={`${styles["product-card"]} ${
        className ? styles[className] : ""
      }`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={styles["product-card__wishlist-btn"]}
      >
        <svg
          width="21"
          height="18"
          viewBox="0 0 21 18"
          fill={inWishlist ? "#000" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.4927 2.41114C18.0165 1.96386 17.4506 1.60896 16.8275 1.36681C16.2045 1.12465 15.5365 1 14.8618 1C14.1872 1 13.5191 1.12465 12.8961 1.36681C12.273 1.60896 11.7071 1.96386 11.2309 2.41114L10.5 3.10415L9.76908 2.41114C9.29286 1.96386 8.72699 1.60896 8.10392 1.36681C7.48085 1.12465 6.81284 1 6.1382 1C5.46355 1 4.79554 1.12465 4.17247 1.36681C3.5494 1.60896 2.98353 1.96386 2.50731 2.41114C0.494903 4.29472 0.3715 7.47548 2.906 9.89215L10.5 17L18.094 9.89215C20.6285 7.47548 20.5051 4.29472 18.4927 2.41114Z"
            stroke="#211D19"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <img
        className={`${styles["product-card__hero"]} ${
          heroClassName ? styles[heroClassName] : ""
        }`}
        src={product.hero}
        alt="product hero"
      />
      <span className={styles["product-card__title"]}>{product.title}</span>
      <div className={styles["product-card__prices"]}>
        <span className={styles["product-card__current-price"]}>
          {product.currentPrice}
        </span>
        <span className={styles["product-card__previous-price"]}>
          {product.previousPrice}
        </span>
        {product.discount && (
          <div className={styles["product-card__discount"]}>
            {product.discount}
          </div>
        )}
      </div>
    </div>
  );
}
export default forwardRef<HTMLDivElement, ProductCardProps>(ProductCard);
