/**
 * Bespoke Arcade-Style Animated SVG Scenes for all 6 Europaskolan Hackathon games.
 *
 * ViewBox conventions:
 *  - Large tiles (Games 1 & 2): 640x360 (safe hero zone x: 70..570, y: 24..248)
 *  - Standard tiles (Games 3–6): 360x360 (safe hero zone x: 26..334, y: 20..248)
 *
 * Positioning groups use SVG `transform="translate(x, y)"` on an outer `<g>`, while
 * CSS keyframe animations target a dedicated inner `<g>` so CSS `transform` never
 * clobbers SVG placement coordinates.
 */

export function getGameSvg(gameId) {
  switch (gameId) {
    case 'rocket-punch':
      return svgRocketPunch();
    case 'space-run':
      return svgSpaceRun();
    case 'penalty-shootout':
      return svgPenaltyShootout();
    case 'bdou':
      return svgDiscoSushi();
    case 'fruity-snowland':
      return svgFruitySnowland();
    case 'save-the-woods':
      return svgSaveTheWoods();
    default:
      return '';
  }
}

/* ============================================================================
 * 1. ROCKET PUNCH! — Detached rocket boxing glove blasting across a neon ring
 * ============================================================================ */
function svgRocketPunch() {
  return `
  <svg class="arcade-svg svg-rocket-punch" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="rp-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0b0e2e"/>
        <stop offset="60%" stop-color="#1d1145"/>
        <stop offset="100%" stop-color="#0d0821"/>
      </linearGradient>
      <linearGradient id="rp-beam-l" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stop-color="#00f5d4" stop-opacity="0.34"/>
        <stop offset="100%" stop-color="#00f5d4" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="rp-beam-r" x1="1" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stop-color="#ff6b1a" stop-opacity="0.34"/>
        <stop offset="100%" stop-color="#ff6b1a" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="rp-floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2c1d63"/>
        <stop offset="100%" stop-color="#120a2f"/>
      </linearGradient>
      <linearGradient id="rp-flame" x1="1" y1="0.5" x2="0" y2="0.5">
        <stop offset="0%" stop-color="#fff8d6"/>
        <stop offset="35%" stop-color="#ffd23f"/>
        <stop offset="75%" stop-color="#ff6b1a"/>
        <stop offset="100%" stop-color="#ff2e63" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="rp-glove" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#5effeb"/>
        <stop offset="55%" stop-color="#00e0c4"/>
        <stop offset="100%" stop-color="#00918a"/>
      </linearGradient>
    </defs>

    <rect width="640" height="360" fill="url(#rp-bg)"/>

    <!-- Sweeping Arena Spotlights -->
    <g class="rp-spotlight-l">
      <polygon points="85,0 135,0 320,300 185,300" fill="url(#rp-beam-l)"/>
    </g>
    <g class="rp-spotlight-r">
      <polygon points="505,0 555,0 455,300 320,300" fill="url(#rp-beam-r)"/>
    </g>

    <!-- Distant Arena Crowd -->
    <g fill="#150d36" opacity="0.88">
      <rect x="0" y="138" width="640" height="44"/>
      <circle cx="38" cy="138" r="14"/><circle cx="72" cy="142" r="12"/><circle cx="106" cy="136" r="15"/>
      <circle cx="144" cy="141" r="13"/><circle cx="182" cy="137" r="15"/><circle cx="220" cy="142" r="12"/>
      <circle cx="258" cy="136" r="14"/><circle cx="298" cy="140" r="13"/><circle cx="338" cy="135" r="15"/>
      <circle cx="378" cy="141" r="13"/><circle cx="416" cy="137" r="15"/><circle cx="456" cy="142" r="12"/>
      <circle cx="496" cy="136" r="14"/><circle cx="534" cy="140" r="13"/><circle cx="574" cy="136" r="15"/>
      <circle cx="610" cy="141" r="13"/>
    </g>

    <!-- Camera Flashes -->
    <g>
      <circle cx="108" cy="128" r="4" fill="#fff4c2" class="twinkle-a"/>
      <circle cx="288" cy="122" r="3.5" fill="#00f5d4" class="twinkle-b"/>
      <circle cx="478" cy="126" r="4.5" fill="#ffd23f" class="twinkle-c"/>
      <circle cx="554" cy="130" r="3" fill="#ff6b1a" class="twinkle-a"/>
    </g>

    <!-- Authentic Rocket Punch HP & SUPER HUD -->
    <g opacity="0.92">
      <rect x="58" y="24" width="188" height="14" rx="4" fill="#0b0820" stroke="#00f5d4" stroke-width="2"/>
      <rect x="61" y="27" width="154" height="8" rx="2" fill="#00f5d4"/>
      <rect x="58" y="43" width="128" height="7" rx="3" fill="#0b0820" stroke="#ffd23f" stroke-width="1.4"/>
      <rect x="60" y="45" width="112" height="3" rx="1.5" fill="#ffd23f" class="rp-super-pulse"/>

      <polygon points="320,18 338,34 320,50 302,34" fill="#ff2e63" stroke="#ffd23f" stroke-width="2"/>
      <text x="320" y="38.5" text-anchor="middle" fill="#fff8d6" font-family="'Press Start 2P', monospace" font-size="10">VS</text>

      <rect x="394" y="24" width="188" height="14" rx="4" fill="#0b0820" stroke="#ff6b1a" stroke-width="2"/>
      <rect x="444" y="27" width="135" height="8" rx="2" fill="#ff6b1a"/>
      <rect x="454" y="43" width="128" height="7" rx="3" fill="#0b0820" stroke="#ffd23f" stroke-width="1.4"/>
      <rect x="478" y="45" width="102" height="3" rx="1.5" fill="#ffd23f"/>
    </g>

    <!-- Ring Mat, Ropes & Corner Posts -->
    <polygon points="36,216 604,216 640,360 0,360" fill="url(#rp-floor)"/>
    <line x1="36" y1="216" x2="604" y2="216" stroke="#7c5cff" stroke-width="3"/>
    <line x1="48" y1="158" x2="592" y2="158" stroke="#ff2e63" stroke-width="3.5" opacity="0.88"/>
    <line x1="44" y1="180" x2="596" y2="180" stroke="#eef6ff" stroke-width="3" opacity="0.72"/>
    <line x1="40" y1="202" x2="600" y2="202" stroke="#00f5d4" stroke-width="3.5" opacity="0.88"/>
    <rect x="38" y="136" width="14" height="86" rx="4" fill="#00f5d4" stroke="#091326" stroke-width="2"/>
    <rect x="588" y="136" width="14" height="86" rx="4" fill="#ff6b1a" stroke="#091326" stroke-width="2"/>

    <!-- P1 TEAL BOXER (Left) -->
    <g transform="translate(116, 118)">
      <ellipse cx="26" cy="118" rx="34" ry="8" fill="#070418" opacity="0.55"/>
      <g class="rp-boxer-left-anim">
        <rect x="8" y="84" width="14" height="28" rx="4" fill="#00b4a2"/>
        <rect x="30" y="84" width="14" height="28" rx="4" fill="#00b4a2"/>
        <rect x="4" y="106" width="22" height="11" rx="4" fill="#00f5d4" stroke="#0b0e2e" stroke-width="2"/>
        <rect x="28" y="106" width="22" height="11" rx="4" fill="#00f5d4" stroke="#0b0e2e" stroke-width="2"/>
        <rect x="4" y="68" width="44" height="22" rx="5" fill="#09243d" stroke="#00f5d4" stroke-width="2.5"/>
        <rect x="4" y="68" width="44" height="6" fill="#ffd23f"/>
        <rect x="6" y="34" width="40" height="36" rx="8" fill="#00e0c4" stroke="#0b0e2e" stroke-width="2.5"/>
        <polygon points="26,41 34,53 26,65 18,53" fill="#083047"/>
        <rect x="10" y="2" width="32" height="30" rx="9" fill="#5effeb" stroke="#0b0e2e" stroke-width="2.5"/>
        <rect x="8" y="9" width="36" height="7" rx="3" fill="#ff2e63"/>
        <polygon points="8,11 -6,7 -2,17" fill="#ff2e63"/>
        <rect x="25" y="18" width="5" height="6" rx="1.5" fill="#0b0e2e"/>
        <rect x="34" y="18" width="5" height="6" rx="1.5" fill="#0b0e2e"/>
        <rect x="-8" y="40" width="22" height="20" rx="8" fill="#00f5d4" stroke="#0b0e2e" stroke-width="2.5"/>
        <rect x="46" y="42" width="24" height="12" rx="4" fill="#00c4b4" stroke="#0b0e2e" stroke-width="2"/>
        <rect x="64" y="39" width="9" height="18" rx="3" fill="#ffd23f" stroke="#0b0e2e" stroke-width="2"/>
        <circle cx="78" cy="48" r="5" fill="#ffd23f" class="rp-cuff-spark"/>
      </g>
    </g>

    <!-- P2 ORANGE BOXER (Right) -->
    <g transform="translate(468, 118)">
      <ellipse cx="26" cy="118" rx="34" ry="8" fill="#070418" opacity="0.55"/>
      <g class="rp-boxer-right-anim">
        <rect x="8" y="84" width="14" height="28" rx="4" fill="#c94b12"/>
        <rect x="30" y="84" width="14" height="28" rx="4" fill="#c94b12"/>
        <rect x="2" y="106" width="22" height="11" rx="4" fill="#ff8c2e" stroke="#0b0e2e" stroke-width="2"/>
        <rect x="28" y="106" width="22" height="11" rx="4" fill="#ff8c2e" stroke="#0b0e2e" stroke-width="2"/>
        <rect x="4" y="68" width="44" height="22" rx="5" fill="#3b1230" stroke="#ff8c2e" stroke-width="2.5"/>
        <rect x="4" y="68" width="44" height="6" fill="#ffd23f"/>
        <rect x="6" y="34" width="40" height="36" rx="8" fill="#ff6b1a" stroke="#0b0e2e" stroke-width="2.5"/>
        <polygon points="26,41 34,53 26,65 18,53" fill="#4f1629"/>
        <rect x="10" y="2" width="32" height="30" rx="9" fill="#ff9f43" stroke="#0b0e2e" stroke-width="2.5"/>
        <rect x="10" y="13" width="24" height="9" rx="3" fill="#180d36" stroke="#ffd23f" stroke-width="1.8"/>
        <rect x="14" y="16" width="5" height="3" fill="#ffd23f"/>
        <rect x="23" y="16" width="5" height="3" fill="#ffd23f"/>
        <rect x="-12" y="34" width="26" height="24" rx="9" fill="#ff8c2e" stroke="#0b0e2e" stroke-width="2.5"/>
        <rect x="36" y="42" width="22" height="20" rx="8" fill="#ff6b1a" stroke="#0b0e2e" stroke-width="2.5"/>
      </g>
    </g>

    <!-- Zeus Lightning Flash -->
    <g class="rp-lightning">
      <polygon points="468,0 442,68 468,68 430,148 486,84 462,84 494,0" fill="#ffd23f" stroke="#fff8d6" stroke-width="2"/>
    </g>

    <!-- FLYING ROCKET GLOVE + EXHAUST -->
    <g class="rp-rocket-flight">
      <line x1="120" y1="152" x2="215" y2="152" stroke="#00f5d4" stroke-width="2.5" stroke-dasharray="14 8" opacity="0.8"/>
      <line x1="138" y1="184" x2="225" y2="184" stroke="#ffd23f" stroke-width="2" stroke-dasharray="10 10" opacity="0.75"/>
      <g class="rp-flame-flicker">
        <polygon points="228,154 118,167 228,180" fill="url(#rp-flame)"/>
        <polygon points="228,159 156,167 228,175" fill="#fff8d6"/>
        <circle cx="152" cy="160" r="4" fill="#ffd23f"/>
        <circle cx="132" cy="173" r="3" fill="#ff6b1a"/>
        <circle cx="174" cy="176" r="3.5" fill="#fff4c2"/>
      </g>
      <rect x="224" y="153" width="18" height="28" rx="4" fill="#ffd23f" stroke="#0b0e2e" stroke-width="2.5"/>
      <rect x="229" y="157" width="8" height="20" rx="2" fill="#ff2e63"/>
      <path d="M240,145 h44 a18,18 0 0 1 18,18 v8 a18,18 0 0 1 -18,18 h-44 z" fill="url(#rp-glove)" stroke="#0b0e2e" stroke-width="3"/>
      <rect x="252" y="136" width="24" height="14" rx="7" fill="#5effeb" stroke="#0b0e2e" stroke-width="2.5"/>
      <path d="M286,154 a7,7 0 0 1 7,7 v8" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
    </g>

    <!-- IMPACT STARBURST -->
    <g transform="translate(446, 166)">
      <g class="rp-impact-burst-anim">
        <polygon points="0,-46 11,-17 42,-28 21,-4 48,14 17,15 24,44 0,24 -24,44 -17,15 -48,14 -21,-4 -42,-28 -11,-17"
                 fill="#ffd23f" stroke="#ff2e63" stroke-width="3"/>
        <polygon points="0,-24 7,-9 24,-15 12,-2 26,8 9,9 13,24 0,13 -13,24 -9,9 -26,8 -12,-2 -24,-15 -7,-9"
                 fill="#fff8d6"/>
      </g>
    </g>
  </svg>`;
}

