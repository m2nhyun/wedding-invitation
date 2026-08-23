import Image from "next/image";
import { wedding } from "@/data/wedding";

const [
	landscapePhoto,
	ringsPhoto,
	narrowLeft,
	tallRight,
	widePhoto,
	motionPhoto,
	rightAligned,
	smallCenter,
] = wedding.assets.gallery;

export function GallerySection() {
	return (
		<>
			<section className="invitation-slide gallery-slide gallery-combined-slide">
				<Image
					className="gallery-main"
					src={wedding.assets.main}
					alt=""
					width={3089}
					height={2048}
					sizes="(max-width: 430px) calc(100vw - 2em), 398px"
				/>
				<Image className="gallery-hand" src={ringsPhoto} alt="" width={5354} height={6634} sizes="(max-width: 430px) 30vw, 129px" />
				<Image className="gallery-portrait" src={landscapePhoto} alt="" width={2212} height={1429} sizes="(max-width: 430px) 78vw, 335px" />
			</section>

			<section className="invitation-slide gallery-slide gallery-grid-slide gallery-pair-slide">
				<Image
					className="gallery-pair-left"
					src={narrowLeft}
					alt=""
					width={1000}
					height={1508}
					sizes="(max-width: 430px) 35.75vw, 154px"
				/>
				<Image
					className="gallery-pair-right"
					src={tallRight}
					alt=""
					width={2048}
					height={3089}
					sizes="(max-width: 430px) 77.05vw, 332px"
				/>
			</section>

			<section className="invitation-slide gallery-slide gallery-wide-motion-slide">
				<Image
					className="gallery-wide-photo"
					src={widePhoto}
					alt=""
					width={3089}
					height={2048}
					sizes="(max-width: 430px) 83vw, 357px"
				/>
				<Image
					className="gallery-motion-photo"
					src={motionPhoto}
					alt=""
					width={1200}
					height={1500}
					sizes="(max-width: 430px) 52vw, 224px"
				/>
			</section>

			<section className="invitation-slide gallery-slide gallery-extra-pair-slide">
				<Image
					className="gallery-extra-wide"
					src={rightAligned}
					alt=""
					width={1800}
					height={1193}
					sizes="(max-width: 430px) 67vw, 288px"
				/>
				<Image
					className="gallery-extra-polaroid"
					src={smallCenter}
					alt=""
					width={2000}
					height={2468}
					sizes="(max-width: 430px) 43.01vw, 185px"
				/>
			</section>

			<section className="invitation-slide gallery-slide gallery-cat-slide">
				<Image
					className="block h-auto w-full"
					src={wedding.assets.cats}
					alt=""
					width={1800}
					height={2223}
					sizes="(max-width: 430px) 56vw, 241px"
				/>
			</section>
		</>
	);
}
