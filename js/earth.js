/* ==========================================================
   earth.js - Earth feature: day/night toggle
   Clicking the button switches the whole page between day and
   night colors (by adding/removing the "night" class) and swaps
   the Earth picture for a night view with city lights.
   ========================================================== */

const body = document.body;
const toggleBtn = document.getElementById("dayNightBtn");
const statusText = document.getElementById("dayNightText");
const startMode = document.getElementById("startMode");
const earthImg = document.getElementById("earth-img");
const earthCaption = earthImg.nextElementSibling;   // the <figcaption>

// The two versions of the picture and its text
const views = {
    day: {
        src: "../images/earth-day.svg",
        alt: "Earth from space during the day with blue oceans, green continents and white clouds",
        caption: "Earth in daylight.",
        text: "It is daytime: the Sun lights up the oceans and clouds.",
        button: "Switch to Night"
    },
    night: {
        src: "../images/earth-night.svg",
        alt: "Earth at night with the yellow lights of cities glowing across the dark continents",
        caption: "Earth at night: city lights shine from space.",
        text: "It is nighttime: you can see the lights of cities glowing from space.",
        button: "Switch to Day"
    }
};

// Applies day or night to the page
function setMode(mode) {
    const view = views[mode];
    const isNight = mode === "night";

    body.classList.toggle("night", isNight);
    toggleBtn.textContent = view.button;
    toggleBtn.setAttribute("aria-pressed", String(isNight));
    statusText.textContent = view.text;

    // fade the picture out, swap it, then fade back in
    earthImg.style.opacity = 0;
    setTimeout(function () {
        earthImg.src = view.src;
        earthImg.alt = view.alt;
        earthCaption.textContent = view.caption;
        earthImg.style.opacity = 1;
    }, 400);
}

toggleBtn.addEventListener("click", function () {
    const nextMode = body.classList.contains("night") ? "day" : "night";
    setMode(nextMode);
});

// Start in night mode if it is dark where the visitor is (before 6am or after 7pm)
const hour = new Date().getHours();
const initialMode = (hour < 6 || hour >= 19) ? "night" : "day";
startMode.textContent = initialMode;
if (initialMode === "night") {
    setMode("night");
}
