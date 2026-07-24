import { wedding } from "@/data/wedding";

const [
  leftPortrait,
  rightPortrait,
  narrowLeft,
  tallRight,
  widePhoto,
  motionPhoto,
  rightAligned,
  smallCenter,
] = wedding.assets.gallery;

export function GallerySection() {
  return (
    <>
      <section className="relative flex h-auto w-full flex-col bg-[var(--ivory)] py-[2.5em] px-[1em]">
        <img
          className="relative block h-auto w-full"
          src={wedding.assets.main}
          alt=""
        />
      </section>

      <section className="relative flex flex-row">
        <div className="relative flex flex-1 flex-col">
          <img
            className="relative block h-auto w-full"
            src={leftPortrait}
            alt=""
          />
        </div>
        <div className="relative flex flex-1 flex-col items-center justify-center bg-[var(--light)]">
          <img
            className="relative block h-auto w-[70%]"
            src={rightPortrait}
            alt=""
          />
        </div>
      </section>

      <section className="relative flex w-full flex-col gap-[1em] bg-[#f2f3f1] py-[2em] px-[1em]">
        <div className="relative flex w-full flex-row items-start gap-[1em]">
          <div className="relative mr-[2em] flex h-full min-w-0 flex-[0_0_33%] flex-col">
            <img
              className="relative block h-auto min-w-0 w-full object-cover"
              src={narrowLeft}
              alt=""
            />
          </div>
          <div className="relative flex h-full min-w-0 flex-1 flex-col">
            <img
              className="relative block h-auto min-w-0 w-full object-cover"
              src={tallRight}
              alt=""
            />
          </div>
        </div>

        <img
          className="relative block h-auto w-full"
          src={widePhoto}
          alt=""
        />
        <div className="relative flex flex-col">
          <img
            className="relative block h-auto w-[74%]"
            src={motionPhoto}
            alt=""
          />
        </div>

        <div className="relative flex flex-col">
          <img
            className="relative ml-auto block h-auto w-[68%]"
            src={rightAligned}
            alt=""
          />
        </div>
        <div className="relative mx-auto my-[1.5em] flex w-[33%] flex-col">
          <img
            className="relative block h-auto w-full"
            src={smallCenter}
            alt=""
          />
        </div>

        <img
          className="relative mx-auto my-[1em] block h-auto w-[1.8em]"
          src={wedding.assets.glyph03}
          alt=""
        />
      </section>
    </>
  );
}
