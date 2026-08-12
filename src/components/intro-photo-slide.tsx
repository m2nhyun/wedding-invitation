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
      <div className="intro-event-details">
        <p>
          {wedding.event.date}
          <br />
          {wedding.event.time}
          <br />
          {`${wedding.event.venue.replace(", ", "(")})`}
        </p>
        <div className="intro-map-links">
          <a href={wedding.event.naverMapUrl}>{wedding.event.naverMapLabel}</a>
          <span aria-hidden="true">/</span>
          <a href={wedding.event.kakaoMapUrl}>{wedding.event.kakaoMapLabel}</a>
        </div>
      </div>
    </section>
  );
}
