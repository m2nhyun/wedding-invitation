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
			className="relative flex h-[38em] flex-col bg-cover bg-center py-[2.6em]"
			style={{ backgroundImage: `url("${wedding.assets.eventBackground}")` }}
		>
			<h2 className="mb-4 text-[1.32em] leading-[1.75] tracking-[0.1em] text-[var(--olive)]">
				{wedding.event.date}
				<br />
				{wedding.event.time}
				<br />
				{wedding.event.venue}
			</h2>

			<a
				className="text-[1.1em] leading-[1.85] text-[var(--olive)] underline"
				href={wedding.event.naverMapUrl}
				onClick={openNaverMap}
			>
				{wedding.event.naverMapLabel}
			</a>
			<a
				className="text-[1.1em] leading-[1.85] text-[var(--olive)] underline"
				href={wedding.event.kakaoMapUrl}
			>
				{wedding.event.kakaoMapLabel}
			</a>

			<p className="absolute bottom-[2.1em] w-full text-[1.1em] leading-[1.7] text-white">
				{wedding.event.parking}
			</p>
		</section>
	);
}
