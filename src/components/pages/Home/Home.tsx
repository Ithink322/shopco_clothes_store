import styles from "./styles.module.scss";
import { useTranslations, useLocale } from "next-intl";
import cn from "clsx";
import Image from "next/image";
import bannerHero from "@/../../public/assets/icons/banner-hero.webp";
import versaceLogo from "@/../../public/assets/icons/versace-logo.svg";
import zaraLogo from "@/../../public/assets/icons/zara-logo.svg";
import gucciLogo from "@/../../public/assets/icons/gucci-logo.svg";
import pradaLogo from "@/../../public/assets/icons/prada-logo.svg";
import calvinKleinLogo from "@/../../public/assets/icons/calvin-klein-logo.svg";
import Products from "@/components/UI/Products";
import { newArrivals } from "@/data/newArrivals";
import { topSelling } from "@/data/topSelling";
import Categories from "@/components/UI/Categories";

export const Home = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div>
      <div
        className={`${styles["banner"]} ${locale === "ru" ? "ru" : ""} ${
          locale === "es" ? "es" : ""
        }`}
      >
        <div className={styles["banner__body"]}>
          <h1 className={styles["banner__title"]}>{t(`Home.banner title`)}</h1>
          <p className={styles["banner__desc"]}>{t(`Home.banner desc`)}</p>
          <button className={styles["banner__shop-btn"]}>
            {t(`Home.shop now`)}
          </button>
        </div>
        <div className={styles["banner__achievements"]}>
          <div className={styles["banner__content"]}>
            <span className={styles["banner__text"]}>200+</span>
            <span className={styles["banner__subtext"]}>
              {t(`Home.International Brands`)}
            </span>
          </div>
          <div className={styles["banner__content"]}>
            <span className={styles["banner__text"]}>2,000+</span>
            <span className={styles["banner__subtext"]}>
              {t(`Home.High-Quality Products`)}
            </span>
          </div>
          <div
            className={cn(
              styles["banner__content"],
              styles["banner__content--mg-top"]
            )}
          >
            <span className={styles["banner__text"]}>30,000+</span>
            <span className={styles["banner__subtext"]}>
              {t(`Home.Happy Customers`)}
            </span>
          </div>
        </div>
        <Image
          className={styles["banner__hero"]}
          src={bannerHero}
          alt="banner hero"
        ></Image>
      </div>
      <div className={styles["brands"]}>
        <Image
          className={cn(styles["brands__logo"], styles["brands__versace-logo"])}
          src={versaceLogo}
          alt="versace logo"
        ></Image>
        <Image
          className={cn(styles["brands__logo"], styles["brands__zara-logo"])}
          src={zaraLogo}
          alt="zara logo"
        ></Image>
        <Image
          className={cn(styles["brands__logo"], styles["brands__gucci-logo"])}
          src={gucciLogo}
          alt="gucci logo"
        ></Image>
        <Image
          className={cn(styles["brands__logo"], styles["brands__prada-logo"])}
          src={pradaLogo}
          alt="prada logo"
        ></Image>
        <Image
          className={cn(styles["brands__logo"], styles["brands__klein-logo"])}
          src={calvinKleinLogo}
          alt="calvin klein logo"
        ></Image>
      </div>
      <div className={styles["container"]}>
        <div>
          <Products title="NEW ARRIVALS" products={newArrivals} />
          <div className={styles["container__border"]}></div>
          <Products title="TOP SELLING" products={topSelling} />
        </div>
        <Categories></Categories>
      </div>
    </div>
  );
};
