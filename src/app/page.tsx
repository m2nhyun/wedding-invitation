import { ContactSection } from "@/components/contact-section";
import { EventSection } from "@/components/event-section";
import { GallerySection } from "@/components/gallery-section";
import { IntroSection } from "@/components/intro-section";
import { IntroPhotoSlide } from "@/components/intro-photo-slide";
import { HorizontalPager } from "@/components/horizontal-pager";

export default function Page() {
  return (
    <main className="invitation">
      <HorizontalPager>
        <IntroSection />
        <IntroPhotoSlide />
        <section className="invitation-slide event-contact-slide">
          <EventSection />
          <ContactSection />
        </section>
        <GallerySection />
      </HorizontalPager>
    </main>
  );
}
