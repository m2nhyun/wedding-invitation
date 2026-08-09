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
			className="event-slide"
			style={{ backgroundImage: `url("${wedding.assets.eventBackground}")` }}>
			<h2 className="event-heading">
				{wedding.event.date}
				<br />
				{wedding.event.time}
				<br />
				{wedding.event.venue}
			</h2>

			<a
				className="map-link"
				href={wedding.event.naverMapUrl}
				onClick={openNaverMap}>
				{wedding.event.naverMapLabel}
			</a>
			<a
				className="map-link"
				href={wedding.event.kakaoMapUrl}>
				{wedding.event.kakaoMapLabel}
			</a>

			<p className="parking-note">
				{wedding.event.parking}
			</p>
		</section>
	);
}
