import { CONFIG } from '../config.js'
import { burst, sfx, toast } from '../lib/fx.js'

export default function ContractAddress() {
  const copy = async () => {
    if (!CONFIG.ca) {
      sfx.baa()
      toast('🕳️ no CA yet. dev is still cooking.')
      return
    }
    try {
      await navigator.clipboard.writeText(CONFIG.ca)
      sfx.blip()
      burst({ particleCount: 60 })
      toast('📋 copied. now go touch grass (after you buy).')
    } catch {
      toast("couldn't copy — select it manually 🐾")
    }
  }

  return (
    <section className="ca-wrap reveal">
      <div className="ca">
        <span className="ca-label">CA</span>
        <code>{CONFIG.ca || 'COMING SOON TO A TRENCH NEAR YOU'}</code>
        <button className="btn btn-primary btn-small" onClick={copy}>COPY 📋</button>
      </div>
      <p className="ca-warn marker">only trust the CA posted here &amp; on official socials. fakes are for the masses.</p>
    </section>
  )
}
