import Image from "next/image";
import { wedding } from "@/data/wedding";

export function IntroPhotoSlide() {
  return (
    <section className="invitation-slide intro-photo-slide">
      <Image
        src={wedding.assets.intro}
        alt="김제현과 송영현"
        width={3089}
        height={2048}
        sizes="(max-width: 430px) 100vw, 430px"
        preload
      />
    </section>
  );
}
