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
			<section className="invitation-slide gallery-slide gallery-story-slide">
				<Image
					className="gallery-story-wide"
					src={standingPortrait}
					alt=""
					width={2212}
					height={1429}
					sizes="(max-width: 430px) 80vw, 344px"
				/>
				<Image
					className="gallery-story-standing"
					src={holdingHandsMotion}
					alt=""
					width={1200}
					height={1500}
					sizes="(max-width: 430px) 55vw, 237px"
				/>
				<Image className="gallery-story-hand" src={handsPolaroid} alt="" width={5354} height={6634} sizes="(max-width: 430px) 30vw, 129px" />
			</section>

			<section className="invitation-slide gallery-slide gallery-collage-slide">
				<Image
					className="gallery-collage-left"
					src={boutonnierePhoto}
					alt=""
					width={1000}
					height={1508}
					sizes="(max-width: 430px) 34vw, 146px"
				/>
				<Image
					className="gallery-collage-right"
					src={bouquetMoment}
					alt=""
					width={2048}
					height={3089}
					sizes="(max-width: 430px) 62vw, 267px"
				/>
				<Image className="gallery-collage-wide" src={wedding.assets.main} alt="" width={3089} height={2048} sizes="(max-width: 430px) calc(100vw - 2em), 398px" />
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
					sizes="(max-width: 430px) 68vw, 292px"
				/>
				<Image className="gallery-seated-polaroid" src={seatedPolaroid} alt="" width={2000} height={2468} sizes="(max-width: 430px) 35vw, 151px" />
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
