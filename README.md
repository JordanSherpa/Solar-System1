# Solar System Explorer

CSCI 39548 – Project 1. A 10-page website about the solar system built with **only HTML, CSS and JavaScript** (no frameworks or libraries).

**Open `index.html` in a browser to view the site.**

## Pages and JavaScript features

| Page | Theme | JavaScript feature |
|------|-------|--------------------|
| Home (`index.html`) | Deep space, nebula glow, twinkling stars | Orbit animation with Start/Stop + speed slider |
| Sun | Fiery orange/red, glowing Impact title | Light-travel-time calculator |
| Moon | Silver/gray, monospace "mission log" font | Moon phase slider (drawn on a canvas) |
| Earth | Ocean blue + forest green | Day/night toggle (changes page colors + image) |
| Mercury | Metallic gray with solar heat | Day vs. night temperature switch (thermometer) |
| Venus | Hazy sulfur yellow, elegant serif | Fun-facts pop-up (modal) |
| Mars | Rusty red desert | "What would you weigh on Mars?" calculator |
| Jupiter | Striped cloud-band background | Galilean moons tabs (show/hide) |
| Saturn | Gold and cream, Didot font | Ring-tilt animation with Start/Stop |
| Uranus | Icy cyan, tilted title | Sideways-tilt demo + "Read More" sections |

## Folder structure

```
index.html          homepage
pages/              the 9 planet / Sun / Moon pages
css/base.css        shared layout: nav bar, header, fact cards, buttons
css/<page>.css      each page's theme (colors, fonts, backgrounds)
js/<page>.js        each page's interactive feature
images/             original SVG illustrations (2+ per page)
```

## How it works

- **Navigation:** every page has the same `<nav>` list with links to all 10 pages. The homepage links into `pages/`, and the planet pages link back with `../index.html`. The current page's link has `aria-current="page"`, which `base.css` highlights.
- **Styling:** `base.css` uses CSS variables (`--bg`, `--accent`, `--heading-font`, …). Each theme file changes those variables, so every page shares one layout but gets its own look.
- **JavaScript:** each page loads one script that finds elements with `getElementById`, listens for events with `addEventListener`, and updates the page (text, classes, styles, or a canvas/SVG drawing).

All images are original SVG drawings made for this project.
