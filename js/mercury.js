/* ==========================================================
   mercury.js - Mercury feature: day vs. night temperature switch
   Moves the thermometer, converts °C to °F, and changes the
   page colors between scorching day and frozen night.
   ========================================================== */

const dayBtn = document.getElementById("dayBtn");
const nightBtn = document.getElementById("nightBtn");
const thermoFill = document.getElementById("thermoFill");
const tempReadout = document.getElementById("tempReadout");
const tempF = document.getElementById("tempF");
const tempText = document.getElementById("tempText");

// Data for each side of the planet
const sides = {
    day: {
        celsius: 430,
        height: "95%",
        color: "linear-gradient(0deg, #ff3b00, #ffb000)",
        text: "Hot enough to melt lead. With almost no air, nothing blocks the Sun's heat."
    },
    night: {
        celsius: -180,
        height: "8%",
        color: "linear-gradient(0deg, #3a7bd5, #b8e1ff)",
        text: "Colder than anywhere on Earth. With no atmosphere to hold heat, it all escapes into space."
    }
};

// Converts Celsius to Fahrenheit
function toFahrenheit(c) {
    return Math.round(c * 9 / 5 + 32);
}

// Counts the number up or down smoothly so the change is easy to see
function animateNumber(from, to) {
    const duration = 1000;            // milliseconds
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.round(from + (to - from) * progress);
        tempReadout.textContent = value + " °C";
        tempF.textContent = toFahrenheit(value) + " °F";
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

let currentSide = "day";

function showSide(side) {
    if (side === currentSide) {
        return;                       // already showing this side
    }
    const data = sides[side];
    animateNumber(sides[currentSide].celsius, data.celsius);

    thermoFill.style.height = data.height;
    thermoFill.style.background = data.color;
    tempText.textContent = data.text;

    // switch page colors and which button looks "selected"
    document.body.classList.toggle("night-side", side === "night");
    dayBtn.classList.toggle("secondary", side !== "day");
    nightBtn.classList.toggle("secondary", side !== "night");

    currentSide = side;
}

dayBtn.addEventListener("click", function () {
    showSide("day");
});

nightBtn.addEventListener("click", function () {
    showSide("night");
});

// set the starting description text
tempText.textContent = sides.day.text;
