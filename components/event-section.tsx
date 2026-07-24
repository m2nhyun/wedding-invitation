"use client";

import { wedding } from "@/data/wedding";

export function EventSection() {
  const openNaverMap = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      return;
    }

    event.preventDefault();
    window.location.href = wedding.event.naverMapAppUrl;

    window.setTimeout(() => {
      if (!document.hidden) {
        window.location.href = wedding.event.naverMapUrl;
      }
    }, 900);
  };

  return (
    <section
      className="flex h-[40em] flex-col bg-cover bg-center pt-[3.7em] pb-[1.6em]"
      style={{ backgroundImage: `url("${wedding.assets.eventBackground}")` }}
    >
      <h1 className="mb-4 text-[1.42em] leading-[1.7em] tracking-[0.1em] text-[var(--olive)]">
        {wedding.event.date}
        <br />
        {wedding.event.time}
        <br />
        {wedding.event.venue}
      </h1>

      <a
        className="leading-[1.7em] text-[var(--olive)] underline"
        href={wedding.event.naverMapUrl}
        onClick={openNaverMap}
      >
        네이버지도
      </a>
      <a
        className="leading-[1.7em] text-[var(--olive)] underline"
        href={wedding.event.kakaoMapUrl}
      >
        카카오맵
      </a>

      <p className="mt-auto w-full text-[1em] leading-[1.7em] text-white">
        {wedding.event.parking}
      </p>
    </section>
  );
}
