"use client";

import { useEffect } from "react";

type ScrollMotionType = "text" | "image" | "svg";

const textSelector = "h1, h2, p, a";
const imageSelector = "img:not([src$='.svg'])";
const svgSelector = "img[src$='.svg']";

export function ScrollMotion() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main > section");
    const allElements: HTMLElement[] = [];

    sections.forEach((section) => {
      const addElements = (selector: string, type: ScrollMotionType) => {
        section.querySelectorAll<HTMLElement>(selector).forEach((element) => {
          element.dataset.scrollMotion = type;
          element.style.setProperty("--scroll-delay", "0ms");
          allElements.push(element);
        });
      };

      addElements(textSelector, "text");
      addElements(imageSelector, "image");
      addElements(svgSelector, "svg");
    });

    const showElement = (element: HTMLElement, delay = 0) => {
      element.style.setProperty("--scroll-delay", `${delay}ms`);
      element.classList.add("scroll-motion-visible");
    };

    const initialElements = allElements
      .filter((element) => {
        const rect = element.getBoundingClientRect();

        return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      })
      .sort(
        (first, second) =>
          first.getBoundingClientRect().top -
          second.getBoundingClientRect().top,
      );

    const initialElementSet = new Set(initialElements);
    const scrollElements = allElements.filter(
      (element) => !initialElementSet.has(element),
    );

    const initialTimer = window.setTimeout(() => {
      initialElements.forEach((element, index) => {
        const isSvg = element.dataset.scrollMotion === "svg";
        const delay = isSvg ? index * 260 + 650 : index * 260;

        showElement(element, delay);
      });
    }, 700);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const delay = element.dataset.scrollMotion === "svg" ? 650 : 0;

          showElement(element, delay);
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    scrollElements.forEach((element) => observer.observe(element));

    const scrollToTopButton = document.querySelector<HTMLButtonElement>(
      "[data-scroll-to-top]",
    );
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTopButton?.addEventListener("click", scrollToTop);

    return () => {
      window.clearTimeout(initialTimer);
      observer.disconnect();
      scrollToTopButton?.removeEventListener("click", scrollToTop);

      allElements.forEach((element) => {
        element.classList.remove("scroll-motion-visible");
        element.style.removeProperty("--scroll-delay");
        delete element.dataset.scrollMotion;
      });
    };
  }, []);

  return null;
}
