import { useState } from 'react'
import { burst, emojiRain, finePointer, rand, sfx, shakePage, toast } from '../lib/fx.js'

const MASSES = [
  'Watches the Bike Tyson AI clip. Again.',
  'Buys whatever the timeline yells about',
  '"wen lambo"',
  'Paper hands',
  'Follows the trend',
  'Their bag feeds nobody',
]
const NICHE = [
  <>Never heard of it <small>(lying, but committed)</small></>,
  'Found a corner. Stayed in it.',
  '"wen kibble"',
  'Paws. Literally paws.',
  <>IS the trend <small>(to like 12 people, for now)</small></>,
  'Every run feeds a shelter',
]
// the masses button runs away from the cursor and gets progressively sadder
const DODGE_LABELS = ["I'm with the masses", 'nah', 'you sure?', 'the dog is disappointed', 'just click niche bro', 'ok fine 🐑']

export default function Versus() {
  const [dodge, setDodge] = useState({ x: 0, y: 0, n: 0 })

  const runAway = () => {
    if (!finePointer || dodge.n >= DODGE_LABELS.length - 1) return
    setDodge((d) => ({ x: rand(-120, 120), y: rand(-70, 20), n: d.n + 1 }))
  }

  const pickMasses = () => {
    sfx.baa()
    shakePage()
    emojiRain(['🐑', '🚲', '📉'], 18)
    toast('🚫 wrong answer. the masses are that way →')
  }

  const pickNiche = () => {
    sfx.win()
    burst()
    toast('🐾 correct. welcome to the niche.')
  }

  return (
    <section id="versus" className="section versus">
      <h2 className="h2 reveal"><span className="chrome">MASSES</span> <span className="vs-badge">VS</span> <span className="neon">NICHE</span></h2>
      <div className="vs-grid">
        <div className="vs-col masses">
          <h3>🐑 THE MASSES</h3>
          <ul>{MASSES.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <button
            className="btn btn-ghost pick"
            style={{ transform: `translate(${dodge.x}px, ${dodge.y}px)` }}
            onPointerEnter={runAway}
            onClick={pickMasses}
          >
            {DODGE_LABELS[dodge.n]}
          </button>
        </div>
        <div className="vs-col niche">
          <h3>🐾 THE NICHE</h3>
          <ul>{NICHE.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <button className="btn btn-primary pick" onClick={pickNiche}>I'm niche 🐾</button>
        </div>
      </div>
    </section>
  )
}
