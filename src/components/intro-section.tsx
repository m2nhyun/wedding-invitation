import Image from "next/image";
import { wedding } from "@/data/wedding";

export function IntroSection() {
  return (
    <section className="invitation-slide intro-slide">
      <h2>
        {wedding.couple.groom.name} {wedding.couple.bride.name}
        <br />
        {wedding.intro.title}
      </h2>
      <Image
        className="intro-hero-photo"
        src={wedding.assets.intro}
        alt="김제현과 송영현"
        width={3089}
        height={2048}
        sizes="(max-width: 430px) calc(100vw - 2rem), 398px"
      />
    </section>
  );
}
