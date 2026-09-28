import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import NicheLink from './NicheLink.jsx'
import { finePointer, partyMode, rand, reduceMotion, sfx, toast } from '../lib/fx.js'

const RAIN = ['🐾', '💚', '🦴', '🐟', '🕶️', '$', '🐾', '💸']
const FLIP_LINES = [
  'heads. niche.',
  'tails. still niche.',
  "it's always niche 🐾",
  'stop flipping the dog',
  'the cat is getting dizzy 😵‍💫',
  'one more… 👀',
]

export default function Hero({ ready }) {
  const root = useRef(null)
  const tilt = useRef(null)
  const coinImg = useRef(null)
  const flips = useRef(0)
  const [drops] = useState(() =>
    reduceMotion ? [] : Array.from({ length: 22 }, (_, i) => ({
      ch: RAIN[i % RAIN.length],
      left: rand(0, 100),
      size: rand(14, 40),
      dur: rand(8, 18),
      delay: -rand(0, 18),
      op: rand(0.25, 0.75),
    })))

  // intro once the loader lifts
  useLayoutEffect(() => {
    if (!ready || reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from('.sticker', { y: -40, opacity: 0, rotate: -20, duration: 0.5, ease: 'back.out(3)' })
        .from('.hero-title .small', { y: 30, opacity: 0, duration: 0.4 }, '<0.1')
        .from('.hero-title .char', {
          yPercent: 120, opacity: 0, rotate: () => gsap.utils.random(-30, 30),
          stagger: 0.06, duration: 0.7, ease: 'back.out(2.5)',
        }, '<0.1')
        .from('.hero-sub, .hero-ctas, .hero-foot', { y: 24, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from('.coin-wrap', { scale: 0, rotate: -360, duration: 1, ease: 'back.out(1.6)' }, 0.2)
        .from('.note', { scale: 0, opacity: 0, stagger: 0.15, ease: 'back.out(3)' }, '-=0.2')
    }, root)
    return () => ctx.revert()
  }, [ready])

  const onMove = (e) => {
    if (!finePointer || reduceMotion) return
    const r = tilt.current.getBoundingClientRect()
    const clamp = (v) => Math.max(-1, Math.min(1, v))
    const x = clamp((e.clientX - (r.left + r.width / 2)) / r.width)
    const y = clamp((e.clientY - (r.top + r.height / 2)) / r.height)
    tilt.current.style.setProperty('--ry', `${(x * 25).toFixed(2)}deg`)
    tilt.current.style.setProperty('--rx', `${(-y * 25).toFixed(2)}deg`)
  }
  const onLeave = () => {
    tilt.current.style.setProperty('--ry', '0deg')
    tilt.current.style.setProperty('--rx', '0deg')
  }

  const flipCoin = () => {
    const img = coinImg.current
    img.classList.remove('flip')
    void img.offsetWidth
    img.classList.add('flip')
    sfx.blip()
    flips.current += 1
    if (flips.current >= 7) {
      flips.current = 0
      partyMode()
    } else {
      toast(FLIP_LINES[flips.current - 1])
    }
  }

  return (
    <header className="hero" id="top" ref={root} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="rain" aria-hidden="true">
        {drops.map((d, i) => (
          <span key={i} style={{
            left: `${d.left}%`, fontSize: d.size, opacity: d.op,
            animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`,
          }}>{d.ch}</span>
        ))}
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <span className="sticker">EST. IN THE TRENCHES 🪖</span>
          <h1 className="hero-title" aria-label="Welcome to the Niche">
            <span className="line small" aria-hidden="true">WELCOME TO THE</span>
            <span className="line big chrome" aria-hidden="true">
              {[...'NICHE'].map((ch, i) => <span className="char" key={i}>{ch}</span>)}
            </span>
          </h1>
          <p className="hero-sub">
            <b>$NICHE</b> ain't for the masses. It's for the ones who found their corner and said{' '}
            <em className="marker hl-marker">"this my wave."</em>
          </p>
          <div className="hero-ctas">
            <NicheLink k="buyUrl" fallback="#buy" className="btn btn-primary">🐾 BUY $NICHE</NicheLink>
            <a className="btn btn-ghost" href="#lore">READ THE LORE</a>
          </div>
          <p className="hero-foot">a cut of every run → dog &amp; cat shelters 🐶🐱</p>
        </div>

        <div className="hero-art">
          <div className="coin-wrap">
            <svg className="ring" viewBox="0 0 500 500" aria-hidden="true">
              <defs><path id="circ" d="M250,250 m-228,0 a228,228 0 1,1 456,0 a228,228 0 1,1 -456,0" /></defs>
              <text><textPath href="#circ" textLength="1425">STAY NICHE ✦ NOT FOR THE MASSES ✦ FEED THE SHELTERS ✦ THIS MY WAVE ✦</textPath></text>
            </svg>
            <div className="coin-tilt" ref={tilt}>
              <button className="coin" onClick={flipCoin} aria-label="Flip the coin">
                <img ref={coinImg} src="/assets/logo.jpg" alt="NICHECOIN logo: a golden retriever and a tabby cat in green sunglasses" />
              </button>
            </div>
          </div>
          <span className="note n1 marker">this dog has<br />never sold ↘</span>
          <span className="note n2 marker">↖ cat is the dev<br />(allegedly)</span>
          <span className="note n3 marker">click me 7 times 👀</span>
        </div>
      </div>
      <a href="#lore" className="scroll-hint" aria-label="Scroll down"><span>scroll, anon</span>🐾</a>
    </header>
  )
}
