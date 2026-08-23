import Image from "next/image";
import { wedding } from "@/data/wedding";

export function EventPhotoSlide() {
	return (
		<section className="invitation-slide event-photo-only-slide"><EventPhoto /></section>
	);
}

export function EventPhoto() {
	return <Image className="event-photo" src={wedding.assets.eventBackground} alt="" width={2048} height={2560} sizes="(max-width: 430px) calc(100vw - 3rem), 382px" />;
}
