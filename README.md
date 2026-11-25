# 20261121-hackathon-gallery

An animated Classic Neon CRT Arcade landing page showcasing the **6 playable browser games** created during the **Europaskolan Hackathon on 21 Nov 2026**.

**Published Gallery (GitHub Pages):** `https://europa-hackathons.github.io/20261121-hackathon-gallery/`

---

## Featured Games

| # | Game | Grid Real Estate | Play Live | Source Repository |
| :-: | :--- | :-: | :--- | :--- |
| 1 | **Rocket Punch!** | **25%** (Top Left) | https://europa-hackathons.github.io/harleys-team/ | https://github.com/europa-hackathons/harleys-team |
| 2 | **Space Run** | **25%** (Top Right) | https://space-run-game.vercel.app | https://github.com/europa-hackathons/space-run |
| 3 | **Penalty Shootout** | **12.5%** (Bottom 1) | https://europa-hackathons.github.io/penalty-shootout/ | https://github.com/europa-hackathons/penalty-shootout |
| 4 | **BDOU - Disco Sushi Train** | **12.5%** (Bottom 2) | https://europa-hackathons.github.io/bdou/ | https://github.com/europa-hackathons/bdou |
| 5 | **Fruity Snowland** | **12.5%** (Bottom 3) | https://europa-hackathons.github.io/mila-elvira-fruity-snowland/ | https://github.com/europa-hackathons/mila-elvira-fruity-snowland |
| 6 | **Save The Woods** | **12.5%** (Bottom 4) | https://europa-hackathons.github.io/save-the-woods/ | https://github.com/europa-hackathons/save-the-woods |

---

## Reproducible Specification

This gallery is intentionally built as a **zero-build static web app** (plain HTML, CSS, ES modules, inline arcade SVG scenes, and procedural Web Audio synthesis) so it can be forked, reproduced, or adapted for future hackathons with zero build tools or external asset dependencies.

### 1. Screen Real Estate & Responsive Layout
- **Viewport Shell (`.arcade-shell`)**: Uses `height: 100dvh` with a slim neon marquee header (`clamp(48px, 6.2vh, 58px)`) and a full-bleed gallery grid (`flex: 1; min-height: 0`).
- **Desktop / Landscape (`>= 900px` wide and `>= 540px` tall)**:
  - `display: grid` with `grid-template-columns: repeat(4, minmax(0, 1fr))` and `grid-template-rows: minmax(0, 1fr) minmax(0, 1fr)`.
  - **Games 1 & 2 (`.tier-large`)**: `grid-column: span 2; grid-row: 1;` → each tile occupies **50% width × 50% height = 25% of the grid area** (50% combined).
  - **Games 3–6 (`.tier-standard`)**: `grid-column: span 1; grid-row: 2;` → each tile occupies **25% width × 50% height = 12.5% of the grid area** (50% combined).
- **Hierarchy without badges**: Games 1 & 2 are differentiated purely by their larger 25% cabinet footprint — no rank, trophy, or featured badges are rendered.
- **Tablet (`600px–899px` or short screens `< 540px` tall)**: Switches to a scrollable 2-column grid where Games 1 & 2 sit in a taller top row (`clamp(270px, 42vh, 360px)`) and Games 3–6 form a 2×2 block (`clamp(195px, 24vh, 250px)`), maintaining the ~2:1 visual weight.
- **Mobile (`< 600px`)**: Games 1 & 2 span full width on top, followed by Games 3–6 in a 2×2 grid (falling back to a single column below `375px`).

### 2. Visual Aesthetic (Classic Neon CRT Arcade)
- **Palette**: Dark cabinet hall backdrop (`#060714`), subtle radial neon glow, per-game CSS custom properties (`--accent`, `--accent-2`, `--accent-glow`, `--bg-start`, `--bg-end`), glowing reticle corner brackets, and a subtle fixed CRT scanline & vignette overlay (`.crt-overlay`, `pointer-events: none`).
- **Typography**: `Press Start 2P` for marquee headings, game titles, and `▶ PLAY` pills; `Chakra Petch` for crisp 1-line taglines and hints, with monospace/system fallbacks so offline viewing never breaks.
- **Per-Tile Content**:
  1. Full-bleed animated arcade SVG scene tailored to the actual game.
  2. Game title (primary stretched link covering the cabinet tile).
  3. Concise 1-line game tagline.
  4. Hover/active `▶ PLAY` CTA pill.
  5. Subtle GitHub repository icon link (isolated in z-order and click propagation).

### 3. Bespoke Animated Arcade SVG Scenes (`js/svg-scenes.js`)
Each scene is hand-crafted inline SVG inspired directly by the real hackathon game's mechanics, characters, and colors:
- **Coordinate Safety Contract**:
  - Large tiles use `viewBox="0 0 640 360"` (hero safe zone `x: 70..570`, `y: 24..248`).
  - Standard tiles use `viewBox="0 0 360 360"` (hero safe zone `x: 26..334`, `y: 20..248`).
  - Both use `preserveAspectRatio="xMidYMid slice"` so artwork fills any aspect ratio seamlessly while keeping the bottom HUD area uncluttered.
  - Every animated element wraps its placement `transform="translate(x, y)"` on an outer `<g>` and applies CSS keyframe transforms on a dedicated inner `<g class="...-anim">` (`transform-box: fill-box; transform-origin: center`) to prevent CSS transforms from overriding SVG placement coordinates.
