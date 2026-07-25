document.addEventListener("DOMContentLoaded", () => {
	const sections = document.querySelectorAll("body > div");

	const showSection = (section) => {
		const elements = section.querySelectorAll(".scroll-hidden");

		elements.forEach((element) => {
			element.classList.add("show");
		});
	};

	sections.forEach((section) => {
		const normalElements = section.querySelectorAll(
			"h1, h2, p, a, img:not([src$='.svg'])",
		);

		const svgElements = section.querySelectorAll("img[src$='.svg']");

		normalElements.forEach((element, index) => {
			element.classList.add("scroll-hidden");

			element.style.setProperty("--scroll-delay", `${index * 180}ms`);
		});

		svgElements.forEach((element, index) => {
			element.classList.add("scroll-hidden", "scroll-svg");

			const svgDelay = normalElements.length * 180 + 300 + index * 160;

			element.style.setProperty("--scroll-delay", `${svgDelay}ms`);
		});
	});

	const firstSection = sections[0];

	if (firstSection) {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				setTimeout(() => {
					showSection(firstSection);
				}, 350);
			});
		});
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				showSection(entry.target);
				observer.unobserve(entry.target);
			});
		},
		{
			threshold: 0.15,
			rootMargin: "0px 0px -15% 0px",
		},
	);

	sections.forEach((section, index) => {
		if (index === 0) return;

		observer.observe(section);
	});
});
