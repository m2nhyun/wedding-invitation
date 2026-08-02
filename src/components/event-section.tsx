"use client";

import Image from "next/image";
import { wedding } from "@/data/wedding";
import { assetPath } from "@/lib/asset-path";

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
		<section className="event-section relative flex h-[38em] flex-col bg-white py-[2.6em]">
			<div className="event-details relative z-10 flex flex-col">
				<h2 className="text-[1.32em] leading-[1.75] tracking-[0.1em] text-[var(--olive)]">
					{wedding.event.date}
					<br />
					{wedding.event.time}
					<br />
					{wedding.event.venue}
				</h2>
				<p className="mt-[0.35em] text-[1.1em] leading-[1.7] text-[var(--olive)]">
					{wedding.event.parking}
				</p>
				<a
					className="mt-[1.5em] text-[1.1em] leading-[1.85] text-[var(--olive)] underline"
					href={wedding.event.naverMapUrl}
					onClick={openNaverMap}>
					{wedding.event.naverMapLabel}
				</a>
				<a
					className="text-[1.1em] leading-[1.85] text-[var(--olive)] underline"
					href={wedding.event.kakaoMapUrl}>
					{wedding.event.kakaoMapLabel}
				</a>
			</div>
			<Image
				className="event-illustration"
				src={assetPath("/assets/MainIllust.svg")}
				alt=""
				width={990}
				height={1062}
				unoptimized
			/>
		</section>
	);
}
