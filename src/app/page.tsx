import { ContactSection } from "@/components/contact-section";
import { EventSection } from "@/components/event-section";
import { GalleryClosing, GalleryFirstPage, GallerySecondPage, GalleryThirdPage } from "@/components/gallery-section";
import { HorizontalPager } from "@/components/horizontal-pager";
import { IntroSection } from "@/components/intro-section";

export default function Page() {
  return (
    <HorizontalPager>
      <IntroSection />
      <><EventSection /><ContactSection /></>
      <GalleryFirstPage />
      <GallerySecondPage />
      <GalleryThirdPage />
      <GalleryClosing />
    </HorizontalPager>
  );
}
