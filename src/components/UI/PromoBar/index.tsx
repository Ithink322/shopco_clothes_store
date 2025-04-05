"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import CrossIcon from "@/../../public/assets/icons/cross.svg";

const titles = [
  "promo bar title 1",
  "promo bar title 2",
  "promo bar title 3",
  "promo bar title 4",
  "promo bar title 5",
];

export default function PromoBar() {
  const t = useTranslations();
  const [currentTitle, setCurrentTitle] = useState(t(titles[0]));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => {
        const currentIndex = titles.findIndex((key) => t(key) === prev); // Find index by its translated value
        return t(titles[(currentIndex + 1) % titles.length]); // Get the translated next title
      });
    }, 60000); //60000

    return () => clearInterval(interval);
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };
  if (!isVisible) return null;

  return (
    <div className={styles["content"]}>
      <div>
        <span className={styles["content__title"]}>{currentTitle}</span>
        <button className={styles["content__sign-up-btn"]}>
          {t(`Sign Up Now`)}
        </button>
      </div>
      <button className={styles["content__close-btn"]} onClick={handleClose}>
        <Image src={CrossIcon} alt="cross"></Image>
      </button>
    </div>
  );
}