/* ============================================================================
 * 2. SPACE RUN — Forward-flying arcade starfighter, lasers, asteroids, aliens
 * ============================================================================ */
function svgSpaceRun() {
  return `
  <svg class="arcade-svg svg-space-run" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="sr-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#030512"/>
        <stop offset="58%" stop-color="#0c1038"/>
        <stop offset="100%" stop-color="#180a36"/>
      </linearGradient>
      <radialGradient id="sr-nebula" cx="50%" cy="38%" r="48%">
        <stop offset="0%" stop-color="#43188a" stop-opacity="0.55"/>
        <stop offset="60%" stop-color="#0096c7" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#030512" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="sr-hull" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="55%" stop-color="#8be9fd"/>
        <stop offset="100%" stop-color="#0088cc"/>
      </linearGradient>
      <linearGradient id="sr-laser" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="45%" stop-color="#00f0ff"/>
        <stop offset="100%" stop-color="#ff2e93" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="640" height="360" fill="url(#sr-bg)"/>
    <rect width="640" height="360" fill="url(#sr-nebula)"/>

    <!-- Perspective Synth/Space Horizon Grid -->
    <g stroke="#00d9ff" stroke-opacity="0.24" stroke-width="1.2">
      <line x1="0" y1="205" x2="640" y2="205"/>
      <line x1="0" y1="230" x2="640" y2="230"/>
      <line x1="0" y1="264" x2="640" y2="264"/>
      <line x1="0" y1="312" x2="640" y2="312"/>
      <line x1="320" y1="155" x2="-40" y2="360"/>
      <line x1="320" y1="155" x2="110" y2="360"/>
      <line x1="320" y1="155" x2="230" y2="360"/>
      <line x1="320" y1="155" x2="320" y2="360"/>
      <line x1="320" y1="155" x2="410" y2="360"/>
      <line x1="320" y1="155" x2="530" y2="360"/>
      <line x1="320" y1="155" x2="680" y2="360"/>
    </g>

    <!-- Starfield & Hyperspace Streaks -->
    <g fill="#e6faff">
      <circle cx="72" cy="46" r="1.6" class="twinkle-a"/>
      <circle cx="152" cy="84" r="2" class="twinkle-b"/>
      <circle cx="218" cy="34" r="1.5" class="twinkle-c"/>
      <circle cx="430" cy="40" r="2" class="twinkle-a"/>
      <circle cx="510" cy="76" r="1.8" class="twinkle-b"/>
      <circle cx="574" cy="42" r="2.2" class="twinkle-c"/>
      <circle cx="96" cy="154" r="1.6" class="twinkle-c"/>
      <circle cx="566" cy="146" r="1.8" class="twinkle-a"/>
    </g>
    <g class="sr-warp-lines" stroke="#7ceeff" stroke-linecap="round">
      <line x1="250" y1="115" x2="195" y2="62" stroke-width="1.6" opacity="0.55"/>
      <line x1="395" y1="112" x2="462" y2="52" stroke-width="1.6" opacity="0.55"/>
      <line x1="230" y1="150" x2="132" y2="128" stroke-width="1.4" opacity="0.45"/>
      <line x1="412" y1="150" x2="515" y2="128" stroke-width="1.4" opacity="0.45"/>
    </g>

    <!-- 90-Second Arcade Space HUD -->
    <g opacity="0.88" font-family="'Press Start 2P', monospace" font-size="10">
      <text x="58" y="34" fill="#00f0ff">TIME 90</text>
      <text x="582" y="34" text-anchor="end" fill="#ff2e93">♥ ♥ ♥</text>
    </g>

    <!-- Tumbling Asteroid Left -->
    <g transform="translate(136, 122)">
      <g class="sr-asteroid-1-anim">
        <polygon points="-28,-12 -10,-28 18,-24 30,-4 20,22 -6,28 -26,14"
                 fill="#475569" stroke="#94a3b8" stroke-width="2.5"/>
        <polygon points="-10,-28 18,-24 10,-2 -12,-6" fill="#64748b"/>
        <circle cx="-9" cy="6" r="6" fill="#334155"/>
        <circle cx="11" cy="8" r="4" fill="#334155"/>
        <circle cx="2" cy="-12" r="3.5" fill="#334155"/>
      </g>
    </g>

    <!-- Tumbling Asteroid Right -->
    <g transform="translate(508, 136)">
      <g class="sr-asteroid-2-anim">
        <polygon points="-22,-14 2,-24 24,-10 20,16 -4,24 -24,10"
                 fill="#4b3f5e" stroke="#a78bfa" stroke-width="2"/>
        <polygon points="-22,-14 2,-24 6,-2 -14,2" fill="#6d5c8a"/>
        <circle cx="8" cy="6" r="4.5" fill="#2e2440"/>
        <circle cx="-8" cy="-4" r="3.5" fill="#2e2440"/>
      </g>
    </g>

    <!-- Swaying Alien Fleet -->
    <g class="sr-alien-fleet">
      <!-- Center Alien Saucer -->
      <g transform="translate(320, 82)">
        <g class="sr-target-ring" stroke="#ff2e93" stroke-width="1.8" fill="none" opacity="0.85">
          <circle cx="0" cy="0" r="34" stroke-dasharray="8 6"/>
          <line x1="-42" y1="0" x2="-28" y2="0"/><line x1="28" y1="0" x2="42" y2="0"/>
          <line x1="0" y1="-42" x2="0" y2="-28"/><line x1="0" y1="28" x2="0" y2="42"/>
        </g>
        <ellipse cx="0" cy="-6" rx="18" ry="13" fill="#39ff14" stroke="#0b2e13" stroke-width="2"/>
        <ellipse cx="-5" cy="-10" rx="5" ry="3" fill="#d9ffcf" opacity="0.85"/>
        <ellipse cx="0" cy="3" rx="34" ry="10" fill="#a855f7" stroke="#f0abfc" stroke-width="2"/>
        <circle cx="-20" cy="3" r="3" fill="#ffd23f"/>
        <circle cx="-7" cy="5" r="3" fill="#00f0ff"/>
        <circle cx="7" cy="5" r="3" fill="#ff2e93"/>
        <circle cx="20" cy="3" r="3" fill="#ffd23f"/>
      </g>

      <!-- Wing Alien Fighter Left -->
      <g transform="translate(222, 114)">
        <g class="sr-alien-wing-l-anim">
          <polygon points="0,-14 18,4 12,14 0,6 -12,14 -18,4" fill="#ff2e93" stroke="#ff99cc" stroke-width="2"/>
          <rect x="-5" y="-5" width="10" height="6" rx="2" fill="#39ff14"/>
        </g>
      </g>

      <!-- Wing Alien Fighter Right -->
      <g transform="translate(418, 114)">
        <g class="sr-alien-wing-r-anim">
          <polygon points="0,-14 18,4 12,14 0,6 -12,14 -18,4" fill="#ff2e93" stroke="#ff99cc" stroke-width="2"/>
          <rect x="-5" y="-5" width="10" height="6" rx="2" fill="#39ff14"/>
        </g>
      </g>

      <!-- Laser Hit Spark Burst -->
      <g transform="translate(320, 84)">
        <g class="sr-hit-burst-anim">
          <polygon points="0,-24 6,-6 24,0 6,6 0,24 -6,6 -24,0 -6,-6" fill="#39ff14"/>
          <circle cx="0" cy="0" r="8" fill="#ffffff"/>
        </g>
      </g>
    </g>

    <!-- Twin Firing Laser Bolts -->
    <g>
      <rect class="sr-bolt-1" x="294" y="138" width="5" height="34" rx="2.5" fill="url(#sr-laser)"/>
      <rect class="sr-bolt-2" x="341" y="138" width="5" height="34" rx="2.5" fill="url(#sr-laser)"/>
      <rect class="sr-bolt-3" x="317" y="118" width="6" height="40" rx="3" fill="#00f0ff"/>
    </g>

    <!-- Hero Player Starfighter -->
    <g transform="translate(320, 218)">
      <g class="sr-ship-anim">
        <g class="sr-thrusters">
          <polygon points="-16,24 -10,24 -13,54" fill="#00f0ff"/>
          <polygon points="-14,24 -12,24 -13,42" fill="#ffffff"/>
          <polygon points="10,24 16,24 13,54" fill="#00f0ff"/>
          <polygon points="12,24 14,24 13,42" fill="#ffffff"/>
        </g>
        <polygon points="0,-24 54,18 44,26 14,16 -14,16 -44,26 -54,18" fill="#1e3a8a" stroke="#00f0ff" stroke-width="2.2"/>
        <rect x="-46" y="4" width="6" height="18" rx="2" fill="#ff2e93"/>
        <rect x="40" y="4" width="6" height="18" rx="2" fill="#ff2e93"/>
        <polygon points="0,-38 16,12 12,26 -12,26 -16,12" fill="url(#sr-hull)" stroke="#082f49" stroke-width="2"/>
        <polygon points="0,-16 8,2 0,10 -8,2" fill="#ff2e93" stroke="#ffffff" stroke-width="1.5"/>
      </g>
    </g>
  </svg>`;
}

