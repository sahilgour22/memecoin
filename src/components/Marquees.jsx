const ROW_1 = 'STAY NICHE 🐾 NOT FOR THE MASSES 🐑🚫 THIS MY WAVE 🌊 EVERY RUN FEEDS A SHELTER 🥣 NO BIKE TYSON AI CLIPS WERE WATCHED IN THE MAKING OF THIS COIN 🚲 WOOF 🐶 MEOW 🐱 '
const ROW_2 = '$NICHE ✦ BORN IN THE TRENCHES ✦ WELCOME TO THE NICHE ✦ FIND YOUR CORNER ✦ '.repeat(2) + ' '

function Row({ className, text }) {
  // two identical copies so the -50% loop is seamless
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="skew"><div className="track"><span>{text}</span><span>{text}</span></div></div>
    </div>
  )
}

export default function Marquees() {
  return (
    <>
      <Row className="m1" text={ROW_1} />
      <Row className="m2" text={ROW_2} />
    </>
  )
}
