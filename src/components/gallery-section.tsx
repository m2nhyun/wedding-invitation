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

export function GalleryFirstPage() {
	return (
		<div className="gallery-slide gallery-slide-one">
			<section className="flex h-auto w-full flex-col bg-white px-[1em] py-[2.5em]">
				<Image
					className="block h-auto w-full"
					src={wedding.assets.main}
					alt=""
					width={3089}
					height={2048}
					sizes="(max-width: 430px) calc(100vw - 2em), 398px"
				/>
			</section>

			<section className="flex w-full flex-col bg-white">
				<div className="relative -mt-[1em] flex h-[12em] flex-col">
					<Image
						className="absolute right-0 block h-auto w-[40%] px-[1em]"
						src={ringsPhoto}
						alt=""
						width={5354}
						height={6634}
						sizes="(max-width: 430px) 40vw, 172px"
					/>
				</div>
				<div className="flex w-[83%] flex-col overflow-hidden">
					<Image
						className="mb-[2.5em] ml-[1em] block h-full w-full object-cover object-center"
						src={landscapePhoto}
						alt=""
						width={2212}
						height={1429}
						sizes="(max-width: 430px) 83vw, 357px"
					/>
				</div>
			</section>
		</div>
	);
}

export function GallerySecondPage() {
	return (
		<section className="gallery-slide gallery-slide-two flex w-full flex-col gap-[2.5em] bg-[var(--BG)] px-[1em] py-[2.5em]">
				<div className="flex w-full flex-row items-start gap-[2em]">
					<div className="mr-[0.5em] flex h-full min-w-0 flex-[0_0_30%] flex-col">
						<Image
							className="block h-auto min-w-0 w-full object-cover"
							src={narrowLeft}
							alt=""
							width={1000}
							height={1508}
							sizes="(max-width: 430px) 30vw, 129px"
						/>
					</div>
					<div className="flex h-full min-w-0 flex-1 flex-col">
						<Image
							className="block h-auto min-w-0 w-full object-cover"
							src={tallRight}
							alt=""
							width={2048}
							height={3089}
							sizes="(max-width: 430px) 55vw, 237px"
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
	);
}

export function GalleryThirdPage() {
	return (
		<section className="gallery-slide gallery-slide-three flex w-full flex-col gap-[2.5em] bg-white px-[1em] py-[2.5em]">
				<div className="flex flex-col">
					<Image
						className="block h-auto w-[74%]"
						src={motionPhoto}
						alt=""
						width={1200}
						height={1500}
						sizes="(max-width: 430px) 74vw, 318px"
						preload
						unoptimized
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
	);
}

export function GalleryClosing() {
	return (
		<section className="gallery-slide gallery-slide-closing flex h-full w-full items-center justify-center bg-[var(--BG)] px-[1em]">
			<Image className="block h-auto w-[80%]" src={wedding.assets.cats} alt="" width={1800} height={2223} sizes="(max-width: 430px) 80vw, 344px" loading="eager" />
		</section>
	);
}
