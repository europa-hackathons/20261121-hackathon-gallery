import { GAMES } from './games.js';
import { getGameSvg } from './svg-scenes.js';
import { ArcadeAudio } from './audio.js';

const GITHUB_ICON_SVG = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
  </svg>
`;

const audio = new ArcadeAudio();
const grid = document.getElementById('gallery-grid');
const sfxBtn = document.getElementById('sfx-toggle');

let selectedTile = null;
let lastPointerType = 'mouse';

function updateSfxButton() {
  const { muted, unlocked } = audio.getState();
  const iconEl = sfxBtn.querySelector('.sfx-icon');
  const labelEl = sfxBtn.querySelector('.sfx-label');

  sfxBtn.classList.remove('is-locked', 'is-on', 'is-muted');

  if (muted) {
    sfxBtn.classList.add('is-muted');
    sfxBtn.setAttribute('aria-pressed', 'false');
    sfxBtn.setAttribute('aria-label', 'Unmute arcade sound effects');
    iconEl.textContent = '🔇';
    labelEl.textContent = 'SFX OFF';
  } else if (!unlocked) {
    sfxBtn.classList.add('is-locked');
    sfxBtn.setAttribute('aria-pressed', 'false');
    sfxBtn.setAttribute('aria-label', 'Enable arcade sound effects');
    iconEl.textContent = '⚡';
    labelEl.textContent = 'ENABLE SFX';
  } else {
    sfxBtn.classList.add('is-on');
    sfxBtn.setAttribute('aria-pressed', 'true');
    sfxBtn.setAttribute('aria-label', 'Mute arcade sound effects');
    iconEl.textContent = '🔊';
    labelEl.textContent = 'SFX ON';
  }
}

function nudgeSfxButton() {
  if (!sfxBtn || audio.getState().unlocked || audio.getState().muted) return;
  sfxBtn.classList.remove('is-attention');
  void sfxBtn.offsetWidth;
  sfxBtn.classList.add('is-attention');
}

function clearSelection() {
  if (!selectedTile) return;
  selectedTile.classList.remove('is-active');
  const link = selectedTile.querySelector('.tile-primary-link');
  const pill = selectedTile.querySelector('.tile-play-pill');
  if (link) link.setAttribute('aria-expanded', 'false');
  if (pill) pill.textContent = '▶ PLAY';
  selectedTile = null;
}

function selectTileForTouch(tile) {
  if (selectedTile && selectedTile !== tile) {
    clearSelection();
  }
  selectedTile = tile;
  tile.classList.add('is-active');
  const link = tile.querySelector('.tile-primary-link');
  const pill = tile.querySelector('.tile-play-pill');
  if (link) link.setAttribute('aria-expanded', 'true');
  if (pill) pill.textContent = '▶ TAP TO PLAY';
}

function createTile(game, index) {
  const article = document.createElement('article');
  article.className = `game-tile tier-${game.tier}`;
  article.dataset.gameId = game.id;
  article.dataset.index = String(index);
  article.style.setProperty('--accent', game.accent);
  article.style.setProperty('--accent-2', game.accent2);
  article.style.setProperty('--accent-glow', game.accentGlow);
  article.style.setProperty('--bg-start', game.bgStart);
  article.style.setProperty('--bg-end', game.bgEnd);

  article.innerHTML = `
    <div class="tile-stage">${getGameSvg(game.id)}</div>
    <div class="tile-corners" aria-hidden="true"></div>
    <div class="tile-hud">
      <div class="tile-hud-row">
        <div class="tile-meta">
          <h2 class="tile-title">
            <a
              class="tile-primary-link"
              href="${game.playUrl}"
              target="_blank"
              rel="noopener noreferrer"
              aria-expanded="false"
            >${game.title}</a>
          </h2>
          <p class="tile-tagline">${game.tagline}</p>
        </div>
        <div class="tile-actions">
          <span class="tile-play-pill" aria-hidden="true">▶ PLAY</span>
          <a
            class="tile-repo-link"
            href="${game.repoUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View ${game.title} source code on GitHub"
            title="GitHub Repository"
          >${GITHUB_ICON_SVG}</a>
        </div>
      </div>
    </div>
  `;

  const primaryLink = article.querySelector('.tile-primary-link');
  const repoLink = article.querySelector('.tile-repo-link');

  // Desktop hover: trigger arcade SFX & overdrive animation
  article.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return;
    const played = audio.playGameSfx(game.id);
    if (!played) nudgeSfxButton();
  });

  // Track pointer type cleanly before click fires
  article.addEventListener('pointerdown', (event) => {
    lastPointerType = event.pointerType || 'mouse';
    audio.unlock();
  });

  // Touch 2-tap flow vs Desktop direct launch
  primaryLink.addEventListener('click', (event) => {
    audio.unlock();
    if (lastPointerType === 'touch') {
      if (selectedTile !== article) {
        // 1st tap on touchscreen: preview overdrive animation, play bespoke SFX, show TAP TO PLAY
        event.preventDefault();
        selectTileForTouch(article);
        audio.playGameSfx(game.id);
        return;
      }
      // 2nd tap on touchscreen: play launch fanfare & allow native target="_blank" open
      audio.playLaunch();
      window.setTimeout(() => clearSelection(), 260);
      return;
    }

    // Desktop click / keyboard Enter: launch immediately with arcade fanfare
    audio.playLaunch();
  });

  // Keyboard focus on tile plays its game SFX (once audio is unlocked)
  primaryLink.addEventListener('focus', () => {
    if (lastPointerType !== 'touch') {
      audio.playGameSfx(game.id);
    }
  });

  // Subtle GitHub link: keep isolated from touch preview state
  repoLink.addEventListener('click', (event) => {
    event.stopPropagation();
    audio.unlock();
    audio.playCoin();
  });

  return article;
}

function setupKeyboardGridNav(tiles) {
  const getLink = (idx) => tiles[idx]?.querySelector('.tile-primary-link');

  grid.addEventListener('keydown', (event) => {
    const activeEl = document.activeElement;
    const currentTile = activeEl?.closest('.game-tile');
    if (!currentTile) return;
    const idx = Number(currentTile.dataset.index);
    if (Number.isNaN(idx)) return;

    let nextIdx = null;
    switch (event.key) {
      case 'ArrowRight':
        nextIdx = (idx + 1) % tiles.length;
        break;
      case 'ArrowLeft':
        nextIdx = (idx - 1 + tiles.length) % tiles.length;
        break;
      case 'ArrowDown':
        if (idx === 0) nextIdx = 2;
        else if (idx === 1) nextIdx = 4;
        else nextIdx = idx < 4 ? 0 : 1;
        break;
      case 'ArrowUp':
        if (idx === 2 || idx === 3) nextIdx = 0;
        else if (idx === 4 || idx === 5) nextIdx = 1;
        else nextIdx = idx === 0 ? 2 : 4;
        break;
      case 'Escape':
        clearSelection();
        return;
      default:
        return;
    }

    event.preventDefault();
    audio.unlock();
    lastPointerType = 'keyboard';
    getLink(nextIdx)?.focus();
  });
}

function init() {
  const tiles = GAMES.map((game, i) => createTile(game, i));
  grid.append(...tiles);

  audio.onChange(updateSfxButton);
  updateSfxButton();

  sfxBtn.addEventListener('click', () => {
    audio.toggleMute();
  });

  // Unlock Web Audio cleanly on the first user gesture anywhere outside the SFX toggle button
  const unlockOnGesture = (event) => {
    if (event.target && sfxBtn.contains(event.target)) return;
    audio.unlock();
    updateSfxButton();
    window.removeEventListener('pointerdown', unlockOnGesture);
    window.removeEventListener('keydown', unlockOnGesture);
  };
  window.addEventListener('pointerdown', unlockOnGesture, { passive: true });
  window.addEventListener('keydown', unlockOnGesture, { passive: true });

  // Tapping outside any game tile dismisses active touch preview
  document.addEventListener('pointerdown', (event) => {
    if (selectedTile && !selectedTile.contains(event.target)) {
      clearSelection();
    }
  });

  setupKeyboardGridNav(tiles);
}

init();
