document.addEventListener("DOMContentLoaded", () => {
	const sections = document.querySelectorAll("body > div");

	sections.forEach((section) => {
		const normalElements = section.querySelectorAll(
			"h1, h2, p, a, img:not([src$='.svg'])",
		);

		const svgElements = section.querySelectorAll("img[src$='.svg']");

		normalElements.forEach((element, index) => {
			element.classList.add("scroll-hidden");

			element.style.setProperty("--scroll-delay", `${index * 120}ms`);
		});

		svgElements.forEach((element, index) => {
			element.classList.add("scroll-hidden", "scroll-svg");

			const svgDelay = normalElements.length * 120 + 300 + index * 120;

			element.style.setProperty("--scroll-delay", `${svgDelay}ms`);
		});
	});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				const section = entry.target;
				const elements = section.querySelectorAll(".scroll-hidden");

				elements.forEach((element) => {
					element.classList.add("show");
				});

				observer.unobserve(section);
			});
		},
		{
			threshold: 0.08,
			rootMargin: "0px 0px -8% 0px",
		},
	);

	sections.forEach((section) => {
		observer.observe(section);
	});
});
