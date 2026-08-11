"use client";

import { wedding } from "@/data/wedding";

const lowerDigits = (text: string) =>
	text.split(/(\d+)/).map((part, index) =>
		/^\d+$/.test(part) ? (
			<span className="lowered-digits" key={`${part}-${index}`}>
				{part}
			</span>
		) : (
			part
		),
	);

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
		<section className="event-slide">
			<div
				className="event-photo"
				style={{ backgroundImage: `url("${wedding.assets.eventBackground}")` }}>
				<a
					className="map-link"
					href={wedding.event.naverMapUrl}
					onClick={openNaverMap}>
					{wedding.event.naverMapLabel}
				</a>
				<a className="map-link" href={wedding.event.kakaoMapUrl}>
					{wedding.event.kakaoMapLabel}
				</a>
			</div>
			<h2 className="event-heading">
				{lowerDigits(wedding.event.date)}
				<br />
				{lowerDigits(wedding.event.time)}
				<br />
				{lowerDigits(`${wedding.event.venue.replace(", ", " (")})`)}
			</h2>

			<p className="parking-note">
				{wedding.event.parking}
			</p>
		</section>
	);
}
