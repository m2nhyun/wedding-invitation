import { wedding } from "@/data/wedding";

export function IntroSection() {
  return (
    <section className="div1">
      <h2>
        {wedding.couple.groom.name} {wedding.couple.bride.name}
        <br />
        결혼합니다.
      </h2>

      <img src={wedding.assets.intro} alt="" />

      <p>
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

      <img id="glyph01" src={wedding.assets.glyph01} alt="Logo" />
    </section>
  );
}
