import { Fragment } from "react";
import Image from "next/image";
import { wedding } from "@/data/wedding";

export function IntroSection() {
  return (
    <section className="invitation-slide intro-slide">
      <h2 className="py-[4em] text-[1.32em] leading-[1.75] tracking-[0.1em] text-[var(--olive)]">
        {wedding.couple.groom.name} {wedding.couple.bride.name}
        <br />
        {wedding.intro.title}
      </h2>

      <p className="intro-message">
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

      <Image
        className="intro-glyph"
        src={wedding.assets.glyph01}
        alt={wedding.intro.logoAlt}
        width={101}
        height={96}
        sizes="2em"
      />
    </section>
  );
}