/* ============================================================================
 * 3. PENALTY SHOOTOUT — Night stadium, goal net, timing ring, diving boss keeper
 * ============================================================================ */
function svgPenaltyShootout() {
  return `
  <svg class="arcade-svg svg-penalty" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#071122"/>
        <stop offset="56%" stop-color="#0f2547"/>
        <stop offset="100%" stop-color="#0b1522"/>
      </linearGradient>
      <linearGradient id="ps-pitch" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#14532d"/>
        <stop offset="50%" stop-color="#166534"/>
        <stop offset="100%" stop-color="#072215"/>
      </linearGradient>
      <linearGradient id="ps-flood" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#fff8d6" stop-opacity="0.34"/>
        <stop offset="100%" stop-color="#00ff87" stop-opacity="0"/>
      </linearGradient>
      <pattern id="ps-net" width="14" height="14" patternUnits="userSpaceOnUse">
        <path d="M0,14 L14,0 M0,0 L14,14" stroke="#94e2ff" stroke-opacity="0.28" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="360" height="182" fill="url(#ps-sky)"/>

    <!-- Stadium Floodlights -->
    <g class="ps-floodlights">
      <polygon points="34,26 66,26 175,210 55,210" fill="url(#ps-flood)"/>
      <polygon points="294,26 326,26 305,210 185,210" fill="url(#ps-flood)"/>
    </g>
    <rect x="28" y="14" width="38" height="14" rx="3" fill="#1e293b" stroke="#ffd166" stroke-width="2"/>
    <circle cx="38" cy="21" r="3" fill="#fff8d6"/><circle cx="47" cy="21" r="3" fill="#fff8d6"/><circle cx="56" cy="21" r="3" fill="#fff8d6"/>
    <rect x="294" y="14" width="38" height="14" rx="3" fill="#1e293b" stroke="#ffd166" stroke-width="2"/>
    <circle cx="304" cy="21" r="3" fill="#fff8d6"/><circle cx="313" cy="21" r="3" fill="#fff8d6"/><circle cx="322" cy="21" r="3" fill="#fff8d6"/>

    <!-- Pitch & Penalty Area -->
    <rect x="0" y="178" width="360" height="182" fill="url(#ps-pitch)"/>
    <polygon points="0,198 360,198 360,224 0,224" fill="#22c55e" opacity="0.14"/>
    <polygon points="0,254 360,254 360,288 0,288" fill="#22c55e" opacity="0.12"/>
    <polygon points="46,180 314,180 356,264 4,264" fill="none" stroke="#d1fae5" stroke-width="2.2" opacity="0.72"/>
    <ellipse cx="180" cy="238" rx="10" ry="3.5" fill="#ffffff" opacity="0.88"/>

    <!-- Goal Frame & Net -->
    <rect x="64" y="66" width="232" height="114" fill="url(#ps-net)"/>
    <path d="M64,180 L64,66 L296,66 L296,180" fill="none" stroke="#f8fafc" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M64,180 L64,66 L296,66 L296,180" fill="none" stroke="#00ff87" stroke-width="1.5" opacity="0.65"/>

    <!-- Timing Ring Target (Top-Left Sweet Spot) -->
    <g transform="translate(108, 102)">
      <circle cx="0" cy="0" r="17" fill="rgba(0, 255, 135, 0.16)" stroke="#00ff87" stroke-width="4.5"/>
      <circle cx="0" cy="0" r="3.5" fill="#ffd166"/>
      <circle class="ps-timing-ring" cx="0" cy="0" r="32" fill="none" stroke="#ffffff" stroke-width="3"/>
    </g>

    <!-- Diving Boss Goalkeeper -->
    <g transform="translate(204, 134)">
      <g class="ps-keeper-anim">
        <ellipse cx="0" cy="14" rx="28" ry="18" fill="#38bdf8" opacity="0.18"/>
        <rect x="-15" y="-12" width="30" height="34" rx="7" fill="#0ea5e9" stroke="#082f49" stroke-width="2.5"/>
        <path d="M-10,-4 L10,-4 L6,12 L-6,12 Z" fill="#0284c7"/>
        <circle cx="0" cy="-24" r="13" fill="#bae6fd" stroke="#082f49" stroke-width="2.5"/>
        <rect x="-10" y="-28" width="20" height="7" rx="3" fill="#0f172a"/>
        <rect x="-7" y="-26" width="14" height="3" rx="1.5" fill="#ff2e63"/>
        <line x1="-14" y1="-4" x2="-36" y2="-16" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
        <circle cx="-39" cy="-18" r="8.5" fill="#ffd166" stroke="#082f49" stroke-width="2"/>
        <line x1="14" y1="-4" x2="36" y2="-12" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
        <circle cx="39" cy="-14" r="8.5" fill="#ffd166" stroke="#082f49" stroke-width="2"/>
        <rect x="-13" y="20" width="10" height="16" rx="4" fill="#0f172a"/>
        <rect x="3" y="20" width="10" height="16" rx="4" fill="#0f172a"/>
      </g>
    </g>

    <!-- Shot Curve Guide -->
    <path class="ps-shot-arc" d="M180,238 Q132,174 108,102" fill="none" stroke="#ffd166" stroke-width="3" stroke-dasharray="7 6" opacity="0.72"/>

    <!-- Goal Net Burst Sparkles -->
    <g transform="translate(108, 102)">
      <g class="ps-goal-burst-anim">
        <polygon points="0,-28 5,-8 25,-12 10,3 22,22 0,11 -22,22 -10,3 -25,-12 -5,-8" fill="#ffd166"/>
      </g>
    </g>

    <!-- Animated Soccer Ball Shot (uses pure CSS translate/scale/rotate from 0,0) -->
    <g class="ps-ball">
      <circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
      <polygon points="0,-7 6,-2 4,5 -4,5 -6,-2" fill="#0f172a"/>
      <line x1="0" y1="-7" x2="0" y2="-14" stroke="#0f172a" stroke-width="2"/>
      <line x1="6" y1="-2" x2="13" y2="-4" stroke="#0f172a" stroke-width="2"/>
      <line x1="-6" y1="-2" x2="-13" y2="-4" stroke="#0f172a" stroke-width="2"/>
      <line x1="4" y1="5" x2="9" y2="11" stroke="#0f172a" stroke-width="2"/>
      <line x1="-4" y1="5" x2="-9" y2="11" stroke="#0f172a" stroke-width="2"/>
    </g>
  </svg>`;
}

