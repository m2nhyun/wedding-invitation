import { wedding } from "@/data/wedding";

type EventSectionProps = {
	className?: string;
};

export function EventSection({ className }: EventSectionProps) {
	return (
		<div className={`event-info${className ? ` ${className}` : ""}`}>
			<div>
				<p>
					{`${wedding.event.date} ${wedding.event.time}`}
				</p>
			</div>
			<div>
				<p className="event-heading">
					{`${wedding.event.venue.replace(", ", "(")})`}
				</p>
				<div className="event-map-links">
					<a className="map-link" href={wedding.event.naverMapAppUrl}>
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
