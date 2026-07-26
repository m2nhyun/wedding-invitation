import { Fragment } from "react";
import { wedding } from "@/data/wedding";

export function IntroSection() {
	return (
		<section className="flex flex-col gap-[2.2rem] bg-[var(--BG)] pt-[2rem] pb-[1.3rem]">
			<h2 className="text-[1.2rem] leading-[1.85] tracking-[0.12rem] text-[var(--olive)]">
				{wedding.couple.groom.name} {wedding.couple.bride.name}
				<br />
				{wedding.intro.title}
			</h2>

			<img className="block h-auto w-full" src={wedding.assets.intro} alt="" />

			<p className="pr-[0.8rem] pl-3 text-center text-[0.96rem] leading-[1.7] text-[var(--olive)]">
				{wedding.intro.message.map((paragraph, paragraphIndex) => (
					<Fragment key={paragraph[0]}>
						{paragraphIndex > 0 ? (
							<>
								<br />
								<br />
							</>
						) : null}
						{paragraph.map((line, lineIndex) => (
							<Fragment key={line}>
								{lineIndex > 0 ? <br /> : null}
								{line}
							</Fragment>
						))}
					</Fragment>
				))}
			</p>

			<img
				className="ml-[2rem] -mt-[0.6rem] mb-[0.6rem] block h-auto w-[2.5rem]"
				src={wedding.assets.glyph01}
				alt={wedding.intro.logoAlt}
			/>
		</section>
	);
}
