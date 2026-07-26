document.addEventListener("DOMContentLoaded", () => {
	const normalElements = document.querySelectorAll(
		"body h1, body h2, body p, body a, body img:not([src$='.svg'])",
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
