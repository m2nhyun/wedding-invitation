import { Fragment } from "react";
import Image from "next/image";
import { wedding } from "@/data/wedding";

export function IntroSection() {
  return (
    <section className="intro-section flex flex-col bg-[var(--BG)]">
      <h2 className="py-[4em] text-[1.32em] leading-[1.75] tracking-[0.1em] text-[var(--olive)]">
        {wedding.couple.groom.name} {wedding.couple.bride.name}
        <br />
        {wedding.intro.title}
      </h2>

      <Image
        className="block h-auto w-full"
        src={wedding.assets.intro}
        alt=""
        width={3089}
        height={2048}
        sizes="(max-width: 430px) 100vw, 430px"
        preload
      />

      <p className="intro-message text-center text-[1.1em] leading-[1.7] text-[var(--olive)]">
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

    </section>
  );
}
