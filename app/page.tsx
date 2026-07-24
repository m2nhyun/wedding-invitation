import { ContactSection } from "@/components/contact-section";
import { EventSection } from "@/components/event-section";
import { GallerySection } from "@/components/gallery-section";
import { IntroSection } from "@/components/intro-section";
import { ScrollMotion } from "@/components/scroll-motion";

export default function Page() {
  return (
    <main className="block">
      <ScrollMotion />
      <IntroSection />
      <EventSection />
      <ContactSection />
      <GallerySection />
    </main>
  );
}
