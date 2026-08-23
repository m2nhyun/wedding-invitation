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

			<section className="invitation-slide gallery-slide gallery-grid-slide gallery-triptych-slide">
				<div className="flex w-full flex-row items-start gap-[2em]">
					<div className="mr-[0.5em] flex h-full min-w-0 flex-[0_0_30%] flex-col">
						<Image
							className="block h-auto min-w-0 w-full object-cover"
							src={narrowLeft}
							alt=""
							width={1000}
							height={1508}
							sizes="(max-width: 430px) 30.25vw, 130px"
						/>
					</div>
					<div className="flex h-full min-w-0 flex-1 flex-col">
						<Image
							className="block h-auto min-w-0 w-full object-cover"
							src={tallRight}
							alt=""
							width={2048}
							height={3089}
							sizes="(max-width: 430px) 52.5vw, 226px"
						/>
					</div>
				</div>

				<Image
					className="block h-auto w-full"
					src={widePhoto}
					alt=""
					width={3089}
					height={2048}
					sizes="(max-width: 430px) calc(100vw - 2em), 398px"
				/>
			</section>

			<section className="invitation-slide gallery-slide gallery-grid-slide gallery-extra-slide">
				<div className="flex flex-col">
					<Image
						className="block h-auto w-[74%]"
						src={motionPhoto}
						alt=""
						width={1200}
						height={1500}
						sizes="(max-width: 430px) 74vw, 318px"
					/>
				</div>

				<div className="mt-[1em] flex flex-col">
					<Image
						className="ml-auto block h-auto w-[68%]"
						src={rightAligned}
						alt=""
						width={1800}
						height={1193}
						sizes="(max-width: 430px) 68vw, 292px"
					/>
				</div>
				<div className="mx-auto my-[1em] flex w-[33%] flex-col">
					<Image
						className="block h-auto w-full"
						src={smallCenter}
						alt=""
						width={2000}
						height={2468}
						sizes="(max-width: 430px) 33vw, 142px"
					/>
				</div>

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