/* ============================================================================
 * 4. BDOU - DISCO SUSHI TRAIN — Spinning disco ball & kawaii sushi conveyor
 * ============================================================================ */
function svgDiscoSushi() {
  return `
  <svg class="arcade-svg svg-disco-sushi" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="bd-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#19083a"/>
        <stop offset="55%" stop-color="#35105c"/>
        <stop offset="100%" stop-color="#14072b"/>
      </linearGradient>
      <radialGradient id="bd-ball" cx="38%" cy="34%" r="65%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="45%" stop-color="#c4b5fd"/>
        <stop offset="100%" stop-color="#6d28d9"/>
      </radialGradient>
      <linearGradient id="bd-beam-1" x1="0.5" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff5fb0" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="#ff5fb0" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bd-beam-2" x1="0.5" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2de2e6" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="#2de2e6" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bd-beam-3" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#ffe14d" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#ffe14d" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="360" height="360" fill="url(#bd-bg)"/>

    <!-- Rotating Disco Beams -->
    <g class="bd-beams">
      <polygon points="180,62 12,265 112,265" fill="url(#bd-beam-1)"/>
      <polygon points="180,62 248,265 348,265" fill="url(#bd-beam-2)"/>
      <polygon points="180,62 142,265 218,265" fill="url(#bd-beam-3)"/>
    </g>

    <!-- 4-Point Sparkles & Floating Music Notes -->
    <g>
      <path d="M58,64 Q58,76 70,76 Q58,76 58,88 Q58,76 46,76 Q58,76 58,64Z" fill="#ffe14d" class="twinkle-a"/>
      <path d="M302,52 Q302,62 312,62 Q302,62 302,72 Q302,62 292,62 Q302,62 302,52Z" fill="#2de2e6" class="twinkle-b"/>
      <path d="M78,124 Q78,131 85,131 Q78,131 78,138 Q78,131 71,131 Q78,131 78,124Z" fill="#ff5fb0" class="twinkle-c"/>
      <g transform="translate(278, 114)"><text class="bd-note-1" x="0" y="0" fill="#ffe14d" font-size="22" font-weight="bold">♪</text></g>
      <g transform="translate(86, 98)"><text class="bd-note-2" x="0" y="0" fill="#2de2e6" font-size="20" font-weight="bold">♫</text></g>
    </g>

    <!-- Hanging Faceted Disco Ball -->
    <line x1="180" y1="0" x2="180" y2="30" stroke="#e2e8f0" stroke-width="3"/>
    <g transform="translate(180, 62)">
      <g class="bd-disco-ball-anim">
        <circle cx="0" cy="0" r="32" fill="url(#bd-ball)" stroke="#ffffff" stroke-width="2"/>
        <ellipse cx="0" cy="0" rx="14" ry="32" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.3"/>
        <ellipse cx="0" cy="0" rx="25" ry="32" fill="none" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.2"/>
        <line x1="-31" y1="-12" x2="31" y2="-12" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.3"/>
        <line x1="-32" y1="0" x2="32" y2="0" stroke="#ffffff" stroke-opacity="0.65" stroke-width="1.4"/>
        <line x1="-31" y1="12" x2="31" y2="12" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.3"/>
        <rect x="-12" y="-11" width="9" height="10" fill="#ff5fb0" opacity="0.7" class="twinkle-a"/>
        <rect x="4" y="1" width="10" height="10" fill="#2de2e6" opacity="0.8" class="twinkle-b"/>
        <rect x="-2" y="-22" width="9" height="9" fill="#ffe14d" opacity="0.85" class="twinkle-c"/>
      </g>
    </g>

    <!-- Neon Conveyor Belt -->
    <g transform="translate(0, 198)">
      <rect x="-10" y="0" width="380" height="44" fill="#20114a" stroke="#ff5fb0" stroke-width="3"/>
      <line x1="0" y1="8" x2="360" y2="8" stroke="#2de2e6" stroke-width="2" opacity="0.7"/>
      <line x1="0" y1="36" x2="360" y2="36" stroke="#ffe14d" stroke-width="2" opacity="0.7"/>
      <g class="bd-belt-track" stroke="#ff5fb0" stroke-width="3" fill="none" stroke-linecap="round">
        <polyline points="-40,14 -28,22 -40,30"/><polyline points="0,14 12,22 0,30"/>
        <polyline points="40,14 52,22 40,30"/><polyline points="80,14 92,22 80,30"/>
        <polyline points="120,14 132,22 120,30"/><polyline points="160,14 172,22 160,30"/>
        <polyline points="200,14 212,22 200,30"/><polyline points="240,14 252,22 240,30"/>
        <polyline points="280,14 292,22 280,30"/><polyline points="320,14 332,22 320,30"/>
        <polyline points="360,14 372,22 360,30"/><polyline points="400,14 412,22 400,30"/>
      </g>
    </g>

    <!-- Dancing Kawaii Sushi Characters -->
    <!-- 1. Kawaii Salmon Nigiri -->
    <g transform="translate(76, 174)">
      <g class="bd-sushi-1-anim">
        <ellipse cx="0" cy="24" rx="32" ry="6" fill="#2de2e6" stroke="#ffffff" stroke-width="1.5"/>
        <rect x="-24" y="4" width="48" height="20" rx="10" fill="#fffdf8" stroke="#2b1b4a" stroke-width="2.5"/>
        <path d="M-28,6 Q-26,-16 0,-16 Q26,-16 28,6 Q14,12 0,10 Q-14,12 -28,6 Z" fill="#ff7b54" stroke="#2b1b4a" stroke-width="2.5"/>
        <path d="M-16,-11 L-8,6 M0,-14 L6,7 M14,-11 L18,5" stroke="#ffd6ba" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="-8" cy="14" r="3" fill="#1a0f2e"/><circle cx="-9" cy="13" r="1" fill="#ffffff"/>
        <circle cx="8" cy="14" r="3" fill="#1a0f2e"/><circle cx="7" cy="13" r="1" fill="#ffffff"/>
        <circle cx="-15" cy="16" r="2.8" fill="#ff5fb0" opacity="0.7"/>
        <circle cx="15" cy="16" r="2.8" fill="#ff5fb0" opacity="0.7"/>
        <path d="M-3,16 Q0,20 3,16" fill="none" stroke="#1a0f2e" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 2. Kawaii Disco Maki Roll -->
    <g transform="translate(182, 168)">
      <g class="bd-sushi-2-anim">
        <ellipse cx="0" cy="30" rx="36" ry="6.5" fill="#ff5fb0" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="29" fill="#1e2238" stroke="#2de2e6" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="23" fill="#fffdf8"/>
        <circle cx="0" cy="0" r="11" fill="#ff8a65"/>
        <circle cx="7" cy="-5" r="4.5" fill="#4ade80"/>
        <circle cx="-11" cy="-2" r="3.6" fill="#1a0f2e"/><circle cx="-12" cy="-3.5" r="1.4" fill="#ffffff"/>
        <circle cx="11" cy="-2" r="3.6" fill="#1a0f2e"/><circle cx="10" cy="-3.5" r="1.4" fill="#ffffff"/>
        <circle cx="-16" cy="4" r="3.2" fill="#ff5fb0" opacity="0.75"/>
        <circle cx="16" cy="4" r="3.2" fill="#ff5fb0" opacity="0.75"/>
        <path d="M-4,6 Q0,11 4,6" fill="none" stroke="#1a0f2e" stroke-width="2.2" stroke-linecap="round"/>
      </g>
    </g>

    <!-- 3. Kawaii Tamago Sushi -->
    <g transform="translate(286, 174)">
      <g class="bd-sushi-3-anim">
        <ellipse cx="0" cy="24" rx="32" ry="6" fill="#ffe14d" stroke="#ffffff" stroke-width="1.5"/>
        <rect x="-23" y="4" width="46" height="20" rx="9" fill="#fffdf8" stroke="#2b1b4a" stroke-width="2.5"/>
        <rect x="-25" y="-12" width="50" height="19" rx="7" fill="#ffe14d" stroke="#2b1b4a" stroke-width="2.5"/>
        <rect x="-7" y="-12" width="14" height="36" fill="#1e2238"/>
        <circle cx="-14" cy="-2" r="2.8" fill="#1a0f2e"/><circle cx="-15" cy="-3" r="1" fill="#ffffff"/>
        <path d="M11,-3 Q15,-6 18,-2" fill="none" stroke="#1a0f2e" stroke-width="2.2" stroke-linecap="round"/>
        <circle cx="-17" cy="3" r="2.6" fill="#ff5fb0" opacity="0.75"/>
        <circle cx="17" cy="3" r="2.6" fill="#ff5fb0" opacity="0.75"/>
      </g>
    </g>
  </svg>`;
}

