(() => {
	const revealItems = document.querySelectorAll(".reveal");
	const reducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	if (reducedMotion || !("IntersectionObserver" in window)) {
		revealItems.forEach((item) => item.classList.add("is-visible"));
	} else {
		const observer = new IntersectionObserver(
			(entries, io) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					entry.target.classList.add("is-visible");
					io.unobserve(entry.target);
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
		);

		revealItems.forEach((item) => observer.observe(item));
	}

	document.querySelectorAll(".account-toggle").forEach((button) => {
		button.addEventListener("click", () => {
			const panel = button.nextElementSibling;
			const isOpen = button.getAttribute("aria-expanded") === "true";

			button.setAttribute("aria-expanded", String(!isOpen));
			panel.setAttribute("aria-hidden", String(isOpen));
			panel.classList.toggle("is-open", !isOpen);
		});
	});

	const toast = document.querySelector(".toast");
	let toastTimer;

	const showToast = (message) => {
		toast.textContent = message;
		toast.classList.add("is-show");
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => toast.classList.remove("is-show"), 1800);
	};

	document.querySelectorAll("[data-copy]").forEach((button) => {
		button.addEventListener("click", async () => {
			const text = button.dataset.copy;

			try {
				await navigator.clipboard.writeText(text);
				showToast("계좌번호를 복사했어요.");
			} catch (_) {
				const textarea = document.createElement("textarea");
				textarea.value = text;
				textarea.style.position = "fixed";
				textarea.style.opacity = "0";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				textarea.remove();
				showToast("계좌번호를 복사했어요.");
			}
		});
	});
})();
