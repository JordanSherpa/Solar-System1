/* ==========================================================
   moon.js - Moon feature: phase slider
   Draws the Moon on a <canvas> showing how much of it is lit
   on any day of its 29.5-day cycle.
   ========================================================== */

const CYCLE_DAYS = 29.53;   // length of one full cycle of phases

const canvas = document.getElementById("phaseCanvas");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("phaseSlider");
const dayLabel = document.getElementById("phaseDay");
const phaseName = document.getElementById("phaseName");
const phaseLit = document.getElementById("phaseLit");

const cx = canvas.width / 2;    // center of the canvas
const cy = canvas.height / 2;
const r = canvas.width / 2 - 12; // Moon radius

const LIT = "#f1f1ec";
const DARK = "#26272d";

// Picks the phase name for a given day
function getPhaseName(day) {
    if (day < 1.5 || day >= 28.5) return "New Moon";
    if (day < 6.5) return "Waxing Crescent";
    if (day < 8.5) return "First Quarter";
    if (day < 14) return "Waxing Gibbous";
    if (day < 16) return "Full Moon";
    if (day < 21.5) return "Waning Gibbous";
    if (day < 23.5) return "Last Quarter";
    return "Waning Crescent";
}

// Draws the Moon for a given day of the cycle
function drawMoon(day) {
    const angle = (day / CYCLE_DAYS) * 2 * Math.PI;  // 0 to 2 PI over a cycle
    const litFraction = (1 - Math.cos(angle)) / 2;   // 0 = new, 1 = full
    const waxing = day < CYCLE_DAYS / 2;             // lit on the right while waxing
    // width of the curved shadow line (terminator)
    const terminatorWidth = r * Math.abs(Math.cos(angle));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. the whole Moon in shadow
    ctx.fillStyle = DARK;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fill();

    // 2. the lit half (right side when waxing, left side when waning)
    ctx.fillStyle = LIT;
    ctx.beginPath();
    if (waxing) {
        ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2);
    } else {
        ctx.arc(cx, cy, r, Math.PI / 2, -Math.PI / 2);
    }
    ctx.fill();

    // 3. an ellipse that either covers part of the lit half (crescent)
    //    or adds light to the dark half (gibbous)
    ctx.fillStyle = litFraction < 0.5 ? DARK : LIT;
    ctx.beginPath();
    ctx.ellipse(cx, cy, terminatorWidth, r, 0, 0, 2 * Math.PI);
    ctx.fill();

    // 4. a few faint craters on top for texture
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    [[-30, -35, 18], [35, 20, 22], [-10, 45, 12], [50, -40, 10]].forEach(function (c) {
        ctx.beginPath();
        ctx.arc(cx + c[0], cy + c[1], c[2], 0, 2 * Math.PI);
        ctx.fill();
    });

    // update the text below the slider
    dayLabel.textContent = day;
    phaseName.textContent = getPhaseName(day);
    phaseLit.textContent = Math.round(litFraction * 100) + "% of the visible side is lit";
}

// redraw every time the slider moves
slider.addEventListener("input", function () {
    drawMoon(parseFloat(slider.value));
});

// first drawing when the page loads
drawMoon(parseFloat(slider.value));
