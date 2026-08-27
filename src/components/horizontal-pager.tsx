"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type HorizontalPagerProps = {
  children: ReactNode;
};

export function HorizontalPager({ children }: HorizontalPagerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [activePageOnLight, setActivePageOnLight] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updatePage = () => {
      const nextPage = Math.round(viewport.scrollLeft / Math.max(viewport.clientWidth, 1));
      setPage(nextPage);
      setActivePageOnLight(
        slides[nextPage]?.matches(
          ".event-combined-slide, .contact-only-slide, .gallery-story-slide",
        ) ?? false,
      );
    };
    const updatePageCount = () => setPageCount(viewport.children.length);
    const slides = Array.from(
      viewport.querySelectorAll<HTMLElement>(".invitation-slide"),
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("slide-visible", entry.isIntersecting);
        });
      },
      { root: viewport, threshold: 0.55 },
    );
    slides.forEach((slide) => revealObserver.observe(slide));
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      viewport.scrollBy({ left: event.deltaY, behavior: "smooth" });
    };
		const preventGesture = (event: Event) => event.preventDefault();
		const preventMultiTouch = (event: TouchEvent) => {
			if (event.touches.length > 1) event.preventDefault();
		};
		const preventImageMenu = (event: MouseEvent) => {
			if (event.target instanceof Element && event.target.closest("img")) {
				event.preventDefault();
			}
		};
		const markUnavailableImage = (event: Event) => {
			if (event.target instanceof HTMLImageElement) {
				event.target.classList.add("image-unavailable");
			}
		};

    viewport.addEventListener("scroll", updatePage, { passive: true });
    viewport.addEventListener("wheel", onWheel, { passive: false });
		["gesturestart", "gesturechange", "gestureend"].forEach((eventName) => {
			document.addEventListener(eventName, preventGesture, { passive: false });
		});
		document.addEventListener("touchmove", preventMultiTouch, { passive: false });
		document.addEventListener("contextmenu", preventImageMenu);
		viewport.addEventListener("error", markUnavailableImage, true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") viewport.scrollBy({ left: viewport.clientWidth, behavior: "smooth" });
      if (event.key === "ArrowLeft") viewport.scrollBy({ left: -viewport.clientWidth, behavior: "smooth" });
    };
    const onTopButtonClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-scroll-to-top]")) return;
      viewport.scrollTo({ left: 0, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKeyDown);
    viewport.addEventListener("click", onTopButtonClick);
    updatePageCount();
    window.addEventListener("resize", updatePageCount);
    return () => {
      viewport.removeEventListener("scroll", updatePage);
      viewport.removeEventListener("wheel", onWheel);
			["gesturestart", "gesturechange", "gestureend"].forEach((eventName) => {
				document.removeEventListener(eventName, preventGesture);
			});
			document.removeEventListener("touchmove", preventMultiTouch);
			document.removeEventListener("contextmenu", preventImageMenu);
			viewport.removeEventListener("error", markUnavailableImage, true);
      window.removeEventListener("keydown", onKeyDown);
      viewport.removeEventListener("click", onTopButtonClick);
      window.removeEventListener("resize", updatePageCount);
      revealObserver.disconnect();
    };
  }, []);

  const goTo = (index: number) => {
    viewportRef.current?.scrollTo({ left: index * viewportRef.current.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="invitation-pager">
      <div className="invitation-viewport" ref={viewportRef} aria-label="청첩장 슬라이드">
        {children}
      </div>
      <nav className={`pager-controls${activePageOnLight ? " is-on-light" : ""}`} aria-label="슬라이드 이동">
        <button type="button" className="page-arrow page-arrow-previous" onClick={() => goTo(Math.max(page - 1, 0))} disabled={page === 0} aria-label="이전 슬라이드" />
        <div className="page-dots">{Array.from({ length: pageCount }, (_, index) => <button type="button" key={index} className={index === page ? "is-active" : ""} onClick={() => goTo(index)} aria-label={`${index + 1}번째 슬라이드`} />)}</div>
        <button type="button" className="page-arrow page-arrow-next" onClick={() => goTo(Math.min(page + 1, pageCount - 1))} disabled={page === pageCount - 1} aria-label="다음 슬라이드" />
      </nav>
    </div>
  );
}
