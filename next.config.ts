import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const svgReactQuery = /[?&]react(?=&|$)/;

type WebpackRule = {
  test?: RegExp;
  issuer?: unknown;
  resourceQuery?: {
    not?: unknown[];
  };
  exclude?: RegExp;
  [key: string]: unknown;
};

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: WebpackRule) => rule.test?.test?.(".svg"),
    );

    if (fileLoaderRule) {
      const excludedQueries = fileLoaderRule.resourceQuery?.not ?? [];

      config.module.rules.push({
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: {
          not: [...excludedQueries, svgReactQuery],
        },
      });
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule?.issuer,
      resourceQuery: svgReactQuery,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
