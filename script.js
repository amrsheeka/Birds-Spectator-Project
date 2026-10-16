const form = document.querySelector("#sighting-form");
const successMessage = document.querySelector("#success-message");
const heroImages = [...document.querySelectorAll(".hero-gallery img")];
let currentImage = 0;

const revealItems = [...document.querySelectorAll("[data-reveal]")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");
  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (!prefersReducedMotion) {
  window.setInterval(() => {
    heroImages[currentImage].classList.remove("active");
    currentImage = (currentImage + 1) % heroImages.length;
    heroImages[currentImage].classList.add("active");
  }, 6000);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  successMessage.classList.add("visible");
  form.reset();
});