/* ============================================================================
 * 5. FRUITY SNOWLAND — Moonlit wizard castle, falling fruits, winter buddy
 * ============================================================================ */
function svgFruitySnowland() {
  return `
  <svg class="arcade-svg svg-fruity-snowland" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="fs-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#111547"/>
        <stop offset="56%" stop-color="#282163"/>
        <stop offset="100%" stop-color="#4b246c"/>
      </linearGradient>
      <linearGradient id="fs-snow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e0f7ff"/>
        <stop offset="100%" stop-color="#7aa2d4"/>
      </linearGradient>
    </defs>

    <rect width="360" height="360" fill="url(#fs-sky)"/>

    <!-- Crescent Moon & Stars -->
    <g transform="translate(292, 54)">
      <circle cx="0" cy="0" r="24" fill="#ffe66d"/>
      <circle cx="10" cy="-6" r="20" fill="#181951"/>
    </g>
    <g fill="#fff8d6">
      <circle cx="48" cy="38" r="2" class="twinkle-a"/>
      <circle cx="116" cy="26" r="2.5" class="twinkle-b"/>
      <circle cx="188" cy="44" r="1.8" class="twinkle-c"/>
      <circle cx="242" cy="30" r="2.2" class="twinkle-a"/>
      <circle cx="62" cy="86" r="1.8" class="twinkle-b"/>
    </g>

    <!-- Snowy Wizard Castle -->
    <g fill="#1c1952" stroke="#51e4e6" stroke-opacity="0.35" stroke-width="1.5">
      <rect x="64" y="136" width="34" height="90"/>
      <polygon points="58,136 81,96 104,136" fill="#2e2778"/>
      <rect x="262" y="136" width="34" height="90"/>
      <polygon points="256,136 279,96 302,136" fill="#2e2778"/>
      <rect x="114" y="116" width="132" height="110"/>
      <polygon points="154,116 180,68 206,116" fill="#3a2f8f"/>
      <rect x="76" y="152" width="10" height="14" rx="5" fill="#ffe66d" stroke="none"/>
      <rect x="274" y="152" width="10" height="14" rx="5" fill="#ffe66d" stroke="none"/>
      <rect x="150" y="140" width="14" height="18" rx="7" fill="#ffe66d" stroke="none"/>
      <rect x="196" y="140" width="14" height="18" rx="7" fill="#ffe66d" stroke="none"/>
      <rect x="171" y="176" width="18" height="24" rx="9" fill="#ff5ba7" stroke="none"/>
    </g>

    <!-- Rolling Snow Hills -->
    <path d="M0,226 Q90,204 180,224 Q270,242 360,218 L360,360 L0,360 Z" fill="url(#fs-snow)"/>

    <!-- Drifting Snowflakes -->
    <g class="fs-snow-layer" fill="#ffffff" opacity="0.82">
      <circle cx="38" cy="40" r="3"/><circle cx="102" cy="84" r="2.2"/>
      <circle cx="164" cy="28" r="2.8"/><circle cx="232" cy="76" r="2.4"/>
      <circle cx="318" cy="96" r="3"/><circle cx="72" cy="144" r="2"/>
      <circle cx="288" cy="158" r="2.6"/><circle cx="196" cy="118" r="2.2"/>
    </g>

    <!-- Falling Strawberry -->
    <g transform="translate(114, 72)">
      <g class="fs-fruit-1-anim">
        <path d="M0,-12 C12,-12 15,0 0,16 C-15,0 -12,-12 0,-12 Z" fill="#ff3b7f" stroke="#171546" stroke-width="2.2"/>
        <polygon points="-9,-10 0,-18 9,-10 3,-6 -3,-6" fill="#4ade80"/>
        <circle cx="-4" cy="-2" r="1.4" fill="#ffe66d"/><circle cx="4" cy="0" r="1.4" fill="#ffe66d"/><circle cx="0" cy="6" r="1.4" fill="#ffe66d"/>
      </g>
    </g>

    <!-- Falling Juicy Orange -->
    <g transform="translate(218, 52)">
      <g class="fs-fruit-2-anim">
        <circle cx="0" cy="0" r="13" fill="#ff9f1c" stroke="#171546" stroke-width="2.2"/>
        <ellipse cx="4" cy="-14" rx="6" ry="3.5" transform="rotate(-20 4 -14)" fill="#4ade80"/>
        <circle cx="-4" cy="-4" r="3" fill="#ffe66d" opacity="0.7"/>
      </g>
    </g>

    <!-- Falling Twin Cherries -->
    <g transform="translate(168, 96)">
      <g class="fs-fruit-3-anim">
        <path d="M-8,4 Q-4,-12 4,-16 Q8,-4 8,6" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="-8" cy="7" r="7.5" fill="#ff2e63" stroke="#171546" stroke-width="2"/>
        <circle cx="8" cy="9" r="7.5" fill="#ff2e63" stroke="#171546" stroke-width="2"/>
        <circle cx="-10" cy="5" r="2" fill="#ffffff" opacity="0.8"/>
        <circle cx="6" cy="7" r="2" fill="#ffffff" opacity="0.8"/>
      </g>
    </g>

    <!-- Cheeky Yellow Snowball -->
    <g transform="translate(284, 82)">
      <g class="fs-snowball-anim">
        <circle cx="0" cy="0" r="11" fill="#facc15" stroke="#854d0e" stroke-width="2.2"/>
        <line x1="-4" y1="-3" x2="-1" y2="-1" stroke="#854d0e" stroke-width="2"/>
        <line x1="4" y1="-3" x2="1" y2="-1" stroke="#854d0e" stroke-width="2"/>
        <path d="M-4,4 Q0,1 4,4" fill="none" stroke="#854d0e" stroke-width="1.8"/>
      </g>
    </g>

    <!-- Winter Wizard Buddy Catching Fruits -->
    <g transform="translate(178, 198)">
      <g class="fs-buddy-anim">
        <ellipse cx="0" cy="34" rx="24" ry="6" fill="#2c3e75" opacity="0.35"/>
        <line x1="-16" y1="8" x2="-42" y2="-4" stroke="#ff5ba7" stroke-width="8" stroke-linecap="round"/>
        <line x1="16" y1="8" x2="42" y2="-4" stroke="#ff5ba7" stroke-width="8" stroke-linecap="round"/>
        <circle cx="-44" cy="-5" r="5.5" fill="#51e4e6" stroke="#171546" stroke-width="2"/>
        <circle cx="44" cy="-5" r="5.5" fill="#51e4e6" stroke="#171546" stroke-width="2"/>
        <path d="M-18,30 L-14,0 L14,0 L18,30 Z" fill="#ff5ba7" stroke="#171546" stroke-width="2.5"/>
        <rect x="-15" y="-2" width="30" height="8" rx="4" fill="#51e4e6" stroke="#171546" stroke-width="2"/>
        <circle cx="0" cy="-13" r="13" fill="#ffe5d9" stroke="#171546" stroke-width="2.2"/>
        <circle cx="-4.5" cy="-13" r="2.2" fill="#171546"/>
        <circle cx="4.5" cy="-13" r="2.2" fill="#171546"/>
        <path d="M-3,-8 Q0,-5 3,-8" fill="none" stroke="#171546" stroke-width="1.8" stroke-linecap="round"/>
        <ellipse cx="0" cy="-23" rx="20" ry="5" fill="#51e4e6" stroke="#171546" stroke-width="2"/>
        <polygon points="-13,-24 2,-50 14,-24" fill="#51e4e6" stroke="#171546" stroke-width="2.2"/>
        <circle cx="1" cy="-35" r="3.2" fill="#ffe66d"/>
        <path class="fs-catch-star" d="M0,-64 L3,-56 L11,-53 L3,-50 L0,-42 L-3,-50 L-11,-53 L-3,-56 Z" fill="#ffe66d"/>
      </g>
    </g>
  </svg>`;
}

