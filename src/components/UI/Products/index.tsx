"use client";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import type { Product } from "@/types/Product";
import styles from "./styles.module.scss";
import ProductCard from "../ProductCard";
import Link from "next/link";

interface ProductsProps {
  title: string;
  products: Product[];
}

export default function Products({ title, products }: ProductsProps) {
  const t = useTranslations();
  const locale = useLocale();

  const sliderWrapper = useRef<HTMLDivElement | null>(null);
  const sliderOverflow = useRef<HTMLDivElement | null>(null);
  const productCardRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [gap, setGap] = useState<number>(0);
  const [slidesLength, setSlidesLength] = useState<number>(products.length);

  useEffect(() => {
    const productCard = productCardRef.current;
    const wrapper = sliderWrapper.current;
    if (!productCard || !wrapper) return;

    const updateSize = () => {
      setSlideWidth(productCard.offsetWidth);
      const computedStyle = window.getComputedStyle(wrapper);
      const gapValue = parseFloat(computedStyle.getPropertyValue("gap")) || 0;
      setGap(gapValue);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(productCard);

    return () => {
      resizeObserver.disconnect();
    };
  }, [products.length]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (startX === null || startY === null) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffY) > Math.abs(diffX)) {
        setStartX(null);
        setStartY(null);
        return;
      }

      const swipeThreshold = 50;

      if (diffX < -swipeThreshold) {
        setCurrentIndex((prev) => (prev === slidesLength - 1 ? 0 : prev + 1));
      } else if (diffX > swipeThreshold) {
        setCurrentIndex((prev) => (prev === 0 ? slidesLength - 1 : prev - 1));
      }

      setStartX(null);
      setStartY(null);
    };

    const overflow = sliderOverflow.current;
    if (overflow) {
      overflow.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      overflow.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      overflow?.removeEventListener("touchstart", handleTouchStart);
      overflow?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, slidesLength, startX, startY]);

  return (
    <div className={`${styles["container"]} ${locale === "ru" ? "ru" : ""}`}>
      <h2 className={styles["container__title"]}>{title}</h2>
      <div className={styles["container__overflow"]} ref={sliderOverflow}>
        <div
          className={styles["container__products-list"]}
          ref={sliderWrapper}
          style={{
            transform: `translateX(${-currentIndex * (slideWidth + gap)}px)`,
          }}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              ref={index === 0 ? productCardRef : undefined}
            />
          ))}
        </div>
      </div>
      <div className={styles["container__view-all-btn"]}>
        <Link href="/catalog">{t(`Products.View All`)}</Link>
      </div>
    </div>
  );
}
