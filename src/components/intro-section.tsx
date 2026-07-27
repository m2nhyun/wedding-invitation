import { Fragment } from "react";
import { wedding } from "@/data/wedding";

export function IntroSection() {
  return (
    <section className="flex flex-col bg-[var(--BG)]">
      <h2 className="py-[4.8rem] text-[1.2rem] leading-[1.85] tracking-[0.12rem] text-[var(--olive)]">
        {wedding.couple.groom.name} {wedding.couple.bride.name}
        <br />
        {wedding.intro.title}
      </h2>

      <img
        className="block h-auto w-full"
        src={wedding.assets.intro}
        alt=""
      />

      <p className="mt-[2.5rem] mb-[4rem] px-[0.8rem] text-center text-base leading-[1.7] text-[var(--olive)]">
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
        className="relative -top-[2.7rem] left-[2rem] block h-auto w-[2.5rem]"
        src={wedding.assets.glyph01}
        alt={wedding.intro.logoAlt}
      />
    </section>
  );
}
