document.addEventListener("DOMContentLoaded", () => {
	const viewport = document.querySelector(".invitation-viewport");
	if (!viewport) return;

	const pages = Array.from(viewport.children);
	const dots = document.querySelector(".page-dots");
	const previous = document.querySelector(".page-arrow-previous");
	const next = document.querySelector(".page-arrow-next");
	let page = 0;

	pages.forEach((_, index) => {
		const dot = document.createElement("button");
		dot.type = "button";
		dot.setAttribute("aria-label", `${index + 1}번째 슬라이드`);
		dot.addEventListener("click", () => goTo(index));
		dots?.appendChild(dot);
	});

	const updatePager = () => {
		page = Math.round(viewport.scrollLeft / Math.max(viewport.clientWidth, 1));
		dots?.querySelectorAll("button").forEach((dot, index) => dot.classList.toggle("is-active", index === page));
		if (previous) previous.disabled = page === 0;
		if (next) next.disabled = page === pages.length - 1;
	};
	const goTo = (index) => viewport.scrollTo({ left: index * viewport.clientWidth, behavior: "smooth" });

	viewport.addEventListener("scroll", updatePager, { passive: true });
	viewport.addEventListener("wheel", (event) => {
		if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
		event.preventDefault();
		viewport.scrollBy({ left: event.deltaY, behavior: "smooth" });
	}, { passive: false });
	previous?.addEventListener("click", () => goTo(Math.max(page - 1, 0)));
	next?.addEventListener("click", () => goTo(Math.min(page + 1, pages.length - 1)));
	window.addEventListener("keydown", (event) => {
		if (event.key === "ArrowRight") goTo(Math.min(page + 1, pages.length - 1));
		if (event.key === "ArrowLeft") goTo(Math.max(page - 1, 0));
	});
	document.getElementById("glyph03")?.addEventListener("click", () => goTo(0));
	const giftModal = document.querySelector(".gift-modal");
	const giftTitle = document.getElementById("gift-modal-title");
	const giftList = document.querySelector(".gift-account-list");
	const accounts = {
		groom: { title: "신랑측", rows: [["김명국", "우리은행 025 102712 02 2501"], ["김정희", "신한은행 110 448 016880"], ["김제현", "카카오뱅크 3333 02 4025793"]] },
		bride: { title: "신부측", rows: [["송두석", "SC제일은행 111-20-334083"], ["한정희", "농협은행 563-02-098074"], ["송영현", "신한은행 110-429-752632"]] },
	};
	const closeGiftModal = () => { if (giftModal) giftModal.hidden = true; };
	document.querySelectorAll("[data-gift-side]").forEach((button) => {
		button.addEventListener("click", () => {
			const side = button.dataset.giftSide;
			const detail = accounts[side];
			if (!detail || !giftModal || !giftTitle || !giftList) return;
			giftTitle.textContent = detail.title;
			giftList.replaceChildren(...detail.rows.map(([name, account]) => {
				const row = document.createElement("div");
				const text = document.createElement("span");
				text.textContent = `${name}  ${account}`;
				const copy = document.createElement("button");
				copy.type = "button";
				copy.textContent = "복사";
				copy.addEventListener("click", async () => { await navigator.clipboard.writeText(account); copy.textContent = "완료"; });
				row.append(text, copy);
				return row;
			}));
			giftModal.hidden = false;
		});
	});
	document.querySelector(".gift-modal-close")?.addEventListener("click", closeGiftModal);
	document.querySelector(".gift-modal-backdrop")?.addEventListener("click", closeGiftModal);
	updatePager();

	return;

	const normalElements = document.querySelectorAll(
		"body h2, body h2, body p, body a, body img:not([src$='.svg'])",
	);

	const svgElements = document.querySelectorAll("body img[src$='.svg']");
	const allElements = [];

	// 일반 요소 설정
	normalElements.forEach((element) => {
		element.classList.add("scroll-hidden");
		element.style.setProperty("--scroll-delay", "0ms");

		allElements.push(element);
	});

	// SVG 설정
	svgElements.forEach((element) => {
		element.classList.add("scroll-hidden", "scroll-svg");
		element.style.setProperty("--scroll-delay", "0ms");

		allElements.push(element);
	});

	const showElement = (element, delay = 0) => {
		element.style.setProperty("--scroll-delay", `${delay}ms`);
		element.classList.add("show");
	};

	// 첫 화면에 보이는 요소 확인
	const isInitiallyVisible = (element) => {
		const rect = element.getBoundingClientRect();

		return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
	};

	// 첫 화면 요소
	const initialElements = allElements
		.filter((element) => isInitiallyVisible(element))
		.sort((a, b) => {
			const aTop = a.getBoundingClientRect().top;
			const bTop = b.getBoundingClientRect().top;

			return aTop - bTop;
		});

	// 이후 스크롤 요소
	const scrollElements = allElements.filter(
		(element) => !initialElements.includes(element),
	);

	// 로딩 0.7초 후 위에서부터 순차적으로 등장
	setTimeout(() => {
		initialElements.forEach((element, index) => {
			const isSvg = element.classList.contains("scroll-svg");

			// SVG는 같은 위치의 일반 요소보다 조금 더 늦게 등장
			const delay = isSvg ? index * 260 + 650 : index * 260;

			showElement(element, delay);
		});
	}, 700);

	// 이후 요소 개별 감지
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				const element = entry.target;
				const isSvg = element.classList.contains("scroll-svg");

				// 스크롤 중 SVG는 화면에 들어온 뒤 천천히 시작
				const delay = isSvg ? 650 : 0;

				showElement(element, delay);
				observer.unobserve(element);
			});
		},
		{
			threshold: 0.01,
			rootMargin: "0px 0px -12% 0px",
		},
	);

	scrollElements.forEach((element) => {
		observer.observe(element);
	});
});

// Gpyph03 Top
const glyph03 = document.getElementById("glyph03");

if (glyph03) {
	glyph03.style.cursor = "pointer";
	glyph03.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
}
