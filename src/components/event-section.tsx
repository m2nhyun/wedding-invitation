import Image from "next/image";
import { wedding } from "@/data/wedding";

export function EventSection() {
	return (
		<div className="event-photo">
			<Image
				src={wedding.assets.eventBackground}
				alt=""
				width={2048}
				height={2560}
				priority
			/>
		</div>
	);
}
