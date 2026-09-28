import { useEffect, useRef, useState } from 'react'
import { reduceMotion } from '../lib/fx.js'

const MANIFESTO = "Born in the trenches. $NICHE ain't for the masses. It's for the ones who found their corner and said this my wave. While everybody else was chasing the next Bike Tyson AI clip, we stayed niche. Every run we cook, a cut goes straight to dog & cat shelters. Welcome to the niche."
const HIGHLIGHT = /niche|trenches|shelters|wave|corner/i
const STRIKE = /^(Bike|Tyson|AI|clip,)$/

const CHAT = [
  ['dog', 'yo u seen the new bike tyson AI clip 😂'],
  ['cat', 'no.'],
  ['cat', 'i was busy finding my corner'],
  ['dog', 'ur what'],
  ['cat', 'my corner. my wave. my niche.'],
  ['dog', '…can i come'],
  ['cat', 'only if a cut goes to the shelters'],
  ['dog', 'EVERY RUN?? 🥹'],
  ['cat', 'every run we cook.'],
  ['dog', 'welcome to the niche 🐾'],
]

function Chat() {
  const boxRef = useRef(null)
  const bodyRef = useRef(null)
  const timers = useRef([])
  const [shown, setShown] = useState(0)     // messages fully visible
  const [typing, setTyping] = useState(false)
  const [run, setRun] = useState(0)         // bump to (re)play

  // start when the chat scrolls into view
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRun((r) => r || 1); io.disconnect() }
    }, { threshold: 0.35 })
    io.observe(boxRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!run) return
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
    if (reduceMotion) { setShown(CHAT.length); return }
    setShown(0)
    let t = 300
    CHAT.forEach(([, text], i) => {
      later(() => setTyping(true), t)
      t += 450 + text.length * 25
      later(() => { setTyping(false); setShown(i + 1) }, t)
      t += 380
    })
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  }, [run])

  useEffect(() => {
    const b = bodyRef.current
    b.scrollTop = b.scrollHeight
  }, [shown, typing])

  const next = CHAT[shown]
  return (
    <div className="chat reveal" ref={boxRef}>
      <div className="chat-head">
        <span className="av av-dog" /><span className="av av-cat overlap" />
        <div className="chat-title"><b>the niche 🐾</b><small>2 members · 0 masses</small></div>
        <button className="icon-btn small" onClick={() => setRun((r) => r + 1)} aria-label="Replay chat">↻</button>
      </div>
      <div className="chat-body" ref={bodyRef} aria-live="polite">
        {CHAT.slice(0, shown).map(([who, text], i) => (
          <div className={`msg ${who}`} key={`${run}-${i}`}>
            <span className={`av av-${who}`} />
            <div className="bubble">{text}</div>
          </div>
        ))}
        {typing && next && (
          <div className={`msg ${next[0]}`}>
            <span className={`av av-${next[0]}`} />
            <div className="bubble"><span className="dots"><i /><i /><i /></span></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Lore() {
  return (
    <section id="lore" className="section lore">
      <h2 className="h2 reveal"><span className="chrome">THE</span> <span className="neon">LORE</span></h2>
      <div className="lore-grid">
        <p className="manifesto">
          {MANIFESTO.split(' ').map((w, i) => (
            <span key={i} className={`w${HIGHLIGHT.test(w) ? ' hl' : ''}${STRIKE.test(w) ? ' strike' : ''}`}>{w} </span>
          ))}
        </p>
        <Chat />
      </div>
    </section>
  )
}
