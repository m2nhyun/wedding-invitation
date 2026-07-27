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
			className="flex h-[40rem] flex-col bg-cover bg-center pt-[3.7rem] pb-[1.6rem]"
			style={{ backgroundImage: `url("${wedding.assets.eventBackground}")` }}>
			<h2 className="mb-4 text-[1.42rem] leading-[1.7] tracking-[0.142rem] text-[var(--olive)]">
				{wedding.event.date}
				<br />
				{wedding.event.time}
				<br />
				{wedding.event.venue}
			</h2>

			<a
				className="leading-[1.7] text-[var(--olive)] underline"
				href={wedding.event.naverMapUrl}
				onClick={openNaverMap}>
				{wedding.event.naverMapLabel}
			</a>
			<a
				className="leading-[1.7] text-[var(--olive)] underline"
				href={wedding.event.kakaoMapUrl}>
				{wedding.event.kakaoMapLabel}
			</a>

			<p className="mt-auto w-full text-base leading-[1.7] text-white">
				{wedding.event.parking}
			</p>
		</section>
	);
}
