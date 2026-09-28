import { useRef, useState } from 'react'
import { burst, sfx } from '../lib/fx.js'

// [min %, emoji, title, roast]
const LEVELS = [
  [0, '🐑', 'CERTIFIED MASS', "You've watched the Bike Tyson AI clip 400 times. You liked it."],
  [10, '🥧', 'NICHE? LIKE QUICHE?', 'Close. Not really. But close.'],
  [25, '📱', 'TIMELINE ENJOYER', 'You follow three accounts nobody else follows. Cute.'],
  [40, '🧭', 'CORNER-CURIOUS', "You found a corner. You haven't sat in it yet."],
  [55, '🙈', 'CLIP SKIPPER', 'You scrolled past the Bike Tyson clip. Respect.'],
  [70, '💬', 'GROUP CHAT OF 2', 'Your group chat has two members and one is a cat.'],
  [85, '🌊', 'THIS MY WAVE', 'You found your corner and said: this my wave.'],
  [95, '🐾', 'YOU ARE THE NICHE', 'Shelters salute you. The dog would take a bullet for you.'],
]

export default function NicheMeter() {
  const [v, setV] = useState(0)
  const maxed = useRef(false)
  const [, emoji, title, desc] = [...LEVELS].reverse().find(([min]) => v >= min)

  const update = (val) => {
    setV(val)
    if (val === 100 && !maxed.current) { maxed.current = true; burst(); sfx.win() }
    if (val < 100) maxed.current = false
  }

  const catDecides = () => {
    sfx.meow()
    update(Math.random() < 0.25 ? 100 : Math.floor(Math.random() * 100))
  }

  return (
    <section id="meter" className="section meter">
      <h2 className="h2 reveal"><span className="chrome">NICHE-O-</span><span className="neon">METER</span></h2>
      <p className="lead reveal">Be honest. The dog can tell when you lie.</p>
      <div className="gauge-card reveal">
        <svg className="gauge" viewBox="0 0 200 118" aria-hidden="true">
          <defs>
            <linearGradient id="gg" x1="0" x2="1">
              <stop offset="0" stopColor="#5a5a5a" /><stop offset=".55" stopColor="#a8ff8a" /><stop offset="1" stopColor="#39ff14" />
            </linearGradient>
          </defs>
          <path d="M20,100 A80,80 0 0 1 180,100" fill="none" stroke="#111" strokeWidth="22" strokeLinecap="round" />
          <path d="M20,100 A80,80 0 0 1 180,100" fill="none" stroke="url(#gg)" strokeWidth="16" strokeLinecap="round" />
          <text x="22" y="116" className="g-lbl">MASSES</text>
          <text x="178" y="116" className="g-lbl" textAnchor="end">NICHE</text>
          <g id="needle" style={{ transform: `rotate(${-90 + v * 1.8}deg)`, transformOrigin: '100px 100px' }}>
            <line x1="100" y1="100" x2="100" y2="32" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="100" r="9" fill="#39ff14" stroke="#000" strokeWidth="3" />
          </g>
        </svg>
        <div className="meter-out">
          <div className="meter-emoji">{emoji}</div>
          <div className="meter-pct">{v}%</div>
          <div className="meter-title">{title}</div>
          <p className="meter-desc">{desc}</p>
        </div>
        <label className="sr" htmlFor="nicheRange">How niche are you?</label>
        <input type="range" id="nicheRange" min="0" max="100" value={v} onChange={(e) => update(+e.target.value)} />
        <button className="btn btn-ghost btn-small" onClick={catDecides}>🎲 let the cat decide</button>
      </div>
    </section>
  )
}
