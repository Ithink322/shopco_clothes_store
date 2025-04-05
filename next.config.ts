import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = withNextIntl({
  sassOptions: {
    prependData: `
      @use "public/styles/_vars.scss";
      @use "public/styles/_mixins" as *;
    `,
    includePaths: [path.join(process.cwd(), "public/styles")],
  },
  typescript: {
    tsconfigPath: "./tsconfig.json",
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    localPatterns: [
      {
        pathname: "/public/assets/icons/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
});

export default nextConfig;
