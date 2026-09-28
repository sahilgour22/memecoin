import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquees from './components/Marquees.jsx'
import ContractAddress from './components/ContractAddress.jsx'
import Lore from './components/Lore.jsx'
import Versus from './components/Versus.jsx'
import Shelters from './components/Shelters.jsx'
import NicheMeter from './components/NicheMeter.jsx'
import MemeForge from './components/MemeForge.jsx'
import { Snackonomics, HowToBuy, Pawdmap, Reviews, Footer } from './components/InfoSections.jsx'
import { Toast, IdleCat } from './components/Overlays.jsx'
import { emojiRain, finePointer, partyMode, reduceMotion, sfx, toast } from './lib/fx.js'

gsap.registerPlugin(ScrollTrigger)

// Paw prints follow the cursor, alternating left/right like real steps
function usePawTrail() {
  useEffect(() => {
    if (!finePointer || reduceMotion) return
    let lx = 0, ly = 0, side = 1
    const onMove = (e) => {
      const dx = e.clientX - lx, dy = e.clientY - ly
      if (dx * dx + dy * dy < 3600) return
      const ang = Math.atan2(dy, dx)
      lx = e.clientX; ly = e.clientY; side *= -1
      const p = document.createElement('span')
      p.className = 'trail'
      p.style.left = `${e.clientX + Math.cos(ang + Math.PI / 2) * 10 * side}px`
      p.style.top = `${e.clientY + Math.sin(ang + Math.PI / 2) * 10 * side}px`
      p.style.transform = `translate(-50%,-50%) rotate(${(ang * 180) / Math.PI + 90}deg)`
      document.body.appendChild(p)
      setTimeout(() => p.remove(), 1100)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

// Type "woof", "meow", "niche" or "bike" anywhere
function useKeyEggs() {
  useEffect(() => {
    let buf = ''
    const onKey = (e) => {
      if (e.target.closest('input, textarea') || e.key.length !== 1) return
      buf = (buf + e.key.toLowerCase()).slice(-8)
      if (buf.endsWith('woof')) { sfx.woof(); emojiRain(['🐶', '🐕', '🦮', '🦴']); toast('🐶 WOOF MODE ACTIVATED') }
      else if (buf.endsWith('meow')) { sfx.meow(); emojiRain(['🐱', '🐈', '🐟', '😼']); toast('🐱 the cat acknowledges you. barely.') }
      else if (buf.endsWith('niche')) { partyMode(); buf = '' }
      else if (buf.endsWith('bike')) { sfx.baa(); toast('🚲 wrong website. the masses are that way.') }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}

// Scroll-driven reveals, manifesto word scrub, roadmap fill, marquee skew
function useScrollFx(scope) {
  useLayoutEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
      gsap.utils.toArray('.stagger').forEach((el) => {
        gsap.from(el.children, {
          y: 60, opacity: 0, rotate: () => gsap.utils.random(-8, 8), stagger: 0.08, duration: 0.7, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
      gsap.fromTo('.manifesto .w', { opacity: 0.14 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.manifesto', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
      gsap.from('.vs-col.masses', { x: -140, rotate: -8, opacity: 0, duration: 0.9, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.vs-grid', start: 'top 80%' } })
      gsap.from('.vs-col.niche', { x: 140, rotate: 8, opacity: 0, duration: 0.9, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.vs-grid', start: 'top 80%' } })
      gsap.fromTo('.road-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.road', start: 'top 70%', end: 'bottom 60%', scrub: true },
      })
      const skew = gsap.quickTo('.marquee .skew', 'skewX', { duration: 0.4, ease: 'power3' })
      ScrollTrigger.create({ onUpdate: (self) => skew(gsap.utils.clamp(-12, 12, self.getVelocity() / -250)) })
    }, scope)
    return () => ctx.revert()
  }, [scope])
}

export default function App() {
  const mainRef = useRef(null)
  const [ready, setReady] = useState(false)
  const onLoaded = useCallback(() => setReady(true), [])

  usePawTrail()
  useKeyEggs()
  useScrollFx(mainRef)

  useEffect(() => {
    console.log('%c$NICHE 🐾', 'font-size:48px;font-weight:900;color:#39ff14;text-shadow:3px 3px 0 #000')
    console.log('%creading the source? that is extremely niche of you. welcome.', 'color:#8fae88;font-size:14px')
  }, [])

  return (
    <>
      <Loader onDone={onLoaded} />
      <Nav />
      <main ref={mainRef}>
        <Hero ready={ready} />
        <Marquees />
        <ContractAddress />
        <Lore />
        <Versus />
        <Shelters />
        <NicheMeter />
        <Snackonomics />
        <HowToBuy />
        <Pawdmap />
        <MemeForge />
        <Reviews />
        <Footer />
      </main>
      <IdleCat />
      <Toast />
    </>
  )
}
