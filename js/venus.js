/* ==========================================================
   venus.js - Venus feature: fun-facts pop-up (modal)
   Opens a pop-up window with a random fact. "Another Fact"
   shows a new one. Close with the X, the Esc key, or by
   clicking outside the box.
   ========================================================== */

const funFacts = [
    "A day on Venus (243 Earth days) is longer than its year (225 Earth days).",
    "Because Venus spins backwards, the Sun rises in the west and sets in the east.",
    "The air pressure on Venus's surface is about 92 times Earth's, like being 900 meters under the ocean.",
    "Venus is hotter than Mercury even though Mercury is closer to the Sun, thanks to a runaway greenhouse effect.",
    "Venus is sometimes called the \"Morning Star\" or \"Evening Star\" because it shines so brightly near sunrise and sunset.",
    "Venus's clouds are made of sulfuric acid and race around the planet in about 4 Earth days.",
    "Almost every feature on Venus is named after a real or mythological woman.",
    "Venus comes closer to Earth than any other planet does."
];

const openBtn = document.getElementById("openFacts");
const modal = document.getElementById("factModal");
const closeBtn = document.getElementById("closeFacts");
const nextBtn = document.getElementById("nextFact");
const factText = document.getElementById("factText");
const factCount = document.getElementById("factCount");

let currentIndex = -1;

// Shows a random fact that is different from the one on screen
function showRandomFact() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * funFacts.length);
    } while (newIndex === currentIndex);

    currentIndex = newIndex;
    factText.textContent = funFacts[currentIndex];
    factCount.textContent = "Fact " + (currentIndex + 1) + " of " + funFacts.length;
}

function openModal() {
    showRandomFact();
    modal.hidden = false;
    nextBtn.focus();                  // move keyboard focus into the pop-up
}

function closeModal() {
    modal.hidden = true;
    openBtn.focus();                  // return focus to the button that opened it
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
nextBtn.addEventListener("click", showRandomFact);

// clicking the dark area outside the box closes it
modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

// the Escape key closes it too
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) {
        closeModal();
    }
});
