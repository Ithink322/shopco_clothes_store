import localFont from "next/font/local";
import cn from "clsx";
import "../../app/globals.scss";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const IntegralCF = localFont({
  src: "../../../public/assets/fonts/IntegralCF-Bold.woff2",
  /*  weight: "100 900", */
  display: "swap",
  variable: "--font-IntegralCF",
});
const SatoshiBold = localFont({
  src: "../../../public/assets/fonts/Satoshi-Bold.woff2",
  /* weight: "100 900", */
  display: "swap",
  variable: "--font-SatoshiBold",
});
const SatoshiMedium = localFont({
  src: "../../../public/assets/fonts/Satoshi-Medium.woff2",
  /*  weight: "100 900", */
  display: "swap",
  variable: "--font-SatoshiMedium",
});
const SatoshiRegular = localFont({
  src: "../../../public/assets/fonts/Satoshi-Regular.woff2",
  /*  weight: "400", */
  display: "swap",
  variable: "--font-SatoshiRegular",
});

export const metadata: Metadata = {
  title: "SHOP.CO - Home",
  description: "SHOP.CO - Home",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={cn(
          IntegralCF.variable,
          SatoshiBold.variable,
          SatoshiMedium.variable,
          SatoshiRegular.variable
        )}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
