import { useState } from 'react'
import { burst, clickPoint, floatText, pick, sfx, store, toast } from '../lib/fx.js'

const PETS = {
  dog: { name: 'THE DOG', role: 'Chief Zoomies Officer', sound: 'woof', pops: ['WOOF!', 'BORK', '🦴', '💚', 'zoomies!!'] },
  cat: { name: 'THE CAT', role: 'Head of Not Caring', sound: 'meow', pops: ['meow.', 'mrrp', '🐟', '…fine.', 'purr'] },
}
const PER_PET = 5 // % of the bowl each pet fills

function Pet({ type, onPet }) {
  const p = PETS[type]
  const handle = (e) => {
    const el = e.currentTarget
    el.classList.remove('squish')
    void el.offsetWidth
    el.classList.add('squish')
    sfx[p.sound]()
    floatText(...clickPoint(e), pick(p.pops))
    onPet()
  }
  return (
    <button className={`pet ${type}`} onClick={handle} aria-label={`Pet ${p.name.toLowerCase()}`}>
      <span className="pet-img" />
      <span className="pet-tag"><b>{p.name}</b><small>{p.role}</small></span>
    </button>
  )
}

export default function Shelters() {
  const [bowl, setBowl] = useState(() => store.get('niche_bowl', 0))
  const [bowls, setBowls] = useState(() => store.get('niche_bowls', 0))

  const onPet = () => {
    const next = bowl + PER_PET
    if (next >= 100) {
      const filled = bowls + 1
      setBowl(0); setBowls(filled)
      store.set('niche_bowl', 0); store.set('niche_bowls', filled)
      sfx.win(); burst()
      toast(`🥣 BOWL #${filled} FILLED! the real ones get filled every run.`)
    } else {
      setBowl(next)
      store.set('niche_bowl', next)
    }
  }

  return (
    <section id="shelters" className="section shelters">
      <h2 className="h2 reveal"><span className="chrome">EVERY RUN WE COOK,</span><br /><span className="neon">THE SHELTERS EAT.</span></h2>
      <p className="lead reveal">No dev yacht. No lambo fund. A cut of every run goes straight to dog &amp; cat shelters. The only thing we're dumping is kibble into bowls.</p>

      <div className="pets reveal">
        <Pet type="dog" onPet={onPet} />
        <div className="bowl">
          <div className="bowl-meter">
            <div className="bowl-fill" style={{ height: `${bowl}%`, '--w': `${bowl}%` }} />
            <span className="bowl-pct">{bowl}%</span>
          </div>
          <div className="bowl-emoji">🥣</div>
          <p className="bowl-label">bowls filled by you:<br /><b>{bowls}</b></p>
        </div>
        <Pet type="cat" onPet={onPet} />
      </div>
      <p className="hint marker">↑ pet them. fill the bowl. they're kinda needy. ↑</p>
    </section>
  )
}
