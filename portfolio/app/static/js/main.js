const els = document.querySelectorAll(".reveal");

const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

els.forEach(el => obs.observe(el));

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  if (!menuBtn || !navLinks) return;

  navLinks.classList.toggle("is-open", open);
  menuBtn.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));

  // trava o scroll do body quando menu abre
  document.body.style.overflow = open ? "hidden" : "";
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("is-open");
    setMenu(!isOpen);
  });

  // fecha ao clicar num link
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  // fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
}