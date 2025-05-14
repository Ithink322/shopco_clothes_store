"use client";
import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/UI/ProductCard";

export const Wishlist = () => {
  const t = useTranslations();
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <div className={styles["container"]}>
      <h1 className={styles["container__title"]}>
        {t(`WishlistPage.Wishlist`)}
      </h1>
      {wishlist.length === 0 ? (
        <span className={styles["container__empty-message"]}>
          {t(`WishlistPage.Empty message`)}
        </span>
      ) : (
        <div className={styles["container__list"]}>
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="product-card--small"
              heroClassName="product-card__hero--small"
            />
          ))}
        </div>
      )}
    </div>
  );
};
