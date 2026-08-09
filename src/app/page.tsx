import { ContactSection } from "@/components/contact-section";
import { EventSection } from "@/components/event-section";
import { GallerySection } from "@/components/gallery-section";
import { IntroSection } from "@/components/intro-section";
import { HorizontalPager } from "@/components/horizontal-pager";

export default function Page() {
  return (
    <main className="invitation">
      <HorizontalPager>
        <IntroSection />
        <EventSection />
        <section className="invitation-slide">
          <ContactSection />
        </section>
        <GallerySection />
      </HorizontalPager>
    </main>
  );
}
