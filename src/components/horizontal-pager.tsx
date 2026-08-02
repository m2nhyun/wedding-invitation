"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";

export function HorizontalPager({ children }: { children: ReactNode }) {
	const pages = Children.toArray(children);
	const [page, setPage] = useState(0);
	const touchStartX = useRef<number | null>(null);
	const move = (amount: number) =>
		setPage((current) => Math.max(0, Math.min(pages.length - 1, current + amount)));

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") move(-1);
			if (event.key === "ArrowRight") move(1);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<main className="invitation-pager" aria-label="모바일 청첩장">
			<div className="invitation-track" style={{ transform: `translateX(-${page * 100}%)` }} onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const start = touchStartX.current; const end = event.changedTouches[0]?.clientX; touchStartX.current = null; if (start === null || end === undefined || Math.abs(end - start) < 42) return; move(end < start ? 1 : -1); }}>
				{pages.map((content, index) => <section className="invitation-page" key={index}>{content}</section>)}
			</div>
			<div className="corner-glyphs" aria-hidden="true">
				<img className="corner-glyph corner-glyph-bottom-left" src="/assets/glyph03.svg" alt="" />
				<img className="corner-glyph corner-glyph-bottom-right" src="/assets/glyph01.svg" alt="" />
			</div>
			<button className="page-arrow page-arrow-previous" type="button" aria-label="이전 페이지" disabled={page === 0} onClick={() => move(-1)}>PREV</button>
			<button className="page-arrow page-arrow-next" type="button" aria-label="다음 페이지" disabled={page === pages.length - 1} onClick={() => move(1)}>NEXT</button>
			<div className="page-indicator" aria-label={`${page + 1} / ${pages.length} 페이지`}>
				{pages.map((_, index) => <span className={index === page ? "is-active" : ""} key={index} />)}
			</div>
		</main>
	);
}
