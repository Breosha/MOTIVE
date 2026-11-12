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

const mapLayerButtons = document.querySelectorAll("[data-map-layer]");

mapLayerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const layer = document.getElementById(`layer-${button.dataset.mapLayer}`);
    const isVisible = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isVisible));
    button.classList.toggle("is-on", !isVisible);
    layer.hidden = isVisible;
  });
});

const assessmentAreas = {
  midtown: {
    id: "A",
    title: "Midtown connector",
    description: "A sample sidewalk-continuity signal between neighborhood destinations and a transit corridor.",
    stops: "2 example stops",
    destinations: "3 destinations",
    action: "Field-check sidewalk gaps and crossing conditions.",
  },
  downtown: {
    id: "B",
    title: "Downtown stop access",
    description: "A sample access signal around transit stops and civic destinations in the downtown area.",
    stops: "4 example stops",
    destinations: "4 destinations",
    action: "Review crossing comfort and accessible stop approaches.",
  },
  southside: {
    id: "C",
    title: "Southside campus link",
    description: "A sample walk-shed signal connecting campus destinations with nearby transit service.",
    stops: "3 example stops",
    destinations: "3 destinations",
    action: "Check pedestrian connections and first/last-mile routes.",
  },
};

const areaButtons = document.querySelectorAll("[data-zone]");
const selectedAreaFields = {
  id: document.querySelector("[data-selected-id]"),
  title: document.querySelector("[data-selected-title]"),
  description: document.querySelector("[data-selected-description]"),
  stops: document.querySelector("[data-selected-stops]"),
  destinations: document.querySelector("[data-selected-pois]"),
  action: document.querySelector("[data-selected-action]"),
};

function selectAssessmentArea(zone) {
  const area = assessmentAreas[zone];
  if (!area) return;

  document.querySelectorAll(".assessment-zone, .priority-item").forEach((item) => {
    const isSelected = item.dataset.zone === zone;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-pressed", String(isSelected));
  });

  selectedAreaFields.id.textContent = area.id;
  selectedAreaFields.title.textContent = area.title;
  selectedAreaFields.description.textContent = area.description;
  selectedAreaFields.stops.textContent = area.stops;
  selectedAreaFields.destinations.textContent = area.destinations;
  selectedAreaFields.action.textContent = area.action;
}

areaButtons.forEach((button) => {
  button.addEventListener("click", () => selectAssessmentArea(button.dataset.zone));
});

document.querySelectorAll(".assessment-zone").forEach((marker) => {
  marker.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectAssessmentArea(marker.dataset.zone);
    }
  });
});
