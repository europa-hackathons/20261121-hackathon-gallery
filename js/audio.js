/**
 * Procedural Retro Arcade Web Audio Synthesizer.
 *
 * Generates zero-dependency, zero-latency 8-bit/16-bit arcade sound effects
 * using Web Audio oscillators and filtered white noise. Respects browser
 * autoplay policies cleanly and exposes unlock/mute state for UI feedback.
 */
const STORAGE_KEY = 'europa-arcade-sfx-muted';

export class ArcadeAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.compressor = null;
    this.noiseBuffer = null;
    this.muted = this._loadMuted();
    this.unlocked = false;
    this.gestureSeen = false;
    this.lastPlayedAt = new Map();
    this.listeners = new Set();
  }

  _loadMuted() {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }

  _saveMuted() {
    try {
      localStorage.setItem(STORAGE_KEY, this.muted ? '1' : '0');
    } catch {
      // Ignore storage errors in private contexts.
    }
  }

  onChange(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  _emit() {
    const state = this.getState();
    for (const fn of this.listeners) fn(state);
  }

  getState() {
    return {
      muted: this.muted,
      unlocked: this.unlocked,
      active: this.unlocked && !this.muted,
    };
  }

  _ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -14;
      this.compressor.knee.value = 18;
      this.compressor.ratio.value = 6;
      this.compressor.attack.value = 0.004;
      this.compressor.release.value = 0.12;

      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.42;

      this.compressor.connect(this.master);
      this.master.connect(this.ctx.destination);

      // Reusable 0.6s white-noise buffer for rocket whooshes, explosions, & drums
      const len = Math.floor(this.ctx.sampleRate * 0.6);
      this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      this.ctx.onstatechange = () => {
        const nowUnlocked = this.ctx.state === 'running';
        if (nowUnlocked !== this.unlocked) {
          this.unlocked = nowUnlocked;
          this._emit();
        }
      };
    }
    return this.ctx;
  }

  /**
   * Call inside any user gesture (pointerdown, click, keydown) to unlock audio.
   */
  unlock() {
    this.gestureSeen = true;
    const ctx = this._ensureContext();
    if (!ctx) return false;
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        if (ctx.state === 'running' && !this.unlocked) {
          this.unlocked = true;
          this._emit();
        }
      }).catch(() => {});
    }
    if (!this.unlocked) {
      this.unlocked = true;
      this._emit();
    }
    return true;
  }

  toggleMute() {
    const wasUnlocked = this.unlocked;
    this.gestureSeen = true;
    const ctx = this._ensureContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    this.unlocked = true;

    // If audio was locked & unmuted, clicking the button unlocks & plays coin chime instead of muting
    if (!wasUnlocked && !this.muted) {
      if (this.master) this.master.gain.value = 0.42;
      this._emit();
      this.playCoin();
      return this.getState();
    }

    this.muted = !this.muted;
    this._saveMuted();
    if (this.master && this.ctx) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.muted ? 0 : 0.42, now);
    }
    this._emit();
    if (!this.muted) {
      this.playCoin();
    }
    return this.getState();
  }

  _canPlay() {
    if (this.muted || !this.gestureSeen) return false;
    const ctx = this._ensureContext();
    if (!ctx) return false;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return true;
  }

  /**
   * Play a single oscillator voice with envelope and optional pitch slide.
   */
  _tone({
    type = 'square',
    freq = 440,
    endFreq = null,
    delay = 0,
    duration = 0.12,
    gain = 0.22,
    attack = 0.005,
    detune = 0,
  }) {
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(20, freq), t0);
    if (detune) osc.detune.setValueAtTime(detune, t0);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t0 + duration);
    }

    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

    osc.connect(g);
    g.connect(this.compressor);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  /**
   * Play a filtered white-noise burst (whooshes, rocket exhaust, punches).
   */
  _noise({
    delay = 0,
    duration = 0.16,
    gain = 0.2,
    filterType = 'bandpass',
    freq = 800,
    endFreq = null,
    q = 1.6,
  }) {
    const ctx = this.ctx;
    const t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(Math.max(40, freq), t0);
    if (endFreq !== null) {
      filter.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), t0 + duration);
    }

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

    src.connect(filter);
    filter.connect(g);
    g.connect(this.compressor);
    src.start(t0);
    src.stop(t0 + duration + 0.02);
  }

  /** Classic arcade "INSERT COIN" two-tone ding. */
  playCoin() {
    if (!this._canPlay()) return false;
    this._tone({ type: 'square', freq: 987.77, duration: 0.08, delay: 0, gain: 0.2 });
    this._tone({ type: 'square', freq: 1318.51, duration: 0.28, delay: 0.075, gain: 0.22 });
    return true;
  }

  /** Upbeat arcade "GAME START" launch fanfare. */
  playLaunch() {
    if (!this._canPlay()) return false;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      this._tone({
        type: i === 3 ? 'triangle' : 'square',
        freq: n,
        delay: i * 0.052,
        duration: i === 3 ? 0.26 : 0.075,
        gain: i === 3 ? 0.26 : 0.17,
      });
    });
    return true;
  }

  /**
   * Play the bespoke arcade sound signature for a given game tile.
   * Returns true if audio played, false if muted/locked/throttled.
   */
  playGameSfx(gameId) {
    if (!this._canPlay()) return false;

    const nowMs = performance.now();
    const last = this.lastPlayedAt.get(gameId) ?? -Infinity;
    if (nowMs - last < 160) return true;
    this.lastPlayedAt.set(gameId, nowMs);

    switch (gameId) {
      case 'rocket-punch':
        // Rocket ignition whoosh + heavy arcade punch impact + electric power chime
        this._noise({ filterType: 'bandpass', freq: 260, endFreq: 1850, duration: 0.16, gain: 0.22, q: 1.4 });
        this._tone({ type: 'sawtooth', freq: 185, endFreq: 48, delay: 0.09, duration: 0.14, gain: 0.28 });
        this._tone({ type: 'square', freq: 523.25, delay: 0.11, duration: 0.07, gain: 0.16 });
        this._tone({ type: 'square', freq: 783.99, delay: 0.17, duration: 0.14, gain: 0.18 });
        break;

      case 'space-run':
        // Twin retro plasma laser PEW-PEW sweeps + sci-fi radar ping
        this._tone({ type: 'sawtooth', freq: 1480, endFreq: 210, delay: 0, duration: 0.11, gain: 0.18 });
        this._tone({ type: 'square', freq: 1220, endFreq: 180, delay: 0.075, duration: 0.11, gain: 0.17 });
        this._tone({ type: 'sine', freq: 1760, endFreq: 1320, delay: 0.15, duration: 0.12, gain: 0.12 });
        break;

      case 'penalty-shootout':
        // Referee whistle trill + punchy stadium kick thump + goal chime
        this._tone({ type: 'sine', freq: 2420, endFreq: 2680, delay: 0, duration: 0.06, gain: 0.14 });
        this._tone({ type: 'sine', freq: 2650, endFreq: 2360, delay: 0.055, duration: 0.07, gain: 0.13 });
        this._tone({ type: 'triangle', freq: 165, endFreq: 44, delay: 0.09, duration: 0.13, gain: 0.32 });
        this._tone({ type: 'square', freq: 587.33, delay: 0.14, duration: 0.08, gain: 0.13 });
        this._tone({ type: 'square', freq: 880, delay: 0.21, duration: 0.13, gain: 0.15 });
        break;

      case 'bdou':
        // Funky neon disco synth octave bounce + kawaii sparkle pop
        this._tone({ type: 'triangle', freq: 261.63, delay: 0, duration: 0.07, gain: 0.24 });
        this._tone({ type: 'square', freq: 523.25, delay: 0.055, duration: 0.065, gain: 0.15 });
        this._tone({ type: 'square', freq: 659.25, delay: 0.11, duration: 0.065, gain: 0.16 });
        this._tone({ type: 'square', freq: 783.99, delay: 0.165, duration: 0.07, gain: 0.16 });
        this._tone({ type: 'sine', freq: 1046.5, endFreq: 1318.5, delay: 0.21, duration: 0.12, gain: 0.16 });
        break;

      case 'fruity-snowland':
        // Sparkling icy fairy-bell fruit-catch arpeggio
        [1318.51, 1661.22, 1975.53, 2637.02].forEach((note, idx) => {
          this._tone({
            type: 'sine',
            freq: note,
            delay: idx * 0.048,
            duration: 0.18,
            gain: 0.15,
            attack: 0.004,
          });
          this._tone({
            type: 'triangle',
            freq: note * 0.5,
            delay: idx * 0.048,
            duration: 0.12,
            gain: 0.07,
          });
        });
        break;

      case 'save-the-woods':
        // Heroic 8-bit forest wolf horn + crisp bot zap
        this._tone({ type: 'square', freq: 392.0, delay: 0, duration: 0.075, gain: 0.17 });
        this._tone({ type: 'square', freq: 493.88, delay: 0.065, duration: 0.075, gain: 0.17 });
        this._tone({ type: 'square', freq: 587.33, delay: 0.13, duration: 0.085, gain: 0.18 });
        this._tone({ type: 'triangle', freq: 783.99, delay: 0.19, duration: 0.16, gain: 0.22 });
        this._tone({ type: 'sawtooth', freq: 680, endFreq: 220, delay: 0.05, duration: 0.09, gain: 0.1 });
        break;

      default:
        this.playCoin();
    }
    return true;
  }
}
