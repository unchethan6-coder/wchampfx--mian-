"use client"

import { FormEvent, useState } from "react"

const session = { day: "Wednesday", time: "7:00 PM", zone: "GMT" }

export default function WebinarLandingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  function captureLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStep(2)
  }

  return (
    <main className="webinar-page">
      <header className="site-header"><div className="container nav"><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><a className="btn small" href="#register">RESERVE YOUR SEAT</a></div></header>
      <section className="webinar-hero" id="top"><div className="container webinar-grid"><div className="webinar-copy"><span className="eyebrow">LIVE WCHAMPFX WEBINAR</span><h1>Build a <span>$1M prop funding roadmap</span> that you can actually follow.</h1><p className="lead">Join Dan Cheung for a practical live training on strategy, risk, evaluation, preservation and scaling with control.</p><div className="webinar-benefits"><span>✓ Live roadmap training</span><span>✓ Q&amp;A with Dan</span><span>✓ Free implementation framework</span></div></div><aside className="webinar-card" id="register"><div className="webinar-stepper"><span className={step >= 1 ? "active" : ""}>1. Details</span><span className={step >= 2 ? "active" : ""}>2. Session</span><span className={step >= 3 ? "active" : ""}>3. Confirmed</span></div>{step === 1 && <form onSubmit={captureLead}><h2>Reserve your webinar seat</h2><p>Enter your details to see available sessions.</p><label>Full name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label><label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Phone number<input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+44 0000 000000" /></label><button className="btn" type="submit">VIEW AVAILABLE SESSIONS →</button><small>By registering, you agree to receive webinar updates and reminders.</small></form>}{step === 2 && <div className="session-picker"><h2>Choose your session</h2><p>Only currently available webinar sessions are shown.</p><button className="session-option" onClick={() => setStep(3)}><span><b>{session.day}</b><small>Live WChampFX webinar</small></span><strong>{session.time}<small>{session.zone}</small></strong></button><button className="text-button" onClick={() => setStep(1)}>← Edit your details</button></div>}{step === 3 && <div className="booking-confirmed"><span className="confirmation-mark">✓</span><span className="eyebrow">YOUR WEBINAR SEAT IS CONFIRMED</span><h2>You&apos;re in, {name.split(" ")[0]}.</h2><p>Your confirmation, Zoom joining details and calendar link will be sent to <b>{email}</b>.</p><div className="session-summary"><span>{session.day}</span><strong>{session.time} {session.zone}</strong></div><button className="btn" onClick={() => setStep(1)}>REGISTER ANOTHER PERSON</button></div>}</aside></div></section>
      <section className="section-sm webinar-proof"><div className="container center"><span className="eyebrow">WHAT YOU&apos;LL LEARN</span><h2>A clear process from <span className="accent">strategy to scale.</span></h2><div className="webinar-agenda"><article><b>01</b><h3>Build your edge</h3><p>Make your strategy measurable and repeatable.</p></article><article><b>02</b><h3>Pass with control</h3><p>Align risk and execution to the evaluation stage.</p></article><article><b>03</b><h3>Protect payouts</h3><p>Preserve funded accounts and scale with discipline.</p></article></div></div></section>
      <footer><div className="container footer-top"><div><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><p className="micro footer-copy">A structured path for serious prop traders.</p></div></div></footer>
    </main>
  )
}
