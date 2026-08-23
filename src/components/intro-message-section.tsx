import { Fragment } from "react";
import { wedding } from "@/data/wedding";

export function IntroMessageSection() {
  return (
    <section className="invitation-slide intro-message-slide">
      <p className="intro-message">
        {wedding.intro.message.map((paragraph, paragraphIndex) => (
          <Fragment key={paragraph[0]}>
            {paragraphIndex > 0 ? <><br /><br /></> : null}
            {paragraph.map((line, lineIndex) => (
              <Fragment key={line}>{lineIndex > 0 ? <br /> : null}{line}</Fragment>
            ))}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
