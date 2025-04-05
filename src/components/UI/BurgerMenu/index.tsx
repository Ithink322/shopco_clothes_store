import { useTranslations } from "next-intl";
import styles from "./styles.module.scss";
import cn from "clsx";
import Link from "next/link";
import Image from "next/image";
import CrossIcon from "@/../../public/assets/icons/cross.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Burger({ isOpen, onClose }: Props) {
  const t = useTranslations();

  return (
    <div>
      <div className={cn(isOpen && styles.burgerBg)}></div>
      <div className={styles["burger"]}>
        <span className={styles["burger__logo"]}>SHOP.CO</span>
        <nav>
          <ul className={styles["burger__titles-list"]}>
            <li>
              <Link href="/">{t(`Home.Home`)}</Link>
            </li>
            <li>
              <Link href="/catalog">{t(`Home.Shop`)}</Link>
            </li>
            <li>
              <Link href="/sale">{t(`Home.On Sale`)}</Link>
            </li>
            <li>
              <Link href="/new-arrivals">{t(`Home.New Arrivals`)}</Link>
            </li>
          </ul>
        </nav>
        <button onClick={onClose} className={styles["burger__close-btn"]}>
          <Image src={CrossIcon} alt="cross icon"></Image>
        </button>
      </div>
    </div>
  );
}
