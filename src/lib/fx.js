import confetti from 'canvas-confetti'

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = window.matchMedia('(pointer: fine)').matches

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
export const rand = (min, max) => min + Math.random() * (max - min)

// localStorage can throw (private mode, blocked storage) — never let it break the page
export const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key)
      return v === null ? fallback : JSON.parse(v)
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
  },
}

/* ---------------- toast ---------------- */
export function toast(msg) {
  window.dispatchEvent(new CustomEvent('niche:toast', { detail: msg }))
}

/* ---------------- sound (WebAudio synth, no files) ---------------- */
let soundOn = store.get('niche_sound', true)
export const isSoundOn = () => soundOn
export function setSoundOn(v) {
  soundOn = v
  store.set('niche_sound', v)
}

let actx
function audio() {
  if (!actx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    actx = new AC()
  }
  if (actx.state === 'suspended') actx.resume()
  return actx
}

function tone({ type = 'sine', from = 440, to = from, dur = 0.2, vol = 0.2, filter = 0, vibrato = 0 }) {
  if (!soundOn) return
  const c = audio()
  if (!c) return
  const t = c.currentTime
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(from, t)
  o.frequency.exponentialRampToValueAtTime(to, t + dur)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  let node = o
  if (filter) {
    const f = c.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.value = filter
    o.connect(f)
    node = f
  }
  if (vibrato) {
    const lfo = c.createOscillator()
    const depth = c.createGain()
    lfo.frequency.value = vibrato
    depth.gain.value = from * 0.06
    lfo.connect(depth).connect(o.frequency)
    lfo.start(t)
    lfo.stop(t + dur)
  }
  node.connect(g).connect(c.destination)
  o.start(t)
  o.stop(t + dur + 0.05)
}

export const sfx = {
  woof() {
    tone({ type: 'sawtooth', from: 380, to: 120, dur: 0.16, vol: 0.3, filter: 1100 })
    setTimeout(() => tone({ type: 'sawtooth', from: 340, to: 110, dur: 0.14, vol: 0.25, filter: 1000 }), 170)
  },
  meow() {
    tone({ type: 'triangle', from: 520, to: 880, dur: 0.18, vol: 0.18 })
    setTimeout(() => tone({ type: 'triangle', from: 880, to: 420, dur: 0.35, vol: 0.16, vibrato: 7 }), 170)
  },
  baa() { tone({ type: 'sawtooth', from: 260, to: 230, dur: 0.6, vol: 0.15, filter: 1400, vibrato: 14 }) },
  blip() { tone({ type: 'square', from: 660, to: 990, dur: 0.08, vol: 0.06 }) },
  win() {
    ;[523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => tone({ type: 'square', from: f, to: f, dur: 0.12, vol: 0.07 }), i * 90))
  },
}

/* ---------------- visual fx ---------------- */
const COLORS = ['#39ff14', '#8dff5a', '#ffffff', '#c0c0c0', '#f0a040']

export function burst(opts = {}) {
  if (reduceMotion) return
  confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 }, colors: COLORS, ...opts })
  try {
    const paw = confetti.shapeFromText({ text: '🐾', scalar: 2 })
    confetti({ particleCount: 30, spread: 120, origin: { y: 0.6 }, shapes: [paw], scalar: 2 })
  } catch { /* older browsers: plain confetti is fine */ }
}

export function emojiRain(list, n = 36) {
  if (reduceMotion) return
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span')
    s.className = 'drop'
    s.textContent = pick(list)
    s.style.left = rand(0, 100) + 'vw'
    s.style.fontSize = rand(24, 64) + 'px'
    s.style.animationDuration = rand(1.8, 3.6) + 's'
    s.style.animationDelay = rand(0, 1.2) + 's'
    s.addEventListener('animationend', () => s.remove())
    document.body.appendChild(s)
  }
}

export function floatText(x, y, text) {
  const s = document.createElement('span')
  s.className = 'float'
  s.textContent = text
  s.style.left = x + 'px'
  s.style.top = y + 'px'
  s.style.setProperty('--dx', rand(-40, 40) + 'px')
  s.style.setProperty('--r', rand(-20, 20) + 'deg')
  s.addEventListener('animationend', () => s.remove())
  document.body.appendChild(s)
}

export function partyMode() {
  const html = document.documentElement
  html.classList.add('party')
  sfx.win()
  burst()
  emojiRain(['🐶', '🐱', '🕶️', '💚', '🐾'], 40)
  toast('🎉 YOU FOUND THE NICHE WITHIN THE NICHE')
  setTimeout(() => html.classList.remove('party'), 4000)
}

export function shakePage() {
  const html = document.documentElement
  html.classList.remove('shake')
  void html.offsetWidth
  html.classList.add('shake')
  setTimeout(() => html.classList.remove('shake'), 500)
}

// Where a click happened, falling back to the element's centre for keyboard "clicks"
export function clickPoint(e) {
  if (e.clientX || e.clientY) return [e.clientX, e.clientY]
  const r = e.currentTarget.getBoundingClientRect()
  return [r.left + r.width / 2, r.top + r.height / 2]
}
