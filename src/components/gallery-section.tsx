import Image from "next/image";
import { wedding } from "@/data/wedding";

const [
	standingPortrait,
	handsPolaroid,
	boutonnierePhoto,
	bouquetMoment,
	mirrorPhoto,
	holdingHandsMotion,
	groomPhoto,
	seatedPolaroid,
] = wedding.assets.gallery;

export function GallerySection() {
	return (
		<>
			<section className="invitation-slide gallery-slide gallery-seated-slide">
				<Image
					className="gallery-seated-wide"
					src={wedding.assets.main}
					alt=""
					width={3089}
					height={2048}
					sizes="(max-width: 430px) calc(100vw - 2em), 398px"
				/>
				<Image className="gallery-standing-portrait" src={standingPortrait} alt="" width={2212} height={1429} sizes="(max-width: 430px) 74vw, 318px" />
			</section>

			<section className="invitation-slide gallery-slide gallery-hands-slide">
				<Image
					className="gallery-hands-polaroid"
					src={handsPolaroid}
					alt=""
					width={5354}
					height={6634}
					sizes="(max-width: 430px) 39vw, 168px"
				/>
				<Image
					className="gallery-hands-motion"
					src={holdingHandsMotion}
					alt=""
					width={1200}
					height={1500}
					sizes="(max-width: 430px) 86vw, 370px"
				/>
			</section>

			<section className="invitation-slide gallery-slide gallery-grid-slide gallery-pair-slide">
				<Image
					className="gallery-pair-left"
					src={boutonnierePhoto}
					alt=""
					width={1000}
					height={1508}
					sizes="(max-width: 430px) 35.75vw, 154px"
				/>
				<Image
					className="gallery-pair-right"
					src={bouquetMoment}
					alt=""
					width={2048}
					height={3089}
					sizes="(max-width: 430px) 70vw, 301px"
				/>
			</section>

			<section className="invitation-slide gallery-slide gallery-mirror-slide">
				<Image
					className="gallery-mirror-photo"
					src={mirrorPhoto}
					alt=""
					width={3089}
					height={2048}
					sizes="(max-width: 430px) calc(100vw - 2em), 398px"
				/>
				<Image
					className="gallery-groom-photo"
					src={groomPhoto}
					alt=""
					width={1800}
					height={1193}
					sizes="(max-width: 430px) 67vw, 288px"
				/>
			</section>

			<section className="invitation-slide gallery-slide gallery-polaroid-slide">
				<Image className="gallery-seated-polaroid" src={seatedPolaroid} alt="" width={2000} height={2468} sizes="(max-width: 430px) 43vw, 185px" />
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
