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
      <section className="flex h-auto w-full flex-col bg-[hsl(76,37%,80%)] px-[1rem] py-[2.5rem]">
        <img
          className="block h-auto w-full"
          src={wedding.assets.main}
          alt=""
        />
      </section>

      <section className="flex h-[44vh] w-full flex-row">
        <div className="h-full min-w-0 flex-1 overflow-hidden">
          <img
            className="block h-full w-full object-cover object-center"
            src={leftPortrait}
            alt=""
          />
        </div>
        <div className="flex h-full min-w-0 flex-1 items-center justify-center bg-[var(--BG)]">
          <img
            className="block h-auto w-[70%]"
            src={rightPortrait}
            alt=""
          />
        </div>
      </section>

      <section className="flex w-full flex-col gap-[1.5rem] bg-[var(--lightBG)] px-[1rem] py-[1.5rem]">
        <div className="flex w-full flex-row items-start gap-[1rem]">
          <div className="mr-[2rem] flex h-full min-w-0 flex-[0_0_30%] flex-col">
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

        <img className="block h-auto w-full" src={widePhoto} alt="" />
        <div className="flex flex-col">
          <img className="block h-auto w-[74%]" src={motionPhoto} alt="" />
        </div>

        <div className="mt-[2rem] flex flex-col">
          <img
            className="ml-auto block h-auto w-[68%]"
            src={rightAligned}
            alt=""
          />
        </div>
        <div className="mx-auto my-[2rem] flex w-[33%] flex-col">
          <img className="block h-auto w-full" src={smallCenter} alt="" />
        </div>

        <button
          className="mx-auto my-[1rem] block w-[1.8rem] cursor-pointer appearance-none border-0 bg-transparent p-0 transition-transform duration-200 active:scale-[0.94]"
          type="button"
          data-scroll-to-top
          aria-label={wedding.gallery.scrollToTopLabel}
        >
          <img
            className="block h-auto w-full"
            src={wedding.assets.glyph03}
            alt=""
          />
        </button>

        <img
          className="mx-auto my-[5rem] block h-auto w-[0.6rem]"
          src={wedding.assets.glyph05}
          alt=""
        />
        <img
          className="mx-auto mb-[2rem] block h-auto w-[80%]"
          src={wedding.assets.cats}
          alt=""
        />
      </section>
    </>
  );
}
