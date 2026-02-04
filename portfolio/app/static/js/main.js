console.log("main.js carregou ✅✅✅✅✅✅✅✅✅");

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

// Animacao cubos

(function trailEffect() {
  // roda só na home
  if (!document.body.classList.contains("home")) return;

  const canvas = document.getElementById("trailCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  function resize() {
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const MAX = 80;

  let lastX = null, lastY = null;

  function spawn(x, y, vx, vy) {
    const speed = Math.min(20, Math.hypot(vx, vy));
    const count = Math.max(1, Math.floor(speed / 6));

    for (let i = 0; i < count; i++) {
      if (particles.length > MAX) particles.shift();

      const size = 2 + Math.floor(Math.random() * 3);
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: vx * 0.08 + (Math.random() - 0.5) * 0.7,
        vy: vy * 0.08 + (Math.random() - 0.5) * 0.7,
        size,
        life: 1,
        decay: 0.014 + Math.random() * 0.02,
        rot: Math.random() * Math.PI,
        rotV: (Math.random() - 0.5) * 0.08
      });
    }
  }

 function draw(p) {
  const a = Math.max(0, p.life);

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);

  ctx.globalAlpha = a * 0.55;
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(210,210,210,1)";

  ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

  ctx.restore();
}

  function tick() {
    // “apaga” devagar pra criar rastro
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(11,11,12,0.18)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.globalCompositeOperation = "lighter";

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.98; p.vy *= 0.98;
      p.rot += p.rotV;
      p.life -= p.decay;

      draw(p);

      if (p.life <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(tick);
  }

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const vx = lastX == null ? 0 : x - lastX;
    const vy = lastY == null ? 0 : y - lastY;

    lastX = x; lastY = y;

    spawn(x, y, vx, vy);
  });

  // primeira limpeza
  ctx.fillStyle = "rgba(160,180,160,1)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  requestAnimationFrame(tick);
})();
