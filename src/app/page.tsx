import Image from "next/image";
import { HorizontalPager } from "@/components/horizontal-pager";

const pages = Array.from({ length: 7 }, (_, index) => index + 1);

export default function Page() {
  return (
    <main className="invitation">
      <HorizontalPager>
        {pages.map((page) => (
          <section className="invitation-slide pdf-slide" key={page}>
            <Image src={`/assets/invitation-pages/page-${page}.jpg`} alt={`${page}번째 청첩장 페이지`} width={1801} height={3361} priority={page === 1} sizes="(max-width: 430px) 100vw, 430px" />
          </section>
        ))}
      </HorizontalPager>
    </main>
  );
}
