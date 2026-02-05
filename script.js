document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LOGIC CUSTOM CURSOR ---
  const cursor = document.getElementById("cursor-dot");

  // Fungsi untuk menggerakkan cursor
  const moveCursor = (e) => {
    // Cek jika layar sentuh (mobile), jangan jalankan
    if (window.matchMedia("(hover: none)").matches) return;

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  };

  window.addEventListener("mousemove", moveCursor);

  // Efek Membesar saat Hover elemen tertentu
  const hoverTargets = document.querySelectorAll(
    ".hover-trigger, a, button, .neo-card, .project-card",
  );

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("hovering"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("hovering"),
    );
  });

  // --- 2. LOGIC MOBILE MENU ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = hamburger.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.replace("ph-list", "ph-x");
    } else {
      icon.classList.replace("ph-x", "ph-list");
    }
  });

  // --- 3. LOGIC SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      navLinks.classList.remove("active"); // Close menu on click

      // Restore icon if closing menu
      const icon = hamburger.querySelector("i");
      if (icon) icon.classList.replace("ph-x", "ph-list");

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // --- 4. SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target); // Hanya animasi sekali
        }
      });
    },
    {
      threshold: 0.1, // Muncul ketika 10% terlihat
      rootMargin: "0px 0px -50px 0px", // Offset sedikit
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = themeBtn.querySelector("i");
  const htmlElement = document.documentElement;

  // Cek LocalStorage saat load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    htmlElement.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("ph-moon", "ph-sun");
  }

  themeBtn.addEventListener("click", () => {
    // Cek tema saat ini
    const currentTheme = htmlElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      // Pindah ke Light
      htmlElement.setAttribute("data-theme", "light");
      themeIcon.classList.replace("ph-sun", "ph-moon");
      localStorage.setItem("theme", "light");
    } else {
      // Pindah ke Dark
      htmlElement.setAttribute("data-theme", "dark");
      themeIcon.classList.replace("ph-moon", "ph-sun");
      localStorage.setItem("theme", "dark");
    }
  });

  // --- 5. RANDOM CHAOS (ROTATION) ---
  const cards = document.querySelectorAll(".neo-card, .project-card");

  cards.forEach((card) => {
    // Rotasi acak antara -2 sampai 2 derajat
    const randomRot = Math.random() * 4 - 2;

    // Set rotasi awal
    card.style.transform = `rotate(${randomRot}deg)`;

    // Reset saat hover (biar rapih saat dibaca)
    card.addEventListener("mouseenter", () => {
      card.style.transform = "rotate(0deg) translateY(-5px)";
    });

    // Balik miring lagi saat mouse keluar
    card.addEventListener("mouseleave", () => {
      card.style.transform = `rotate(${randomRot}deg)`;
    });
  });

  // Signature
  console.log(
    "%c SUMINTEN DEV %c NEO-BRUTALISM MODE ",
    "background: #000; color: #fff; padding: 5px; font-weight: bold;",
    "background: #FFD93D; color: #000; padding: 5px; font-weight: bold;",
  );
});
