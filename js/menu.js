// menu.js

import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const navOverlay = document.querySelector(".nav-overlay");
  const navItems = document.querySelectorAll(".nav-item");
  const hero = document.querySelector(".hero");
  let isMenuOpen = false;

  if (!menuToggleBtn || !navOverlay) return;

  const updateHeroNavVisibility = () => {
    if (!hero || isMenuOpen) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    document.body.classList.toggle("hero-nav-hidden", heroBottom > 80);
  };

  const openMenu = () => {
    isMenuOpen = true;
    document.body.classList.remove("hero-nav-hidden");
    menuToggleBtn.classList.add("menu-open");
    menuToggleBtn.setAttribute("aria-expanded", "true");
    navOverlay.style.pointerEvents = "all";

    gsap.killTweensOf([navOverlay, navItems]);
    gsap.set(navItems, { opacity: 0, y: -6 });
    gsap.to(navOverlay, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.28,
      ease: "power3.out",
    });
    gsap.to(navItems, {
      opacity: 1,
      y: 0,
      duration: 0.24,
      stagger: 0.035,
      ease: "power2.out",
      delay: 0.08,
    });
  };

  const closeMenu = () => {
    isMenuOpen = false;
    menuToggleBtn.classList.remove("menu-open");
    menuToggleBtn.setAttribute("aria-expanded", "false");
    navOverlay.style.pointerEvents = "none";

    gsap.killTweensOf([navOverlay, navItems]);
    gsap.to(navOverlay, {
      opacity: 0,
      y: -8,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.in",
      onComplete: updateHeroNavVisibility,
    });
  };

  updateHeroNavVisibility();
  window.addEventListener("scroll", updateHeroNavVisibility, { passive: true });
  window.addEventListener("resize", updateHeroNavVisibility);

  menuToggleBtn.addEventListener("click", () => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  });

  navItems.forEach((item) => {
    item.querySelector("a")?.addEventListener("click", (event) => {
      const href = event.currentTarget.getAttribute("href");
      const target = href?.startsWith("#") ? document.querySelector(href) : null;

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }

      if (isMenuOpen) closeMenu();
    });
  });
});
