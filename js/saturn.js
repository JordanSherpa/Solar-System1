/* ==========================================================
   saturn.js - Saturn feature: ring-tilt animation (Start/Stop)
   Saturn's 26.7° tilt means that over one 29.4-year orbit we see
   the rings from above, edge-on, from below, edge-on again.
   The ring is drawn as two half-ellipses: the back half goes
   behind the planet and the front half goes in front of it.
   ========================================================== */

const ORBIT_YEARS = 29.4;
const MAX_TILT = 26.7;          // degrees
const CX = 200;                 // center of Saturn in the SVG
const CY = 120;
const RING_WIDTH = 150;         // horizontal radius of the ring

const ringBack = document.getElementById("ringBack");
const ringFront = document.getElementById("ringFront");
const startBtn = document.getElementById("startRings");
const stopBtn = document.getElementById("stopRings");
const ringStatus = document.getElementById("ringStatus");

let year = 0;
let running = false;
let lastTime = null;

// Builds an SVG path for the top or bottom half of an ellipse
function halfEllipse(rx, ry, topHalf) {
    // sweep flag 1 goes over the top, 0 goes under the bottom
    const sweep = topHalf ? 1 : 0;
    return "M " + (CX - rx) + " " + CY +
           " A " + rx + " " + ry + " 0 0 " + sweep + " " + (CX + rx) + " " + CY;
}

// Redraws the rings for the current year
function drawRings() {
    // tilt goes from +26.7° to -26.7° and back once per orbit
    const tilt = MAX_TILT * Math.cos((year / ORBIT_YEARS) * 2 * Math.PI);
    const tiltRadians = tilt * Math.PI / 180;
    // how "open" the ellipse looks (never exactly 0 so it still draws)
    const ry = Math.max(Math.abs(Math.sin(tiltRadians)) * RING_WIDTH, 0.5);
    const seenFromAbove = tilt >= 0;

    // seen from above, the bottom half of the ring is closest to us
    ringFront.setAttribute("d", halfEllipse(RING_WIDTH, ry, !seenFromAbove));
    ringBack.setAttribute("d", halfEllipse(RING_WIDTH, ry, seenFromAbove));

    let description;
    if (Math.abs(tilt) < 3) {
        description = "rings edge-on and almost invisible!";
    } else if (seenFromAbove) {
        description = "seeing the top of the rings";
    } else {
        description = "seeing the bottom of the rings";
    }
    ringStatus.textContent = "Year " + year.toFixed(1) + " of " + ORBIT_YEARS + ": " + description;
}

function animate(time) {
    if (!running) {
        return;
    }
    if (lastTime !== null) {
        // 1 real second = 3 Saturn-orbit years of simulated time
        year += ((time - lastTime) / 1000) * 3;
        if (year >= ORBIT_YEARS) {
            year -= ORBIT_YEARS;     // loop back to the start of the orbit
        }
        drawRings();
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

// draw the rings once when the page loads
drawRings();
