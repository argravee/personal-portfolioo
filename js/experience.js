// experience.js

import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll("[data-experience-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-experience-panel]"));
  const tabList = document.querySelector(".experience-tabs");

  if (!tabs.length || !panels.length || !tabList) return;

  const syncActiveMarker = (tab) => {
    tabList.style.setProperty("--active-tab-offset", `${tab.offsetTop}px`);
    tabList.style.setProperty("--active-tab-size", `${tab.offsetHeight}px`);
    tabList.style.setProperty("--active-tab-left", `${tab.offsetLeft}px`);
    tabList.style.setProperty("--active-tab-width", `${tab.offsetWidth}px`);
  };

  const activateExperience = (id, index) => {
    tabList.style.setProperty("--active-tab-index", index);

    tabs.forEach((tab) => {
      const isActive = tab.dataset.experienceTab === id;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));

      if (isActive) {
        syncActiveMarker(tab);
        tab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.experiencePanel === id;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;

      if (isActive) {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }
        );
      }
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateExperience(tab.dataset.experienceTab, index);
    });
  });

  window.addEventListener("resize", () => {
    const activeTab = tabs.find((tab) => tab.classList.contains("active"));
    if (activeTab) syncActiveMarker(activeTab);
  });

  activateExperience(tabs.findIndex((tab) => tab.classList.contains("active")) >= 0
    ? tabs.find((tab) => tab.classList.contains("active")).dataset.experienceTab
    : tabs[0].dataset.experienceTab,
    Math.max(0, tabs.findIndex((tab) => tab.classList.contains("active")))
  );
});
