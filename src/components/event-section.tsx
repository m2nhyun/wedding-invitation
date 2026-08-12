import Image from "next/image";
import { wedding } from "@/data/wedding";

export function EventSection() {
	return (
		<section className="event-slide">
			<div className="event-photo">
				<Image
					src={wedding.assets.eventBackground}
					alt=""
					width={2048}
					height={2560}
					priority
				/>
			</div>
			<div className="event-details">
				<h2 className="event-heading">
					{wedding.event.date}
					<br />
					{wedding.event.time}
					<br />
					{`${wedding.event.venue.replace(", ", "(")})`}
				</h2>
				<div className="event-map-links">
					<a className="map-link" href={wedding.event.naverMapUrl}>
						{wedding.event.naverMapLabel}
					</a>
					<span aria-hidden="true">/</span>
					<a className="map-link" href={wedding.event.kakaoMapUrl}>
						{wedding.event.kakaoMapLabel}
					</a>
				</div>
			</div>
		</section>
	);
}
