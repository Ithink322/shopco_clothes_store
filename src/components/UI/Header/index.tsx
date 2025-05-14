"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import BurgerIcon from "@/../../public/assets/icons/burger.svg";
import Burger from "./../BurgerMenu";
import SearchIcon from "@/../../public/assets/icons/search.svg";
import WishlistIcon from "@/../../public/assets/icons/wishlist.svg";
import CartIcon from "@/../../public/assets/icons/cart.svg";
import ProfileIcon from "@/../../public/assets/icons/profile.svg";
import Link from "next/link";

export default function Header() {
  const t = useTranslations();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const toggleBurgerMenu = () => setIsBurgerOpen((prev) => !prev);

  return (
    <header className={styles["header"]}>
      <div className={styles["header__content"]}>
        <button
          onClick={toggleBurgerMenu}
          className={styles["header__burger-btn"]}
        >
          <Image src={BurgerIcon} alt="burger icon"></Image>
        </button>
        <span className={styles["header__logo"]}>SHOP.CO</span>
        {isBurgerOpen && (
          <Burger onClose={toggleBurgerMenu} isOpen={isBurgerOpen}></Burger>
        )}
      </div>
      <nav className={styles["header__container"]}>
        <ul className={styles["header__titles-list"]}>
          <li>
            <Link href="/">{t(`Home.Home`)}</Link>
          </li>
          <li>
            <Link href="/catalog">{t(`Home.Shop`)}</Link>
          </li>
          <li>{t(`Home.On Sale`)}</li>
          <li>{t(`Home.New Arrivals`)}</li>
        </ul>
      </nav>
      <form className={styles["header__search-form"]}>
        <svg
          className={styles["header__search-icon"]}
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9399 18.348L15.4877 13.8939C16.8226 12.1544 17.4458 9.97216 17.2309 7.78998C17.0161 5.60781 15.9792 3.58907 14.3306 2.14328C12.6821 0.697486 10.5453 -0.0670986 8.35376 0.00462578C6.16221 0.0763502 4.07999 0.979013 2.5295 2.5295C0.979013 4.07999 0.0763502 6.16221 0.00462578 8.35376C-0.0670986 10.5453 0.697486 12.6821 2.14328 14.3306C3.58907 15.9792 5.60781 17.0161 7.78998 17.2309C9.97216 17.4458 12.1544 16.8226 13.8939 15.4877L18.3499 19.9445C18.4545 20.0492 18.5787 20.1322 18.7155 20.1888C18.8522 20.2455 18.9987 20.2746 19.1467 20.2746C19.2947 20.2746 19.4413 20.2455 19.578 20.1888C19.7147 20.1322 19.839 20.0492 19.9436 19.9445C20.0482 19.8399 20.1313 19.7157 20.1879 19.5789C20.2445 19.4422 20.2737 19.2957 20.2737 19.1477C20.2737 18.9997 20.2445 18.8531 20.1879 18.7164C20.1313 18.5797 20.0482 18.4554 19.9436 18.3508L19.9399 18.348ZM2.26891 8.64392C2.26891 7.38306 2.6428 6.15052 3.3433 5.10215C4.04379 4.05379 5.03943 3.23669 6.20431 2.75418C7.36919 2.27167 8.65099 2.14543 9.88762 2.39141C11.1242 2.63739 12.2602 3.24455 13.1517 4.13611C14.0433 5.02767 14.6504 6.16359 14.8964 7.40021C15.1424 8.63684 15.0162 9.91864 14.5336 11.0835C14.0511 12.2484 13.234 13.244 12.1857 13.9445C11.1373 14.645 9.90477 15.0189 8.64392 15.0189C6.95369 15.0172 5.3332 14.345 4.13803 13.1498C2.94286 11.9546 2.27065 10.3341 2.26891 8.64392Z"
            fill="rgba(0, 0, 0, 0.4)"
          />
        </svg>
        <input
          className={styles["header__search-field"]}
          placeholder={t("search.placeholder")}
          type="text"
        />
      </form>
      <div className={styles["header__body"]}>
        <button className={styles["header__search-btn"]}>
          <Image src={SearchIcon} alt="search icon"></Image>
        </button>
        <Link href="/wishlist">
          <button className={styles["header__wishlist-btn"]}>
            <Image src={WishlistIcon} alt="wishlist icon"></Image>
          </button>
        </Link>
        <Link href="/cart">
          <button className={styles["header__cart-btn"]}>
            <Image src={CartIcon} alt="cart icon"></Image>
          </button>
        </Link>
        <button className={styles["header__profile-btn"]}>
          <Image src={ProfileIcon} alt="profile icon"></Image>
        </button>
      </div>
    </header>
  );
}
