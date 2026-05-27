// lenis-scroll.js

// Import Lenis for smooth scrolling and GSAP/ScrollTrigger for animations
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);

  // Determine if device is mobile (width <= 900px)
  let isMobile = window.innerWidth <= 900;

  const desktopScrollSettings = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1,
    wheelMultiplier: 1,
    orientation: "vertical",
    smoothWheel: true,
    syncTouch: true,
  };

  let lenis = null;

  const createLenis = () => {
    if (lenis || isMobile) return;
    lenis = new Lenis(desktopScrollSettings);
    lenis.on("scroll", ScrollTrigger.update);
  };

  const destroyLenis = () => {
    if (!lenis) return;
    lenis.destroy();
    lenis = null;
  };

  createLenis();

  // Integrate Lenis with GSAP's ticker for smooth desktop animation.
  gsap.ticker.add((time) => {
    if (lenis) lenis.raf(time * 1000);
  });

  // Disable GSAP lag smoothing to prevent animation delays
  gsap.ticker.lagSmoothing(0);

  // Handle window resize to update scroll settings
  const handleResize = () => {
    const wasMobile = isMobile; // Store previous mobile state
    isMobile = window.innerWidth <= 900; // Update mobile state

    if (wasMobile !== isMobile) {
      if (isMobile) {
        destroyLenis();
      } else {
        createLenis();
      }
      ScrollTrigger.refresh();
    }
  };

  // Add resize event listener to handle mobile/desktop transitions
  window.addEventListener("resize", handleResize);
});
