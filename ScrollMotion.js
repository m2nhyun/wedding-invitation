document.addEventListener("DOMContentLoaded", () => {
	const viewport = document.querySelector(".invitation-viewport");
	if (!viewport) return;

	const preventGesture = (event) => event.preventDefault();
	const preventMultiTouch = (event) => {
		if (event.touches.length > 1) event.preventDefault();
	};
	["gesturestart", "gesturechange", "gestureend"].forEach((eventName) => {
		document.addEventListener(eventName, preventGesture, { passive: false });
	});
	document.addEventListener("touchmove", preventMultiTouch, { passive: false });
	document.addEventListener("contextmenu", (event) => {
		if (event.target.closest("img")) event.preventDefault();
	});

	const pages = Array.from(viewport.children);
	const dots = document.querySelector(".page-dots");
	const previous = document.querySelector(".page-arrow-previous");
	const next = document.querySelector(".page-arrow-next");
	let page = 0;

	const goTo = (index) => {
		viewport.scrollTo({
			left: index * viewport.clientWidth,
			behavior: "smooth",
		});
	};

	pages.forEach((_, index) => {
		const dot = document.createElement("button");
		dot.type = "button";
		dot.setAttribute("aria-label", `${index + 1}번째 슬라이드`);
		dot.addEventListener("click", () => goTo(index));
		dots?.appendChild(dot);
	});

	const updatePager = () => {
		page = Math.round(viewport.scrollLeft / Math.max(viewport.clientWidth, 1));
		dots?.querySelectorAll("button").forEach((dot, index) => {
			dot.classList.toggle("is-active", index === page);
		});
		if (previous) previous.disabled = page === 0;
		if (next) next.disabled = page === pages.length - 1;
	};

	viewport.addEventListener("scroll", updatePager, { passive: true });
	viewport.addEventListener(
		"wheel",
		(event) => {
			if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
			event.preventDefault();
			viewport.scrollBy({ left: event.deltaY, behavior: "smooth" });
		},
		{ passive: false },
	);

	let dragStartX = 0;
	let dragStartLeft = 0;
	let isDragging = false;

	viewport.addEventListener("pointerdown", (event) => {
		if (event.target.closest("button, a")) return;
		dragStartX = event.clientX;
		dragStartLeft = viewport.scrollLeft;
		isDragging = true;
		viewport.setPointerCapture(event.pointerId);
	});
	viewport.addEventListener("pointermove", (event) => {
		if (!isDragging) return;
		viewport.scrollLeft = dragStartLeft - (event.clientX - dragStartX);
	});
	viewport.addEventListener("pointerup", (event) => {
		if (!isDragging) return;
		isDragging = false;
		viewport.releasePointerCapture(event.pointerId);
		goTo(Math.round(viewport.scrollLeft / viewport.clientWidth));
	});
	viewport.addEventListener("pointercancel", () => {
		isDragging = false;
	});

	previous?.addEventListener("click", () => goTo(Math.max(page - 1, 0)));
	next?.addEventListener("click", () =>
		goTo(Math.min(page + 1, pages.length - 1)),
	);
	window.addEventListener("keydown", (event) => {
		if (event.key === "ArrowRight") {
			goTo(Math.min(page + 1, pages.length - 1));
		}
		if (event.key === "ArrowLeft") {
			goTo(Math.max(page - 1, 0));
		}
	});

	const giftModal = document.querySelector(".gift-modal");
	const giftTitle = document.getElementById("gift-modal-title");
	const giftList = document.querySelector(".gift-account-list");
	const accounts = {
		groom: {
			title: "신랑측",
			rows: [
				["김명국", "우리은행 025 102712 02 2501"],
				["김정희", "신한은행 110 448 016880"],
				["김제현", "카카오뱅크 3333 02 4025793"],
			],
		},
		bride: {
			title: "신부측",
			rows: [
				["송두석", "SC제일은행 111-20-334083"],
				["한정희", "농협은행 563-02-098074"],
				["송영현", "신한은행 110-429-752632"],
			],
		},
	};
	const closeGiftModal = () => {
		if (giftModal) giftModal.hidden = true;
	};

	document.querySelectorAll("[data-gift-side]").forEach((button) => {
		button.addEventListener("click", () => {
			const detail = accounts[button.dataset.giftSide];
			if (!detail || !giftModal || !giftTitle || !giftList) return;

			giftTitle.textContent = detail.title;
			giftList.replaceChildren(
				...detail.rows.map(([name, account]) => {
					const row = document.createElement("div");
					const text = document.createElement("span");
					const copy = document.createElement("button");
					text.textContent = `${name}  ${account}`;
					copy.type = "button";
					copy.textContent = "복사";
					copy.addEventListener("click", async () => {
						await navigator.clipboard.writeText(account);
						copy.textContent = "완료";
					});
					row.append(text, copy);
					return row;
				}),
			);
			giftModal.hidden = false;
		});
	});

	document
		.querySelector(".gift-modal-close")
		?.addEventListener("click", closeGiftModal);
	document
		.querySelector(".gift-modal-backdrop")
		?.addEventListener("click", closeGiftModal);

	const revealObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("slide-visible");
				}
			});
		},
		{ root: viewport, threshold: 0.55 },
	);
	pages.forEach((slide) => revealObserver.observe(slide));
	updatePager();
});
