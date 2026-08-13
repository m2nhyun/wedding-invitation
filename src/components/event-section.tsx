import { wedding } from "@/data/wedding";

export function EventSection() {
	return (
		<div className="event-info">
			<div>
				<p>
					{wedding.event.date}
					<br />
					{wedding.event.time}
				</p>
			</div>
			<div>
				<p className="event-heading">
					{`${wedding.event.venue.replace(", ", "(")})`}
				</p>
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
		</div>
	);
}
