import { useEffect, useRef, useState } from 'react'
import { pick, sfx, toast } from '../lib/fx.js'

const CAPTIONS = [
  ['everyone else: bike tyson AI clip', 'us: staying niche'],
  ['me finding my corner', 'this my wave'],
  ['they said touch grass', 'we touched the trenches'],
  ['not for the masses', 'for the ones who found their corner'],
  ['dev cooked again', 'shelters ate good'],
  ['chart dipped', 'the shelter still got paid'],
  ['POV: you found it early', 'and you stayed niche'],
  ['mom can we get a memecoin', 'we have $NICHE at home'],
  ['sir this is a niche', "not a wendy's"],
  ['the masses: wen lambo', 'the niche: wen kibble'],
]
const SIZE = 800

function wrap(ctx, text, maxW) {
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = word } else line = test
  }
  if (line) lines.push(line)
  return lines
}

function caption(ctx, raw, where) {
  const text = raw.trim().toUpperCase()
  if (!text) return
  let size = 86
  let lines
  do {
    ctx.font = `${size}px Anton, Impact, sans-serif`
    lines = wrap(ctx, text, SIZE - 60)
    size -= 6
  } while (lines.length > 2 && size > 36)
  size += 6
  const lh = size * 1.05
  ctx.textAlign = 'center'
  ctx.lineJoin = 'round'
  ctx.lineWidth = size / 7
  ctx.strokeStyle = '#000'
  ctx.fillStyle = '#fff'
  lines.forEach((l, i) => {
    const y = where === 'top' ? 26 + size * 0.95 + i * lh : SIZE - 30 - (lines.length - 1 - i) * lh
    ctx.strokeText(l, SIZE / 2, y)
    ctx.fillText(l, SIZE / 2, y)
  })
}

export default function MemeForge() {
  const canvasRef = useRef(null)
  const [img, setImg] = useState(null)
  const [fontsReady, setFontsReady] = useState(false)
  const [top, setTop] = useState(CAPTIONS[0][0])
  const [bot, setBot] = useState(CAPTIONS[0][1])

  useEffect(() => {
    const i = new Image()
    i.onload = () => setImg(i)
    i.src = '/assets/logo.jpg'
    document.fonts?.load('60px Anton').finally(() => setFontsReady(true))
  }, [])

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, SIZE, SIZE)
    if (img) ctx.drawImage(img, 0, 0, SIZE, SIZE)
    caption(ctx, top, 'top')
    caption(ctx, bot, 'bottom')
  }, [img, fontsReady, top, bot])

  const randomize = () => {
    let next
    do next = pick(CAPTIONS); while (next[0] === top)
    setTop(next[0]); setBot(next[1])
    sfx.blip()
  }

  const download = () => {
    canvasRef.current.toBlob((blob) => {
      if (!blob) { toast('😿 the cat knocked the meme off the table. try again.'); return }
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'niche-meme.png'
      a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 2000)
      sfx.woof()
      toast('🖼️ meme secured. post it. stay niche.')
    }, 'image/png')
  }

  const share = () => {
    const text = `${top}\n${bot}\n\n$NICHE 🐾 welcome to the niche`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <section id="forge" className="section forge">
      <h2 className="h2 reveal"><span className="chrome">MEME</span> <span className="neon">FORGE</span></h2>
      <p className="lead reveal">Cook a meme. Post it. Stay niche. The dog approves every single one.</p>
      <div className="forge-grid reveal">
        <canvas id="meme" ref={canvasRef} width={SIZE} height={SIZE} aria-label={`Meme preview: ${top} / ${bot}`} />
        <div className="forge-ctrl">
          <label>TOP TEXT<input maxLength={80} value={top} onChange={(e) => setTop(e.target.value)} /></label>
          <label>BOTTOM TEXT<input maxLength={80} value={bot} onChange={(e) => setBot(e.target.value)} /></label>
          <div className="forge-btns">
            <button className="btn btn-ghost" onClick={randomize}>🎲 RANDOM</button>
            <button className="btn btn-primary" onClick={download}>⬇ DOWNLOAD</button>
            <button className="btn btn-ghost" onClick={share}>𝕏 SHARE</button>
          </div>
          <p className="marker small-note">pro tip: memes with the dog perform 400% better. source: the dog.</p>
        </div>
      </div>
    </section>
  )
}
