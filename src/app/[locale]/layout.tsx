import localFont from "next/font/local";
import cn from "clsx";
import "../../app/globals.scss";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import dynamic from "next/dynamic";
import Header from "@/components/UI/Header";
import NewsLetter from "@/components/UI/NewsLetter";
import Footer from "@/components/UI/Footer";

const IntegralCF = localFont({
  src: "../../../public/assets/fonts/IntegralCF-Bold.woff2",
  display: "swap",
  variable: "--font-IntegralCF",
});
const SatoshiBold = localFont({
  src: "../../../public/assets/fonts/Satoshi-Bold.woff2",
  display: "swap",
  variable: "--font-SatoshiBold",
});
const SatoshiMedium = localFont({
  src: "../../../public/assets/fonts/Satoshi-Medium.woff2",
  display: "swap",
  variable: "--font-SatoshiMedium",
});
const SatoshiRegular = localFont({
  src: "../../../public/assets/fonts/Satoshi-Regular.woff2",
  display: "swap",
  variable: "--font-SatoshiRegular",
});

export const metadata: Metadata = {
  title: "SHOP.CO - Home",
  description: "SHOP.CO - Home",
};

const PromoBar = dynamic(() => import("@/components/UI/PromoBar"));

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
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
        <NextIntlClientProvider>
          <PromoBar></PromoBar>
          <Header></Header>
          {children}
          <NewsLetter></NewsLetter>
          <Footer></Footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
