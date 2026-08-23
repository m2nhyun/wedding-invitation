import { EventPhoto } from "@/components/event-photo-slide";
import { ContactSection } from "@/components/contact-section";
import { GallerySection } from "@/components/gallery-section";
import { IntroSection } from "@/components/intro-section";
import { IntroMessageSection } from "@/components/intro-message-section";
import { HorizontalPager } from "@/components/horizontal-pager";

export default function Page() {
  return (
    <main className="invitation">
      <HorizontalPager>
        <IntroSection />
        <IntroMessageSection />
        <section className="invitation-slide event-combined-slide">
          <EventPhoto />
        </section>
        <section className="invitation-slide contact-only-slide">
          <ContactSection />
        </section>
        <GallerySection />
      </HorizontalPager>
    </main>
  );
}
