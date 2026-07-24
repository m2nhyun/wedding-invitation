import { wedding } from "@/data/wedding";

export function IntroSection() {
  return (
    <section className="flex flex-col gap-[2.2em] bg-[var(--light)] pt-[2em] pb-[1.3em]">
      <h2 className="text-[1.2em] leading-[1.85em] tracking-[0.1em] text-[var(--olive)]">
        {wedding.couple.groom.name} {wedding.couple.bride.name}
        <br />
        결혼합니다.
      </h2>

      <img
        className="block h-auto w-full"
        src={wedding.assets.intro}
        alt=""
      />

      <p className="pr-[0.8em] pl-3 text-center text-[0.96em] leading-[1.7em] text-[var(--olive)]">
        유난히 따뜻했던 2017년 가을 시작된 대화는
        <br />
        수많은 계절을 지나 지금까지 이어지고 있습니다.
        <br />
        <br />
        앞으로도 서로의 곁에서 함께 장마를 보고,
        <br />
        새하얀 크리스마스를 맞이하려 합니다.
        <br />
        <br />
        2026년 가을, 소중한 약속이 시작되는 자리에 오셔서
        <br />
        따뜻한 응원과 축복으로 자리를 빛내주세요.
      </p>

      <img
        className="ml-[2em] -mt-[0.6em] mb-[0.6em] block h-auto w-[2.5em]"
        src={wedding.assets.glyph01}
        alt="Logo"
      />
    </section>
  );
}
