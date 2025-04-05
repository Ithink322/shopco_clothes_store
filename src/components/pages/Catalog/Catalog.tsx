import { useTranslations } from "next-intl";

export const Catalog = () => {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("catalog title")}</h1>
    </div>
  );
};
