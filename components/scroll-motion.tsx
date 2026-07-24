"use client";

import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    const sections = document.querySelectorAll("main > section");

    sections.forEach((section) => {
      const normalElements = section.querySelectorAll<HTMLElement>(
        "h1, h2, p, a, img:not([src$='.svg'])",
      );
      const svgElements =
        section.querySelectorAll<HTMLElement>("img[src$='.svg']");

      normalElements.forEach((element, index) => {
        element.classList.add("scroll-hidden");
        element.style.setProperty("--scroll-delay", `${index * 120}ms`);
      });

      svgElements.forEach((element, index) => {
        element.classList.add("scroll-hidden", "scroll-svg");
        element.style.setProperty(
          "--scroll-delay",
          `${normalElements.length * 120 + 300 + index * 120}ms`,
        );
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target
            .querySelectorAll(".scroll-hidden")
            .forEach((element) => element.classList.add("show"));
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
