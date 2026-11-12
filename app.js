const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  }
});

const filters = document.querySelectorAll(".map-filter");
const transitLayer = document.querySelector(".transit-layer");
const freightLayer = document.querySelector(".freight-layer");
const mapCallout = document.querySelector(".map-callout");
const footerInsight = document.querySelector(".map-footer > span:first-child");

const layerSummaries = {
  all: { message: "3 opportunities detected", callout: "3 overlapping patterns" },
  transit: { message: "2 transit patterns detected", callout: "2 transit opportunities" },
  freight: { message: "1 freight pattern detected", callout: "1 freight opportunity" },
};

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selectedLayer = filter.dataset.layer;
    filters.forEach((item) => {
      const isSelected = item === filter;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    transitLayer.classList.toggle("is-muted", selectedLayer === "freight");
    freightLayer.classList.toggle("is-muted", selectedLayer === "transit");
    footerInsight.lastChild.textContent = ` ${layerSummaries[selectedLayer].message}`;
    mapCallout.querySelector("small").textContent = layerSummaries[selectedLayer].callout;
  });
});

document.querySelector(".refresh-button").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const icon = button.querySelector("span");
  icon.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 450, easing: "ease-out" },
  );
  button.lastChild.textContent = " Updated";
  window.setTimeout(() => {
    button.lastChild.textContent = " Refresh view ";
  }, 1400);
});
