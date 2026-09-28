import NicheLink from './NicheLink.jsx'

const SNACKS = [
  ['TICKER', '$NICHE', 'say it with your chest'],
  ['CHAIN', 'SOLANA', 'aka the trenches'],
  ['SHELTER CUT', 'EVERY RUN', 'not a gimmick. a lifestyle.', true],
  ['MASSES ALLOWED', '0', 'strict door policy'],
  ['SUNGLASSES', '2 PAIRS', 'fully diluted drip'],
  ['VIBES', '∞', 'unaudited, but immaculate'],
]

export function Snackonomics() {
  return (
    <section id="tokenomics" className="section tokenomics">
      <h2 className="h2 reveal"><span className="chrome">SNACK</span><span className="neon">ONOMICS</span></h2>
      <div className="cards stagger">
        {SNACKS.map(([k, v, s, hot]) => (
          <div className={`card${hot ? ' hot' : ''}`} key={k}>
            <span className="k">{k}</span><span className="v">{v}</span><span className="s">{s}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const STEPS = [
  ['GET A WALLET', 'Phantom or Solflare. Write your seed phrase on paper — not on a sticky note on your monitor, Kevin.'],
  ['GET SOME SOL', "Buy SOL on an exchange and send it to your wallet. The masses will ask why. Don't explain yourself."],
  ['SWAP FOR $NICHE', 'Paste the official CA into Jupiter (or wherever the pack trades). Double-check it. Fakes are for the masses.'],
  ['STAY NICHE', "Find your corner. Sit in it. Every run we cook feeds a shelter. Repeat until the dog says stop. (He won't.)"],
]

export function HowToBuy() {
  return (
    <section id="buy" className="section buy">
      <h2 className="h2 reveal"><span className="chrome">HOW TO</span> <span className="neon">JOIN THE NICHE</span></h2>
      <div className="steps stagger">
        {STEPS.map(([h, p], i) => (
          <div className="step" key={h}><span className="num">{i + 1}</span><h3>{h}</h3><p>{p}</p></div>
        ))}
      </div>
      <div className="center reveal">
        <NicheLink k="buyUrl" className="btn btn-primary btn-big">🐾 BUY $NICHE NOW</NicheLink>
      </div>
    </section>
  )
}

const PHASES = [
  ['BORN IN THE TRENCHES', 'Launch. Survive. Acquire two (2) pairs of sunglasses. Ignore the masses.', true],
  ['FIND THE CORNER', 'Build the pack. Meme relentlessly. Make this golden retriever the most famous dog on the timeline.'],
  ['FEED THE SHELTERS', 'Every run we cook, a cut goes straight to dog & cat shelters. Post the receipts. Post the doggos.'],
]

export function Pawdmap() {
  return (
    <section id="roadmap" className="section roadmap">
      <h2 className="h2 reveal"><span className="chrome">PAWD</span><span className="neon">MAP</span></h2>
      <div className="road">
        <div className="road-line"><div className="road-fill" /></div>
        {PHASES.map(([h, p, done], i) => (
          <div className={`phase reveal${done ? ' done' : ''}`} key={h}>
            <span className="dot">{done ? '✓' : i + 1}</span>
            <div><small>PHASE {i + 1}</small><h3>{h}</h3><p>{p}</p></div>
          </div>
        ))}
        <div className="phase reveal">
          <span className="dot">?</span>
          <div>
            <small>PHASE 4</small>
            <h3 className="glitch" data-text="????????">????????</h3>
            <p>Become so niche we loop back around to mainstream. Immediately regret it. Return to the corner.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const REVIEWS = [
  ['★★★★★', '"Woof."', 'dog', 'The Dog · holding since birth'],
  ['★★★★★', '"I have never cared about anything. I care about this a little."', 'cat', 'The Cat · Head of Not Caring'],
  ['★☆☆☆☆', `"Sold my $NICHE to buy a Bike Tyson AI clip. It's a JPEG of a bike."`, '🐑', 'A member of the masses', true],
  ['★★★★☆', `"I don't get it."`, '🦃', 'Your uncle at Thanksgiving (he bought)'],
  ['★★★★★', '"Bork bork bork bork bork."', 'dog', 'The Dog · second account'],
]

export function Reviews() {
  return (
    <section className="section reviews">
      <h2 className="h2 reveal"><span className="chrome">REVIEWS FROM</span> <span className="neon">THE PACK</span></h2>
      <div className="rev-grid stagger">
        {REVIEWS.map(([stars, quote, av, who, sad]) => (
          <figure className={`rev${sad ? ' sad' : ''}`} key={who}>
            <div className="stars">{stars}</div>
            <blockquote>{quote}</blockquote>
            <figcaption>
              {av === 'dog' || av === 'cat'
                ? <span className={`av av-${av}`} />
                : <span className="av av-sheep">{av}</span>}
              {who}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <img src="/assets/logo.jpg" alt="" className="foot-logo" />
      <h2 className="h2"><span className="chrome">WELCOME TO</span><br /><span className="neon">THE NICHE</span></h2>
      <div className="socials">
        <NicheLink k="xUrl" className="btn btn-ghost">𝕏 TWITTER</NicheLink>
        <NicheLink k="telegramUrl" className="btn btn-ghost">✈️ TELEGRAM</NicheLink>
        <NicheLink k="chartUrl" className="btn btn-ghost">📈 CHART</NicheLink>
      </div>
      <p className="disclaimer">
        $NICHE is a memecoin with no intrinsic value or expectation of financial return. It exists for fun, community,
        and feeding pets. Not financial advice — barely even advice. Crypto is risky; only put in what you're fine
        losing to a dog in sunglasses.
      </p>
      <p className="egg marker">psst… type <b>woof</b>. or <b>meow</b>. or <b>niche</b>.</p>
      <p className="copy">© $NICHE · made in the trenches · 0 masses were harmed</p>
    </footer>
  )
}