/* ============================================================================
 * 6. SAVE THE WOODS — Wolf hero defending 5 forest pine trees from chopper bots
 * ============================================================================ */
function svgSaveTheWoods() {
  return `
  <svg class="arcade-svg svg-save-woods" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="sw-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#07150e"/>
        <stop offset="60%" stop-color="#113021"/>
        <stop offset="100%" stop-color="#0a1f15"/>
      </linearGradient>
      <linearGradient id="sw-ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1c4a31"/>
        <stop offset="100%" stop-color="#0a1e13"/>
      </linearGradient>
      <radialGradient id="sw-shield" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#4ade80" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#4ade80" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <rect width="360" height="360" fill="url(#sw-sky)"/>
    <circle cx="62" cy="48" r="22" fill="#d1fae5" opacity="0.22"/>
    <circle cx="62" cy="48" r="15" fill="#ecfdf5" opacity="0.88"/>

    <!-- The 5 Forest Pine Trees -->
    <g stroke="#082416" stroke-width="2" stroke-linejoin="round">
      <g transform="translate(36, 174)">
        <rect x="-5" y="18" width="10" height="24" fill="#6b4226"/>
        <polygon points="0,-46 22,-8 -22,-8" fill="#15803d"/>
        <polygon points="0,-28 26,12 -26,12" fill="#16a34a"/>
        <polygon points="0,-8 30,24 -30,24" fill="#22c55e"/>
      </g>
      <g transform="translate(94, 166)">
        <rect x="-5" y="20" width="10" height="28" fill="#6b4226"/>
        <polygon points="0,-54 24,-12 -24,-12" fill="#15803d"/>
        <polygon points="0,-32 28,10 -28,10" fill="#16a34a"/>
        <polygon points="0,-10 32,26 -32,26" fill="#22c55e"/>
      </g>
      <g transform="translate(158, 160)">
        <rect x="-6" y="22" width="12" height="30" fill="#6b4226"/>
        <polygon points="0,-60 26,-16 -26,-16" fill="#15803d"/>
        <polygon points="0,-36 30,8 -30,8" fill="#16a34a"/>
        <polygon points="0,-12 34,28 -34,28" fill="#4ade80"/>
      </g>
      <g transform="translate(222, 168)">
        <rect x="-5" y="18" width="10" height="26" fill="#6b4226"/>
        <polygon points="0,-50 22,-10 -22,-10" fill="#15803d"/>
        <polygon points="0,-28 26,12 -26,12" fill="#16a34a"/>
        <polygon points="0,-8 30,24 -30,24" fill="#22c55e"/>
      </g>
      <g transform="translate(314, 174)">
        <rect x="-5" y="18" width="10" height="24" fill="#6b4226"/>
        <polygon points="0,-46 20,-8 -20,-8" fill="#15803d"/>
        <polygon points="0,-26 24,12 -24,12" fill="#16a34a"/>
        <polygon points="0,-6 28,24 -28,24" fill="#22c55e"/>
      </g>
    </g>

    <!-- Forest Ground -->
    <path d="M0,212 Q180,198 360,214 L360,360 L0,360 Z" fill="url(#sw-ground)"/>

    <!-- Fireflies -->
    <g fill="#bef264">
      <circle cx="88" cy="112" r="3" class="twinkle-a"/>
      <circle cx="144" cy="84" r="2.5" class="twinkle-b"/>
      <circle cx="204" cy="124" r="3" class="twinkle-c"/>
      <circle cx="52" cy="158" r="2.2" class="twinkle-b"/>
      <circle cx="242" cy="76" r="2.8" class="twinkle-a"/>
    </g>

    <!-- Forest Defense Pulse Wave -->
    <g transform="translate(156, 186)">
      <circle class="sw-pulse-ring" cx="0" cy="0" r="28" fill="none" stroke="#4ade80" stroke-width="3"/>
    </g>

    <!-- LEAPING WOLF HERO -->
    <g transform="translate(114, 196)">
      <g class="sw-wolf-anim">
        <ellipse cx="0" cy="0" rx="34" ry="22" fill="url(#sw-shield)"/>
        <path d="M-24,4 Q-44,-12 -46,6 Q-36,16 -20,10 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.2"/>
        <ellipse cx="-2" cy="4" rx="24" ry="13" fill="#94a3b8" stroke="#0f172a" stroke-width="2.5"/>
        <line x1="-16" y1="12" x2="-28" y2="26" stroke="#cbd5e1" stroke-width="6.5" stroke-linecap="round"/>
        <line x1="12" y1="10" x2="28" y2="22" stroke="#cbd5e1" stroke-width="6.5" stroke-linecap="round"/>
        <line x1="10" y1="-5" x2="18" y2="10" stroke="#4ade80" stroke-width="5" stroke-linecap="round"/>
        <polygon points="10,-14 14,-28 22,-15" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
        <polygon points="20,-14 27,-28 31,-12" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
        <path d="M10,-14 L30,-14 L42,-4 L32,6 L12,4 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.4" stroke-linejoin="round"/>
        <circle cx="41" cy="-4" r="3" fill="#0f172a"/>
        <circle cx="24" cy="-7" r="3" fill="#4ade80"/>
      </g>
    </g>

    <!-- CHOPPER DATA-CENTER ROBOT -->
    <g transform="translate(268, 174)">
      <g class="sw-chopper-bot-anim">
        <g transform="translate(-34, 16)">
          <g class="sw-saw-anim">
            <polygon points="0,-18 5,-8 16,-12 9,-2 18,6 7,8 10,18 0,10 -10,18 -7,8 -18,6 -9,-2 -16,-12 -5,-8"
                     fill="#ff3b5c" stroke="#ffe4e6" stroke-width="1.5"/>
            <circle cx="0" cy="0" r="5" fill="#1e293b"/>
          </g>
        </g>
        <rect x="-32" y="12" width="16" height="8" rx="2" fill="#475569" stroke="#0f172a" stroke-width="2"/>
        <rect x="-22" y="-32" width="44" height="62" rx="6" fill="#1e293b" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="0" y1="-32" x2="0" y2="-46" stroke="#94a3b8" stroke-width="2.5"/>
        <circle cx="0" cy="-48" r="4" fill="#ff3b5c" class="sw-led-blink"/>
        <rect x="-16" y="-24" width="32" height="11" rx="3" fill="#090d16"/>
        <rect x="-12" y="-21" width="24" height="5" rx="2" fill="#ff3b5c"/>
        <rect x="-16" y="-7" width="32" height="8" rx="2" fill="#334155"/>
        <circle cx="-11" cy="-3" r="2" fill="#fbbf24" class="twinkle-a"/>
        <circle cx="-4" cy="-3" r="2" fill="#ff3b5c" class="twinkle-b"/>
        <rect x="4" y="-4.5" width="10" height="3" fill="#64748b"/>
        <rect x="-16" y="5" width="32" height="8" rx="2" fill="#334155"/>
        <circle cx="-11" cy="9" r="2" fill="#4ade80" class="twinkle-c"/>
        <circle cx="-4" cy="9" r="2" fill="#fbbf24" class="twinkle-a"/>
        <rect x="4" y="7.5" width="10" height="3" fill="#64748b"/>
        <rect x="-16" y="17" width="32" height="8" rx="2" fill="#334155"/>
        <circle cx="-11" cy="21" r="2" fill="#ff3b5c" class="twinkle-b"/>
        <circle cx="-4" cy="21" r="2" fill="#ff3b5c" class="twinkle-c"/>
        <rect x="4" y="19.5" width="10" height="3" fill="#64748b"/>
        <ellipse cx="0" cy="34" rx="16" ry="4" fill="#ff3b5c" opacity="0.55"/>
      </g>
    </g>
  </svg>`;
}
