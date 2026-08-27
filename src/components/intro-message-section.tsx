import { Fragment } from "react";
import { wedding } from "@/data/wedding";

export function IntroMessageSection() {
  return (
    <section className="invitation-slide intro-message-slide">
      <div className="intro-message">
        {wedding.intro.message.map((paragraph) => (
          <p className="intro-message-paragraph" key={paragraph[0]}>
            {paragraph.map((line, lineIndex) => (
              <Fragment key={line}>{lineIndex > 0 ? <br /> : null}{line}</Fragment>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
