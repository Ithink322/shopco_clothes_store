"use client";
import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cartStore";
import CartProduct from "@/components/UI/CartProduct";

export const Cart = () => {
  const t = useTranslations();
  const cart = useCartStore((state) => state.cart);

  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__title"]}>{t("Cart.title")}</h2>
      <div className={styles["container__details"]}>
        {cart.length === 0 ? (
          <span className={styles["container__empty-message"]}>
            {t("Cart.Empty message")}
          </span>
        ) : (
          <div className={styles["container__list"]}>
            {cart.map((product) => (
              <CartProduct
                key={`${product.id}-${product.selectedSize}-${product.selectedColor}`}
                product={product}
              />
            ))}
          </div>
        )}
        <div className={styles["container__order-summary"]}>
          <span className={styles["container__order-summary-title"]}>
            {t(`Cart.Order Summary`)}
          </span>
          <div className={styles["container__content"]}>
            <span className={styles["container__total"]}>
              {t(`Cart.Total`)}
            </span>
            <span className={styles["container__total-text"]}></span>
          </div>
          <div className={styles["container__body"]}>
            <input
              className={styles["container__promo-code-field"]}
              placeholder={t("Cart.Add promo code")}
              type="text"
            />
            <button className={styles["container__apply-promo-code"]}>
              {t(`Cart.Apply`)}
            </button>
          </div>
          <button className={styles["container__go-to-checkout"]}>
            {t(`Cart.Go to Checkout`)}
          </button>
        </div>
      </div>
    </div>
  );
};
