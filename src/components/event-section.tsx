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
		<section className="event-slide">
			<div
				className="event-photo"
				style={{ backgroundImage: `url("${wedding.assets.eventBackground}")` }} />
			<div className="event-details">
				<h2 className="event-heading event-date">
					{wedding.event.date}
					<br />
					{wedding.event.time}
				</h2>
				<h2 className="event-heading event-location">
					{`${wedding.event.venue.replace(", ", "(")})`}
				</h2>
				<div className="event-map-links">
					<a
						className="map-link"
						href={wedding.event.naverMapUrl}
						onClick={openNaverMap}>
						{wedding.event.naverMapLabel}
					</a>
					<span aria-hidden="true">/</span>
					<a className="map-link" href={wedding.event.kakaoMapUrl}>
						{wedding.event.kakaoMapLabel}
					</a>
				</div>
			</div>

			<p className="parking-note">
				{wedding.event.parking}
			</p>
		</section>
	);
}
