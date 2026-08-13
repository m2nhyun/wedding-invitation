import { EventSection } from "@/components/event-section";
import { EventPhotoSlide } from "@/components/event-photo-slide";
import { ContactSection } from "@/components/contact-section";
import { GallerySection } from "@/components/gallery-section";
import { IntroSection } from "@/components/intro-section";
import { IntroPhotoSlide } from "@/components/intro-photo-slide";
import { HorizontalPager } from "@/components/horizontal-pager";

export default function Page() {
  return (
    <main className="invitation">
      <HorizontalPager>
        <IntroSection />
        <section className="invitation-slide event-info-slide">
          <EventSection />
        </section>
        <IntroPhotoSlide />
        <EventPhotoSlide />
        <section className="invitation-slide contact-only-slide">
          <ContactSection />
        </section>
        <GallerySection />
      </HorizontalPager>
    </main>
  );
}
