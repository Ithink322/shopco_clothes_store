"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import styles from "./styles.module.scss";
import cn from "clsx";
import Image from "next/image";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

const ProductPage = () => {
  const t = useTranslations();

  const params = useParams();
  const { id, title, locale } = params as {
    id: string;
    title: string;
    locale: string;
  };

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch(`/api/catalog/getProducts`);
      const data = await res.json();
      const found = data.find((p: Product) => p.id === Number(id));
      setProduct(found || null);
    };

    fetchProduct();
  }, [id]);

  const [selectedHero, setSelectedHero] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (product?.hero) {
      setSelectedHero(product.hero);
    }
  }, [product]);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const inWishlist = useWishlistStore((state) =>
    product ? state.wishlist.some((p) => p.id === product.id) : false
  );

  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!product || !selectedHero) return <div>Loading...</div>;

  return (
    <div className={styles["container"]}>
      <div className={styles["container__heroes"]}>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={styles["container__wishlist-btn"]}
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
          className={styles["container__hero"]}
          src={selectedHero}
          alt="product hero"
        />
        <div className={styles["container__mini-heroes"]}>
          {product.heroes?.map((hero, index) => (
            <img
              key={index}
              className={`${styles["container__mini-hero"]} ${
                selectedHero === hero
                  ? styles["container__mini-hero--active"]
                  : ""
              }`}
              src={hero}
              alt={`Product hero ${index + 1}`}
              onClick={() => setSelectedHero(hero)}
            />
          ))}
        </div>
      </div>
      <div className={styles["container__body"]}>
        <h1 className={styles["container__title"]}>{product.title}</h1>
        <div className={styles["container__content"]}>
          <span className={styles["container__current-price"]}>
            {product.currentPrice}
          </span>
          <span className={styles["container__previous-price"]}>
            {product.previousPrice}
          </span>
          {product.discount && (
            <div className={styles["container__discount"]}>
              {product.discount}
            </div>
          )}
        </div>
        <p className={styles["container__desc"]}>{product.desc}</p>
        <div className={styles["container__colors"]}>
          <span className={styles["container__colors-text"]}>
            {t(`ProductPage.Select Colors`)}
          </span>
          <div className={styles["container__color-circles"]}>
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={styles["container__color-circle-btn"]}
                style={{ backgroundColor: color, position: "relative" }}
                title={color}
              >
                {selectedColor === color && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.92"
                    height="16.92"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className={styles["container__sizes"]}>
          <span className={styles["container__sizes-text"]}>
            {t(`ProductPage.Choose Size`)}
          </span>
          <div className={styles["container__size-circles"]}>
            {product.sizes.map((size, index) => (
              <button
                onClick={() => setSelectedSize(size)}
                key={index}
                className={cn(
                  styles["container__size-btn"],
                  selectedSize === size &&
                    styles["container__size-btn--selected"]
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className={styles["container__btns"]}>
          <div className={styles["container__counter"]}>
            <button
              onClick={decrement}
              className={styles["container__minus-btn"]}
            >
              <img src="/assets/icons/minus.svg" alt="minus icon" />
            </button>
            <span className={styles["container__counter-text"]}>
              {quantity}
            </span>
            <button
              onClick={increment}
              className={styles["container__plus-btn"]}
            >
              <img src="/assets/icons/plus.svg" alt="plus icon" />
            </button>
          </div>
          <button
            onClick={() =>
              addToCart(product, selectedSize!, selectedColor!, quantity)
            }
            className={styles["container__add-to-cart-btn"]}
          >
            {t(`ProductPage.Add to Cart`)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
