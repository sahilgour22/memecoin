import { useEffect, useRef, useState } from 'react'
import { pick, sfx } from '../lib/fx.js'

export function Toast() {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  const timer = useRef()

  useEffect(() => {
    const onToast = (e) => {
      setMsg(e.detail)
      setShow(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setShow(false), 2600)
    }
    window.addEventListener('niche:toast', onToast)
    return () => { window.removeEventListener('niche:toast', onToast); clearTimeout(timer.current) }
  }, [])

  return <div id="toast" className={show ? 'show' : ''} role="status" aria-live="polite">{msg}</div>
}

const PEEK_LINES = [
  'psst… still not niche?',
  "the masses are calling. don't answer.",
  'buy $NICHE, feed a shelter. simple.',
  "i'm not needy. pet me though.",
  'u been staring at this page for a while…',
]
const IDLE_MS = 18000

// A cat pops up from the corner if you go idle
export function IdleCat() {
  const [show, setShow] = useState(false)
  const [line, setLine] = useState(PEEK_LINES[0])
  const shown = useRef(false)

  useEffect(() => {
    let idle, hide
    const arm = () => {
      if (shown.current) return
      clearTimeout(idle)
      idle = setTimeout(() => {
        shown.current = true
        setLine(pick(PEEK_LINES))
        setShow(true)
        hide = setTimeout(() => { shown.current = false; setShow(false); arm() }, 8000)
      }, IDLE_MS)
    }
    const events = ['pointermove', 'scroll', 'keydown', 'touchstart']
    events.forEach((ev) => window.addEventListener(ev, arm, { passive: true }))
    arm()
    return () => {
      clearTimeout(idle); clearTimeout(hide)
      events.forEach((ev) => window.removeEventListener(ev, arm))
    }
  }, [])

  const boop = () => {
    sfx.meow()
    shown.current = false
    setShow(false)
  }

  return (
    <button id="peek" className={show ? 'show' : ''} onClick={boop} aria-label="A cat peeking" tabIndex={show ? 0 : -1}>
      <span className="peek-bubble">{line}</span>
      <span className="peek-cat" />
    </button>
  )
}
