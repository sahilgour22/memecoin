import { useEffect, useRef, useState } from 'react'
import NicheLink from './NicheLink.jsx'
import { isSoundOn, setSoundOn, sfx, toast } from '../lib/fx.js'

export default function Nav() {
  const navRef = useRef(null)
  const [sound, setSound] = useState(isSoundOn)

  // scroll progress drives the running dog; written straight to the DOM to skip re-renders
  useEffect(() => {
    const nav = navRef.current
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      nav.style.setProperty('--p', p)
      nav.classList.toggle('scrolled', h.scrollTop > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleSound = () => {
    const next = !sound
    setSoundOn(next)
    setSound(next)
    if (next) { sfx.woof(); toast('🔊 sound on. the dog has a voice now.') }
    else toast('🔇 muted. the cat prefers it this way.')
  }

  return (
    <nav className="nav" ref={navRef}>
      <a href="#top" className="brand"><img src="/assets/logo.jpg" alt="" /><span>$NICHE</span></a>
      <div className="nav-links">
        <a href="#lore">Lore</a>
        <a href="#versus">Masses vs Niche</a>
        <a href="#shelters">Shelters</a>
        <a href="#buy">How to Buy</a>
        <a href="#forge">Meme Forge</a>
      </div>
      <div className="nav-right">
        <button className="icon-btn" onClick={toggleSound} aria-label={sound ? 'Mute sound' : 'Turn sound on'}>
          {sound ? '🔊' : '🔇'}
        </button>
        <NicheLink k="buyUrl" fallback="#buy" className="btn btn-primary btn-small">BUY $NICHE</NicheLink>
      </div>
      <div className="scrolldog" aria-hidden="true"><span className="sd-track" /><span className="sd-dog">🐕</span></div>
    </nav>
  )
}
