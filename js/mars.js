/* ==========================================================
   mars.js - Mars feature: "What would you weigh on Mars?"
   Mars's gravity is about 38% of Earth's, so your weight on
   Mars = your Earth weight x 0.38.
   ========================================================== */

const MARS_GRAVITY = 0.38;

const form = document.getElementById("weightForm");
const weightInput = document.getElementById("earthWeight");
const unitSelect = document.getElementById("weightUnit");
const result = document.getElementById("weightResult");

form.addEventListener("submit", function (event) {
    event.preventDefault();          // stop the form from reloading the page

    const earthWeight = parseFloat(weightInput.value);
    const unit = unitSelect.value;

    // check that the input is a real, positive number
    if (isNaN(earthWeight) || earthWeight <= 0) {
        result.textContent = "Please enter a weight greater than 0.";
        return;
    }

    const marsWeight = earthWeight * MARS_GRAVITY;
    const difference = earthWeight - marsWeight;

    result.innerHTML =
        "On Mars you would weigh <strong>" + marsWeight.toFixed(1) + " " + unit + "</strong>. " +
        "That's " + difference.toFixed(1) + " " + unit + " lighter, and you could jump about " +
        "2.6 times higher!";
});
