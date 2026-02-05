document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LOGIC CUSTOM CURSOR ---
  const cursor = document.getElementById("cursor-dot");

  const moveCursor = (e) => {
    // Cek jika layar sentuh, skip logika ini
    if (window.matchMedia("(hover: none)").matches) return;

    // Gerakkan bola ke posisi mouse
    if (cursor) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    }
  };

  window.addEventListener("mousemove", moveCursor);

  // Efek Membesar saat Hover
  const hoverTargets = document.querySelectorAll(
    "a, button, .neo-card, .project-card, .theme-btn, .hover-trigger",
  );

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("hovering"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("hovering"),
    );
  });

  // --- 2. DARK MODE TOGGLE ---
  const themeBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Cek LocalStorage saat load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    htmlElement.setAttribute("data-theme", "dark");
    if (themeBtn) {
      const icon = themeBtn.querySelector("i");
      if (icon) icon.classList.replace("ph-moon", "ph-sun");
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const icon = themeBtn.querySelector("i");

      if (currentTheme === "dark") {
        htmlElement.setAttribute("data-theme", "light");
        if (icon) icon.classList.replace("ph-sun", "ph-moon");
        localStorage.setItem("theme", "light");
      } else {
        htmlElement.setAttribute("data-theme", "dark");
        if (icon) icon.classList.replace("ph-moon", "ph-sun");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // --- 3. MOBILE MENU ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = hamburger.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.replace("ph-list", "ph-x");
      } else {
        icon.classList.replace("ph-x", "ph-list");
      }
    });
  }

  // --- 4. SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      if (navLinks) navLinks.classList.remove("active");

      if (hamburger) {
        const icon = hamburger.querySelector("i");
        if (icon) icon.classList.replace("ph-x", "ph-list");
      }

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --- 5. SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- 6. RANDOM CHAOS (ROTATION) ---
  const cards = document.querySelectorAll(".neo-card, .project-card");
  cards.forEach((card) => {
    const randomRot = Math.random() * 4 - 2;
    card.style.transform = `rotate(${randomRot}deg)`;

    card.addEventListener("mouseenter", () => {
      card.style.transform = "rotate(0deg) translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `rotate(${randomRot}deg)`;
    });
  });

  console.log("SYSTEM: ONLINE");
});
