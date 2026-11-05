/* ==========================================================
   sun.js - Sun feature: light-travel-time calculator
   Light moves at about 299,792 km per second. Each <option>
   stores the planet's distance from the Sun in AU
   (1 AU = the Earth-Sun distance = 149,597,871 km).
   ========================================================== */

const SPEED_OF_LIGHT = 299792;     // km per second
const KM_PER_AU = 149597871;       // km in one astronomical unit
const FARTHEST_AU = 30.07;         // Neptune, used to scale the beam

const planetSelect = document.getElementById("planetSelect");
const calcButton = document.getElementById("calcLight");
const lightResult = document.getElementById("lightResult");
const beam = document.getElementById("beam");

// Turns a number of seconds into "X hours, Y minutes and Z seconds"
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);

    const parts = [];
    if (hours > 0) {
        parts.push(hours + (hours === 1 ? " hour" : " hours"));
    }
    if (minutes > 0) {
        parts.push(minutes + (minutes === 1 ? " minute" : " minutes"));
    }
    parts.push(seconds + (seconds === 1 ? " second" : " seconds"));
    return parts.join(", ");
}

function calculateLightTime() {
    const au = parseFloat(planetSelect.value);
    const planetName = planetSelect.options[planetSelect.selectedIndex].text;

    const distanceKm = au * KM_PER_AU;
    const travelSeconds = distanceKm / SPEED_OF_LIGHT;

    lightResult.textContent =
        "Sunlight takes " + formatTime(travelSeconds) + " to reach " + planetName +
        " (" + Math.round(distanceKm / 1000000).toLocaleString() + " million km away).";

    // restart the beam animation from zero, then grow it
    beam.style.transition = "none";
    beam.style.width = "0";
    void beam.offsetWidth;            // forces the browser to apply width 0 first
    beam.style.transition = "";
    beam.style.width = Math.max((au / FARTHEST_AU) * 100, 2) + "%";
}

calcButton.addEventListener("click", calculateLightTime);
planetSelect.addEventListener("change", calculateLightTime);

// show Earth's answer when the page loads
calculateLightTime();
