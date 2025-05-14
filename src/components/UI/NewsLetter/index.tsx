import { useTranslations, useLocale } from "next-intl";
import styles from "./styles.module.scss";
import Image from "next/image";
import email from "@/../../public/assets/icons/email.svg";

export default function NewsLetter() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className={`${styles["container"]} ${locale === "ru" ? "ru" : ""}`}>
      <span className={styles["container__title"]}>
        {t(`Home.Newsletter title`)}
      </span>
      <div className={styles["container__content"]}>
        <Image
          className={styles["container__email-icon"]}
          src={email}
          alt="email icon"
        ></Image>
        <input
          className={styles["container__field"]}
          placeholder={t("Home.Newsletter placeholder")}
          type="text"
        />
        <button className={styles["container__btn"]}>
          {t(`Home.Subscribe to Newsletter`)}
        </button>
      </div>
    </div>
  );
}
