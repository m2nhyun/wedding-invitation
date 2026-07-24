import type { Metadata } from "next";
import "./globals.css";
import { wedding } from "@/data/wedding";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jh-yh.kr"),
  applicationName: wedding.site.title,
  title: wedding.site.title,
  description: wedding.site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: wedding.site.title,
    description: wedding.site.description,
    url: "/",
    siteName: wedding.site.title,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: wedding.site.title,
    description: wedding.site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="min-h-full w-full text-[16px] tracking-[0.05rem] max-[430px]:text-[3.8vw]"
    >
      <head>
        <link
          rel="preconnect"
          href="https://bks0c7yrb0.execute-api.ap-northeast-2.amazonaws.com"
        />
        <link
          rel="stylesheet"
          href="https://bks0c7yrb0.execute-api.ap-northeast-2.amazonaws.com/v1/api/css/drop_fontstream_css/?sid=gAAAAABkxnFxeM_qWopEVVlR8coiZDz9q1FgQcINWnrSViPYGVG871sr6cKuYFz7pjoxmNeszFUTqBzTj23sdvTW7FmTCxgINZ9-Cju2mSEI8WHMbONbz5zFc0xhZFMGnnbGTYZLlM72fh7ai4lxT9DEAwv5941s56_lpsCoCk4LxGI6iY65WFLdtH3_Oyz2RybY70qtHL9CddZ0Bxv9U06CBm0P_tLugF5YlATEjVo6GsuSeHI5hCu5ejalyWj0qI0NvVOYXh-B"
          referrerPolicy="origin"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Resonay-Text";
                src: url("${assetPath("/assets/Resonay-Text-Variable-Demo.ttf")}");
                font-weight: 100;
                size-adjust: 103%;
              }
            `,
          }}
        />
      </head>
      <body className='mx-auto max-w-[430px] touch-pan-y bg-[#f2f3f1] text-center font-["Resonay-Text","SD_Jan",serif] font-[100] [word-break:keep-all]'>
        {children}
      </body>
    </html>
  );
}
