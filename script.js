(() => {
  const revealItems = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('.account-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const panel = button.nextElementSibling;
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', String(!isOpen));
      panel.setAttribute('aria-hidden', String(isOpen));
      panel.classList.toggle('is-open', !isOpen);
    });
  });

  const toast = document.querySelector('.toast');
  let toastTimer;

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-show'), 1800);
  };

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.dataset.copy;

      try {
        await navigator.clipboard.writeText(text);
        showToast('계좌번호를 복사했어요.');
      } catch (_) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        showToast('계좌번호를 복사했어요.');
      }
    });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
	const invitation = document.querySelector(".invitation");
	const track = document.querySelector(".invitation-track");
	const pages = Array.from(document.querySelectorAll(".invitation-page"));
	const previousButton = document.querySelector(".page-arrow-previous");
	const nextButton = document.querySelector(".page-arrow-next");
	const dots = Array.from(document.querySelectorAll(".page-indicator span"));

	if (!invitation || !track || !previousButton || !nextButton || !pages.length) {
		return;
	}

	let currentPage = 0;

	const renderPage = () => {
		track.style.transform = `translateX(-${currentPage * 100}%)`;
		previousButton.disabled = currentPage === 0;
		nextButton.disabled = currentPage === pages.length - 1;

		dots.forEach((dot, index) => {
			dot.classList.toggle("is-active", index === currentPage);
		});

		invitation.setAttribute(
			"aria-label",
			`모바일 청첩장 ${currentPage + 1} / ${pages.length} 페이지`,
		);
	};

	const movePage = (direction) => {
		const nextPage = Math.min(
			Math.max(currentPage + direction, 0),
			pages.length - 1,
		);

		if (nextPage === currentPage) return;
		currentPage = nextPage;
		renderPage();
	};

	previousButton.addEventListener("click", () => movePage(-1));
	nextButton.addEventListener("click", () => movePage(1));

	window.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			movePage(-1);
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			movePage(1);
		}
	});

	renderPage();
});
