"use client";

import { useEffect } from "react";

const normalHiddenClasses = [
  "opacity-0",
  "translate-y-[30px]",
  "transition-[opacity,transform]",
  "duration-[900ms]",
  "ease-[ease]",
  "will-change-[opacity,transform]",
] as const;

const svgHiddenClasses = [
  "opacity-0",
  "-translate-y-[20px]",
  "transition-[opacity,transform]",
  "duration-[900ms]",
  "ease-out",
  "will-change-[opacity,transform]",
] as const;

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
        element.dataset.scrollMotion = "normal";
        element.classList.add(...normalHiddenClasses);
        element.style.transitionDelay = `${index * 120}ms`;
      });

      svgElements.forEach((element, index) => {
        element.dataset.scrollMotion = "svg";
        element.classList.add(...svgHiddenClasses);
        element.style.transitionDelay = `${
          normalElements.length * 120 + 300 + index * 120
        }ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target
            .querySelectorAll<HTMLElement>("[data-scroll-motion]")
            .forEach((element) => {
              element.classList.remove(
                "opacity-0",
                element.dataset.scrollMotion === "svg"
                  ? "-translate-y-[20px]"
                  : "translate-y-[30px]",
              );
              element.classList.add("translate-y-0", "opacity-100");
            });
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
