/* ==========================================================
   jupiter.js - Jupiter feature: Galilean moon tabs
   Clicking a tab shows its panel and hides the others.
   Arrow keys also move between tabs.
   ========================================================== */

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

// Shows the panel for the chosen tab and hides the rest
function selectTab(selectedTab) {
    tabs.forEach(function (tab) {
        const isSelected = tab === selectedTab;
        tab.classList.toggle("active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach(function (panel) {
        // each tab's aria-controls holds the id of its panel
        panel.hidden = panel.id !== selectedTab.getAttribute("aria-controls");
    });
}

tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
        selectTab(tab);
    });

    // Left/Right arrow keys move to the previous/next tab
    tab.addEventListener("keydown", function (event) {
        let newIndex = null;
        if (event.key === "ArrowRight") {
            newIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
            newIndex = (index - 1 + tabs.length) % tabs.length;
        }
        if (newIndex !== null) {
            selectTab(tabs[newIndex]);
            tabs[newIndex].focus();
        }
    });
});
