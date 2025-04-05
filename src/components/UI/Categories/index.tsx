import { useTranslations, useLocale } from "next-intl";
import styles from "./styles.module.scss";
import cn from "clsx";
import Image from "next/image";
import casualMobile from "@/../../public/assets/icons/category-casual--mobile.svg";
import casualDesk from "@/../../public/assets/icons/category-casual--desk.webp";
import formalMobile from "@/../../public/assets/icons/category-formal--mobile.svg";
import formalDesk from "@/../../public/assets/icons/category-formal--desk.webp";
import partyMobile from "@/../../public/assets/icons/category-party--mobile.svg";
import partyDesk from "@/../../public/assets/icons/category-party--desk.webp";
import gymMobile from "@/../../public/assets/icons/category-gym--mobile.svg";
import gymDesk from "@/../../public/assets/icons/category-gym--desk.webp";

export default function Categories() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className={`${styles["container"]} ${locale === "ru" ? "ru" : ""}`}>
      <h2 className={styles["container__title"]}>{t(`Home.Browse title`)}</h2>
      <div className={styles["container__body"]}>
        <div
          className={cn(
            styles["container__content"],
            styles["container__content-item1"]
          )}
        >
          <span className={styles["container__category"]}>
            {t(`Home.Category 1`)}
          </span>
          <picture>
            <source srcSet={casualDesk.src} media="(min-width: 1024px)" />
            <Image
              className={styles.bgBefore}
              src={casualMobile}
              alt="background image before"
            />
          </picture>
        </div>
        <div
          className={cn(
            styles["container__content"],
            styles["container__content-item2"]
          )}
        >
          <span className={styles["container__category"]}>
            {t(`Home.Category 2`)}
          </span>
          <picture>
            <source srcSet={formalDesk.src} media="(min-width: 1024px)" />
            <Image
              className={styles.bgBefore}
              src={formalMobile}
              alt="background image before"
            />
          </picture>
        </div>
        <div
          className={cn(
            styles["container__content"],
            styles["container__content-item3"]
          )}
        >
          <span className={styles["container__category"]}>
            {t(`Home.Category 3`)}
          </span>
          <picture>
            <source srcSet={partyDesk.src} media="(min-width: 1024px)" />
            <Image
              className={styles.bgBefore}
              src={partyMobile}
              alt="background image before"
            />
          </picture>
        </div>
        <div
          className={cn(
            styles["container__content"],
            styles["container__content-item4"]
          )}
        >
          <span className={styles["container__category"]}>
            {t(`Home.Category 4`)}
          </span>
          <picture>
            <source srcSet={gymDesk.src} media="(min-width: 1024px)" />
            <Image
              className={styles.bgBefore}
              src={gymMobile}
              alt="background image before"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
