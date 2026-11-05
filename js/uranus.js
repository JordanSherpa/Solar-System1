/* ==========================================================
   uranus.js - Uranus features:
   1. Tilt demo: rotates a CSS planet between Earth's tilt
      and Uranus's tilt.
   2. "Read More" buttons that show/hide extra text.
   ========================================================== */

// ---------- 1. Tilt demo ----------
const tiltPlanet = document.getElementById("tiltPlanet");
const earthTiltBtn = document.getElementById("earthTiltBtn");
const uranusTiltBtn = document.getElementById("uranusTiltBtn");
const tiltText = document.getElementById("tiltText");

function setTilt(degrees, message, activeBtn, otherBtn) {
    // the CSS transition in uranus.css animates this rotation
    tiltPlanet.style.transform = "rotate(" + degrees + "deg)";
    tiltText.textContent = "Tilt: " + degrees + "°. " + message;
    activeBtn.classList.remove("secondary");
    otherBtn.classList.add("secondary");
}

earthTiltBtn.addEventListener("click", function () {
    setTilt(23.4, "This is how Earth leans: mostly upright, like a spinning top.", earthTiltBtn, uranusTiltBtn);
});

uranusTiltBtn.addEventListener("click", function () {
    setTilt(97.8, "Uranus is lying on its side.", uranusTiltBtn, earthTiltBtn);
});

// ---------- 2. Read More sections ----------
const toggleButtons = document.querySelectorAll(".read-more .toggle");

toggleButtons.forEach(function (button) {
    // remember the original label, e.g. "Read More: discovered by telescope"
    const openLabel = button.textContent;

    button.addEventListener("click", function () {
        const section = document.getElementById(button.getAttribute("aria-controls"));
        const isOpen = button.getAttribute("aria-expanded") === "true";

        section.hidden = isOpen;                         // hide if open, show if closed
        button.setAttribute("aria-expanded", String(!isOpen));
        button.textContent = isOpen ? openLabel : "Show Less";
    });
});
