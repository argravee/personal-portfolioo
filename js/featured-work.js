// featured-work.js

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  gsap.registerPlugin(ScrollTrigger);

  const cycleImg = document.querySelector(".portfolio-cycle-image");
  const heroTitle = document.querySelector(".portfolio-hero-title");
  const imgContainer = document.querySelector(".portfolio-image-container");
  const cards = gsap.utils.toArray(".portfolio-card");
  if (!cycleImg || !heroTitle || !imgContainer || cards.length === 0) return;
  
  let scrollTriggerInstance = null;
  let currentImageIndex = 1;
  let isCycling = true;
  const totalImages = 3;

  // Cycle interval
  const interval = setInterval(() => {
    if (isCycling && cycleImg) {
      currentImageIndex = currentImageIndex >= totalImages ? 1 : currentImageIndex + 1;
      cycleImg.src = `/images/work-items/work-item-${currentImageIndex}.png`;
    }
  }, 250);

  const initAnimations = () => {
    if (window.innerWidth <= 1000) {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }
      return;
    }

    if (scrollTriggerInstance) scrollTriggerInstance.kill();

    // Create section indicators
    const indicatorContainer = document.querySelector(".featured-work-indicator");
    if (indicatorContainer) {
      indicatorContainer.innerHTML = "";
      for (let section = 1; section <= 3; section++) {
        const sectionNumber = document.createElement("p");
        sectionNumber.className = "mn";
        sectionNumber.textContent = `0${section}`;
        indicatorContainer.appendChild(sectionNumber);
        for (let i = 0; i < 10; i++) {
          const indicator = document.createElement("div");
          indicator.className = "indicator";
          indicatorContainer.appendChild(indicator);
        }
      }
    }

    // Reset initial states
    gsap.set(heroTitle, { display: "flex", opacity: 1, scale: 1, y: 0 });
    gsap.set(imgContainer, { scale: 0.32, rotation: -8, xPercent: -50, yPercent: -50, x: 0, y: 0 });
    gsap.set(cards, { opacity: 0, x: 50, display: "none" });

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".portfolio-showcase",
      start: "top top",
      end: "+=5000", // 5000px duration
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // --- 1. Growing phase (0 to 0.15) ---
        if (p < 0.15) {
          isCycling = p === 0; // stop cycling immediately if scrolled
          if (p > 0) cycleImg.src = "/images/work-items/work-item-1.png"; // lock to first inference pic
          
          let growProgress = p / 0.15;
          
          gsap.set(heroTitle, {
            display: "flex",
            opacity: 1 - growProgress,
            scale: 1 + growProgress * 0.5,
          });
          gsap.set(imgContainer, { 
            scale: 0.32 + 0.78 * growProgress, // Grows behind the centered title
            rotation: -8 * (1 - growProgress), // rotates to 0
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0
          });
          
          // Cards hidden
          gsap.set(cards, { opacity: 0, display: "none" });
        }
        
        // --- 2. Splitting to side for Project 1 (0.15 to 0.25) ---
        else if (p >= 0.15 && p < 0.25) {
          isCycling = false;
          cycleImg.src = "/images/work-items/work-item-1.png";
          
          let splitP = (p - 0.15) / 0.10;
          
          gsap.set(heroTitle, { opacity: 0, display: "none" });
          
          gsap.set(imgContainer, { 
            scale: 1.1 - 0.3 * splitP, // Shrinks a bit to fit on left
            xPercent: -50,
            yPercent: -50,
            x: `${-25 * splitP}vw`, // Moves left
            y: 0, rotation: 0
          });
          
          gsap.set(cards, { display: "none", opacity: 0 });
          gsap.set(cards[0], { display: "block", opacity: splitP, x: 50 * (1 - splitP) });
        }
        
        // --- 3. Hold Project 1 (0.25 to 0.4) ---
        else if (p >= 0.25 && p < 0.4) {
          cycleImg.src = "/images/work-items/work-item-1.png";
          gsap.set(imgContainer, { scale: 0.8, xPercent: -50, yPercent: -50, x: "-25vw", y: 0, rotation: 0 });
          gsap.set(cards, { display: "none" });
          gsap.set(cards[0], { display: "block", opacity: 1, x: 0 });
        }

        // --- 4. Transition to Project 2 (0.4 to 0.5) ---
        else if (p >= 0.4 && p < 0.5) {
          cycleImg.src = "/images/work-items/work-item-2.png";
          let transP = (p - 0.4) / 0.1;

          gsap.set(imgContainer, { scale: 0.8, xPercent: -50, yPercent: -50, x: "-25vw", y: 0, rotation: 0 });
          gsap.set(cards, { display: "none" });
          gsap.set(cards[0], { display: "block", opacity: 1 - transP, x: -50 * transP });
          gsap.set(cards[1], { display: "block", opacity: transP, x: 50 * (1 - transP) });
        }
        
        // --- 5. Hold Project 2 (0.5 to 0.7) ---
        else if (p >= 0.5 && p < 0.7) {
          cycleImg.src = "/images/work-items/work-item-2.png";
          gsap.set(imgContainer, { scale: 0.8, xPercent: -50, yPercent: -50, x: "-25vw", y: 0, rotation: 0 });
          gsap.set(cards, { display: "none" });
          gsap.set(cards[1], { display: "block", opacity: 1, x: 0 });
        }
        
        // --- 6. Transition to Project 3 (0.7 to 0.8) ---
        else if (p >= 0.7 && p < 0.8) {
          cycleImg.src = "/images/work-items/work-item-3.png";
          let transP = (p - 0.7) / 0.1;

          gsap.set(imgContainer, { scale: 0.8, xPercent: -50, yPercent: -50, x: "-25vw", y: 0, rotation: 0 });
          gsap.set(cards, { display: "none" });
          gsap.set(cards[1], { display: "block", opacity: 1 - transP, x: -50 * transP });
          gsap.set(cards[2], { display: "block", opacity: transP, x: 50 * (1 - transP) });
        }

        // --- 7. Hold Project 3 (0.8 to 1.0) ---
        else if (p >= 0.8) {
          cycleImg.src = "/images/work-items/work-item-3.png";
          gsap.set(imgContainer, { scale: 0.8, xPercent: -50, yPercent: -50, x: "-25vw", y: 0, rotation: 0 });
          gsap.set(cards, { display: "none" });
          gsap.set(cards[2], { display: "block", opacity: 1, x: 0 });
        }

        // Update indicator opacity based on scroll progress
        const indicators = document.querySelectorAll(".indicator");
        const totalIndicators = indicators.length;
        const progressPerIndicator = 1 / totalIndicators;
        indicators.forEach((indicator, index) => {
          const indicatorStart = index * progressPerIndicator;
          const indicatorOpacity = p > indicatorStart ? 1 : 0.2;
          gsap.to(indicator, {
            opacity: indicatorOpacity,
            duration: 0.3, // Smooth opacity transition
          });
        });
      }
    });
  };

  initAnimations();

  window.addEventListener("resize", () => {
    initAnimations();
  });
});
