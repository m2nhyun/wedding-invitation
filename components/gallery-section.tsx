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
      <section className="flex h-auto w-full flex-col bg-[var(--ivory)] py-[2.5em] px-[1em]">
        <img
          className="block h-auto w-full"
          src={wedding.assets.main}
          alt=""
        />
      </section>

      <section className="flex flex-row">
        <div className="flex flex-1 flex-col">
          <img
            className="block h-auto w-full"
            src={leftPortrait}
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center bg-[var(--light)]">
          <img
            className="block h-auto w-[70%]"
            src={rightPortrait}
            alt=""
          />
        </div>
      </section>

      <section className="flex w-full flex-col gap-[1em] bg-[#f2f3f1] py-[2em] px-[1em]">
        <div className="flex w-full flex-row items-start gap-[1em]">
          <div className="mr-[2em] flex h-full min-w-0 flex-[0_0_33%] flex-col">
            <img
              className="block h-auto min-w-0 w-full object-cover"
              src={narrowLeft}
              alt=""
            />
          </div>
          <div className="flex h-full min-w-0 flex-1 flex-col">
            <img
              className="block h-auto min-w-0 w-full object-cover"
              src={tallRight}
              alt=""
            />
          </div>
        </div>

        <img
          className="block h-auto w-full"
          src={widePhoto}
          alt=""
        />
        <div className="flex flex-col">
          <img
            className="block h-auto w-[74%]"
            src={motionPhoto}
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <img
            className="ml-auto block h-auto w-[68%]"
            src={rightAligned}
            alt=""
          />
        </div>
        <div className="mx-auto my-[1.5em] flex w-[33%] flex-col">
          <img
            className="block h-auto w-full"
            src={smallCenter}
            alt=""
          />
        </div>

        <img
          className="mx-auto my-[1em] block h-auto w-[1.8em]"
          src={wedding.assets.glyph03}
          alt=""
        />
      </section>
    </>
  );
}
