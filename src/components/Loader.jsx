import { useEffect, useState } from 'react'
import { pick, reduceMotion } from '../lib/fx.js'

const LINES = [
  'filtering out the masses…',
  'putting on sunglasses…',
  'locating the corner…',
  'hiding the Bike Tyson clip…',
  'refilling the kibble…',
]

export default function Loader({ onDone }) {
  const [done, setDone] = useState(reduceMotion)
  const [line] = useState(() => pick(LINES))

  useEffect(() => {
    if (reduceMotion) { onDone(); return }
    const t = setTimeout(() => { setDone(true); onDone() }, 1250)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div id="loader" className={done ? 'done' : ''} aria-hidden="true">
      <img src="/assets/logo.jpg" alt="" className="loader-logo" />
      <div className="loader-bar"><span /></div>
      <p className="loader-txt">{line}</p>
    </div>
  )
}