- **Six Scenes**:
  1. **Rocket Punch!**: Neon boxing arena, HP/SUPER bars, teal vs. orange boxers, detached flame-jet rocket glove blasting across the ring into a `POW!` impact starburst and Zeus sky-bolt flash.
  2. **Space Run**: Perspective laser horizon grid, starfield warp lines, tumbling asteroids, swaying alien saucer/fighter fleet with rotating target reticle, banking player starfighter firing twin plasma bolts.
  3. **Penalty Shootout**: Night stadium floodlights, mesh goal net, shrinking green/white timing ring in the top corner, diving visored boss keeper, and curving soccer ball strike with goal burst.
  4. **BDOU - Disco Sushi Train**: Hanging faceted disco ball with sweeping neon beams, animated chevron conveyor belt, and bouncing kawaii nigiri, maki, and tamago sushi with musical notes.
  5. **Fruity Snowland**: Moonlit snowy wizard castle, drifting snowflakes, cascading strawberries/oranges/cherries and a cheeky yellow snowball, with a winter wizard buddy gliding to catch fruit.
  6. **Save The Woods**: Five layered pine trees under fireflies, a leaping hero wolf unleashing a green forest-shield pulse against a hovering data-center chopper robot with blinking server LEDs and a spinning saw rotor.
- **Overdrive State**: Hovering, touch-selecting, or focusing any tile speeds up its primary SVG keyframes, brightens the scene, flares its neon bezel, and illuminates its corner reticle brackets. Respects `@media (prefers-reduced-motion: reduce)`.

### 4. Procedural Arcade Sound Effects (`js/audio.js`)
All sound effects are synthesized live via the **Web Audio API** (zero external MP3/WAV assets, zero network latency) through a `DynamicsCompressorNode` and master `GainNode`:
- **Autoplay Policy Compliance**: Modern browsers suspend `AudioContext` until the first user gesture.
  - On **touchscreens**, the first tap on any game tile unlocks audio immediately and plays that game's SFX.
  - On **desktop**, any click or keypress unlocks audio; hovering before unlock pulses the header **`⚡ ENABLE SFX`** pill so users know one click activates hover sound. Clicking it plays a classic 2-tone arcade coin ding (`B5 → E6`).
  - Mute state persists in `localStorage` (`europa-arcade-sfx-muted`).
- **Sound Signatures**:
  - `rocket-punch`: Bandpass noise rocket whoosh + sawtooth punch impact drop + C5→G5 power fifth.
  - `space-run`: Staggered dual sawtooth/square plasma laser `PEW-PEW` sweeps + radar ping.
  - `penalty-shootout`: Modulated stadium whistle chirp + low triangle leather-kick thump + goal chime.
  - `bdou`: Bouncy neon disco synth octave arpeggio + sparkle pop.
  - `fruity-snowland`: Crystalline icy glockenspiel bell arpeggio (`E6 → G#6 → B6 → E7`).
  - `save-the-woods`: Heroic 8-bit forest horn fanfare (`G4 → B4 → D5 → G5`) + retro bot zap.
  - `launch`: Upbeat 4-note `GAME START` fanfare (`C5 → E5 → G5 → C6`) on game launch.

### 5. Interaction & Accessibility Contract (`js/app.js`)
- **Desktop (`mouse` / `pen`)**:
  - `pointerenter` triggers the game's SFX and CSS hover overdrive.
  - Clicking anywhere on the tile plays the launch fanfare and opens the game in a new tab (`target="_blank" rel="noopener noreferrer"`).
  - Clicking the GitHub icon opens the repository in a new tab without launching the game.
- **Touchscreen (`touch`)**:
  - **1st tap** on an unselected tile intercepts navigation (`preventDefault()`), marks the tile `.is-active`, unlocks Web Audio, plays its signature arcade SFX, shifts its SVG into overdrive, and reveals **`▶ TAP TO PLAY`**.
  - **2nd tap** on the active tile plays the launch fanfare and opens the game in a new tab.
  - Tapping outside dismisses the active preview.
- **Keyboard**:
  - `Tab` and **Arrow keys** (`←`, `→`, `↑`, `↓`) navigate the 2-top / 4-bottom arcade cabinet layout, playing each tile's SFX on focus; `Enter` launches the focused game; `Escape` clears touch preview.

---

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml       # Official GitHub Actions workflow for GitHub Pages
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
├── index.html              # Semantic page shell, marquee header, favicon, font links
├── styles.css              # Neon CRT theme, 50%/50% grid math, SVG keyframes, breakpoints
├── js/
│   ├── games.js            # Declarative metadata & theme tokens for the 6 games
│   ├── svg-scenes.js       # Bespoke animated arcade SVG scenes for each game
│   ├── audio.js            # Zero-dependency Web Audio retro arcade SFX synthesizer
│   └── app.js              # Tile rendering, hover/touch/keyboard UX, audio unlock state
└── README.md               # This reproducible specification
```

---

## Running Locally

Because the gallery uses native ES modules (`<script type="module">`), serve the directory over HTTP rather than opening via `file://`:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Deploying to GitHub Pages

This repository includes [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which automatically publishes the root static site whenever commits are pushed to `main`.

### One-time Repository Setup
1. Open the repository on GitHub and navigate to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` (or trigger **Deploy Hackathon Gallery to GitHub Pages** manually from the **Actions** tab).

---

## Adapting for Another Hackathon

To reuse this gallery for a different set of 6 games:
1. Update the entries in [`js/games.js`](js/games.js) (`id`, `title`, `tagline`, `playUrl`, `repoUrl`, `tier`, and accent colors).
2. Add or customize matching SVG scenes in [`js/svg-scenes.js`](js/svg-scenes.js) and keyframe animations in [`styles.css`](styles.css).
3. Add or customize per-game Web Audio recipes in [`js/audio.js`](js/audio.js) (`playGameSfx`).
4. Update the header title/date in [`index.html`](index.html).
