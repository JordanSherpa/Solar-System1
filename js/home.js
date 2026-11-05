/* ==========================================================
   home.js - Homepage feature: animated orbits with Start/Stop
   Each planet moves around the Sun at its real relative speed
   (based on how many Earth years one orbit takes).
   ========================================================== */

// Planet data: orbit time in Earth years, size and color.
// Distances from the Sun are spaced out evenly so they fit on screen.
const planets = [
    { name: "Mercury", years: 0.24,  size: 6,  color: "#b5b5b5" },
    { name: "Venus",   years: 0.62,  size: 9,  color: "#e8c27a" },
    { name: "Earth",   years: 1,     size: 10, color: "#3d8bd9" },
    { name: "Mars",    years: 1.88,  size: 8,  color: "#c1440e" },
    { name: "Jupiter", years: 11.86, size: 20, color: "#d9a066" },
    { name: "Saturn",  years: 29.46, size: 17, color: "#e6cf8b" },
    { name: "Uranus",  years: 84.01, size: 13, color: "#9fe3e8" },
    { name: "Neptune", years: 164.8, size: 13, color: "#4466dd" }
];

// Grab the elements we need from the page
const orrery = document.getElementById("orrery");
const startBtn = document.getElementById("startOrbit");
const stopBtn = document.getElementById("stopOrbit");
const speedSlider = document.getElementById("orbitSpeed");
const yearCounter = document.getElementById("yearCounter");

let running = false;     // is the animation playing?
let lastTime = null;     // time of the previous frame
let earthYears = 0;      // how much simulated time has passed

// Build one orbit path and one planet <div> for each planet
planets.forEach(function (planet, i) {
    // orbit radius as a percentage of the box (12% to 48%)
    planet.radius = 12 + i * 5.1;
    // start each planet at a different angle so they are spread out
    planet.angle = i * 0.8;

    const path = document.createElement("div");
    path.className = "orbit-path";
    path.style.width = planet.radius * 2 + "%";
    path.style.height = planet.radius * 2 + "%";
    orrery.appendChild(path);

    const dot = document.createElement("div");
    dot.className = "orbit-planet";
    dot.title = planet.name;
    dot.style.width = planet.size + "px";
    dot.style.height = planet.size + "px";
    dot.style.background = planet.color;
    // Saturn gets a ring using a CSS box-shadow trick
    if (planet.name === "Saturn") {
        dot.style.boxShadow = "0 0 0 3px rgba(230, 207, 139, 0.45)";
    }
    orrery.appendChild(dot);
    planet.element = dot;
});

// Put every planet at its current angle on its circle
function drawPlanets() {
    planets.forEach(function (planet) {
        const x = 50 + planet.radius * Math.cos(planet.angle);
        const y = 50 + planet.radius * Math.sin(planet.angle);
        planet.element.style.left = x + "%";
        planet.element.style.top = y + "%";
    });
}

// Runs about 60 times per second while the animation is on
function animate(time) {
    if (!running) {
        return;
    }
    if (lastTime !== null) {
        const seconds = (time - lastTime) / 1000;
        // the slider sets how many Earth years pass per real second
        const yearsThisFrame = seconds * speedSlider.value * 0.25;
        earthYears += yearsThisFrame;

        planets.forEach(function (planet) {
            // one full circle (2 x PI) every "planet.years" Earth years
            planet.angle += (2 * Math.PI * yearsThisFrame) / planet.years;
        });
        drawPlanets();
        yearCounter.textContent = "Earth years passed: " + earthYears.toFixed(1);
    }
    lastTime = time;
    requestAnimationFrame(animate);
}

startBtn.addEventListener("click", function () {
    running = true;
    lastTime = null;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    requestAnimationFrame(animate);
});

stopBtn.addEventListener("click", function () {
    running = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// draw the starting positions right away
drawPlanets();
