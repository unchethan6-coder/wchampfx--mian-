'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'

const roadmap = ['Strategy', 'Risk Management', 'Prop Evaluation', 'Funded Account', 'Preservation', 'Payout Process', 'Scaling', 'Larger Allocation']
const problems = [
  ['01', 'Strategy hopping', 'Constantly switching methods makes execution harder to measure and repeat.'],
  ['02', 'Poor risk management', 'Risk often stays the same even when the objective and account stage change.'],
  ['03', 'Overtrading', 'More activity does not automatically create better execution.'],
  ['04', 'Losing funded accounts', 'Passing an evaluation and preserving an account require different discipline.'],
  ['05', 'No scaling plan', 'Larger allocations need a process, not simply larger position size.'],
]
const lessons = [
  ['01', 'The funding ladder', 'How to move from strategy to larger allocations without skipping the work.'],
  ['02', 'Risk by stage', 'The practical risk adjustments that protect your account at each step.'],
  ['03', 'Evaluation execution', 'How to trade a prop evaluation with rules, structure and less emotion.'],
  ['04', 'Payout preservation', 'The habits that keep funded accounts alive after the first payout.'],
  ['05', 'Scaling intelligently', 'A framework for increasing opportunity without increasing chaos.'],
]
const testimonials = [
  ['“The roadmap gave me a process I could actually follow. I stopped trying to force every trade.”', 'WChampFX student'],
  ['“The biggest shift was understanding that passing and preserving are two different games.”', 'WChampFX student'],
  ['“Simple, structured and practical. I finally knew what to focus on next.”', 'WChampFX student'],
]
const quizQuestions = [
  ["What's your trading experience?", ['Just starting', 'Under 1 year', '1–2 years', '2–5 years', '5+ years']],
  ['Are you currently trading a prop firm account?', ['No', 'Evaluation stage', 'Funded', 'Previously funded']],
  ['What&apos;s the largest account size you&apos;ve worked with?', ['Never used a prop firm', '$10K–$25K', '$50K', '$100K', '$200K+', 'Multiple funded accounts']],
  ['What&apos;s currently holding you back?', ['I don&apos;t have a clear strategy', 'Risk management', 'Psychology / discipline', 'Passing evaluations', 'Keeping funded accounts', 'Getting payouts consistently', 'Scaling accounts']],
  ['What&apos;s your current goal?', ['Learn trading properly', 'Pass my first evaluation', 'Get my first funded account', 'Get my first payout', 'Build $100K+ funding', 'Build toward $500K+', 'Build toward $1M across accounts']],
  ['How much time can you realistically dedicate?', ['< 5 hours/week', '5–10 hours', '10–20 hours', '20+ hours', 'Full-time']],
]

export default function Page() {
  const [submitted, setSubmitted] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<string[]>([])
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showExit, setShowExit] = useState(false)
  const exitShown = useRef(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('wchampfx-lead')
    if (saved) setSubmitted(true)
    const timer = window.setTimeout(() => {
      if (!exitShown.current && !saved) setShowExit(true)
    }, 18000)
    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && !exitShown.current && !saved) {
        exitShown.current = true
        setShowExit(true)
      }
    }
    document.addEventListener('mouseout', onMouseOut)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    window.localStorage.setItem('wchampfx-lead', JSON.stringify({ firstName: data.get('firstName'), email: data.get('email') }))
    setSubmitted(true)
    setQuizStep(0)
    setQuizAnswers([])
    setShowRoadmap(false)
  }

  function answerQuiz(answer: string) {
    const nextAnswers = [...quizAnswers, answer]
    setQuizAnswers(nextAnswers)
    if (quizStep === quizQuestions.length - 1) {
      window.localStorage.setItem('wchampfx-quiz', JSON.stringify(nextAnswers))
      setShowRoadmap(true)
    } else {
      setQuizStep((step) => step + 1)
    }
  }

  function resetLeadFlow() {
    setSubmitted(false)
    setShowRoadmap(false)
    setQuizStep(0)
    setQuizAnswers([])
  }

  function scrollToForm() {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      <header className="site-header"><div className="container nav"><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><nav className="nav-links" aria-label="Primary navigation"><a href="#proof">Results</a><a href="#dan">About Dan</a><a href="#learn">Free Training</a><button className="btn small" onClick={scrollToForm}>GET FREE ROADMAP</button></nav></div></header>
      <main id="top">
        <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">Free WChampFX Training</span><h1>The <span>$1M Prop Funding Roadmap</span></h1><p className="lead">See the framework Dan Cheung uses to structure strategy, risk, funded accounts and account progression.</p><div className="proof-row"><span className="proof-pill">$500K+ verified payouts*</span><span className="proof-pill">Prop firm leaderboard trader</span><span className="proof-pill">347+ WChampFX students</span></div></div><aside className="form-card" id="lead-form"><div className="media-placeholder"><div className="media-label"><span className="micro">FEATURED TRAINING</span><strong>Dan Cheung</strong></div><div className="play" aria-hidden="true">▶</div></div>{submitted ? showRoadmap ? <div className="success-state"><span className="eyebrow">Your roadmap is ready</span><h2>Start with your personal next step.</h2><p>Based on your answers, we&apos;ll tailor the WChampFX funding roadmap and send the next steps to your inbox.</p><div className="roadmap-result"><span className="micro">YOUR JOURNEY</span><strong>{quizAnswers[3] || 'Build a repeatable process'}</strong><span className="muted">Focus on the stage that will create the most progress next.</span></div><button className="btn full" onClick={resetLeadFlow}>Submit another email</button></div> : <div className="quiz-state"><div className="quiz-heading"><span className="eyebrow">Build Your Personal Funding Roadmap</span><h2>6 questions</h2><p>Approximately 60 seconds. Your answers help us point you toward the right next step.</p></div><div className="quiz-progress"><span>Question {quizStep + 1} of {quizQuestions.length}</span><span>{Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%</span></div><div className="quiz-bar"><span style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} /></div><h3 className="quiz-question">{quizQuestions[quizStep][0]}</h3><div className="quiz-options">{(quizQuestions[quizStep][1] as string[]).map((answer) => <button className="quiz-option" key={answer} onClick={() => answerQuiz(answer)}>{answer}<span aria-hidden="true">→</span></button>)}</div></div> : <><div className="form-title">Get the roadmap free</div><form onSubmit={handleSubmit}><div className="form-grid"><Field label="First Name" name="firstName" placeholder="First name"/><Field label="Email" name="email" type="email" placeholder="you@email.com"/><Field label="WhatsApp" name="whatsapp" type="tel" placeholder="+971..."/><label className="field">Country<select name="country" required><option value="">Select country</option><option>United Kingdom</option><option>United States</option><option>Germany</option><option>United Arab Emirates</option><option>Australia</option><option>Canada</option><option>Other</option></select></label><div className="field full"><button className="btn full" type="submit">GET THE FREE ROADMAP →</button></div></div></form><div className="form-meta micro">Free access. Takes less than 30 seconds.</div><div className="risk-note">Educational content only. Trading and prop firm evaluations involve risk. Results are not guaranteed.</div></>}</aside></div></section>

        <section className="section-sm"><div className="container roadmap-wrap center"><span className="eyebrow">Roadmap Preview</span><h2>Inside The $1M Funding Roadmap</h2><div className="roadmap">{roadmap.map((item, index) => <div className="road-step" key={item}><div className="step-dot">{index + 1}</div><span>{item}</span></div>)}</div><button className="btn" onClick={scrollToForm}>Get My Free Roadmap</button></div></section>

        <section className="section" id="proof"><div className="container"><div className="section-head"><span className="eyebrow">The Core Problem</span><h2>Most Traders Don&apos;t Have a Funding Problem.<br/><span className="accent">They Have a Process Problem.</span></h2><p className="lead">The roadmap connects the critical stages into one structured process instead of treating each problem separately.</p></div><div className="cards">{problems.map(([num, title, copy]) => <article className="card" key={num}><div className="num">{num}</div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className="section tinted" id="learn"><div className="container"><div className="section-head center"><span className="eyebrow">Free Training</span><h2>What You&apos;ll Learn</h2></div><div className="learn-grid">{lessons.map(([num, title, copy]) => <article className="learn-card" key={num}><span className="micro">{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className="section" id="dan"><div className="container authority"><div className="dan-visual"><div className="portrait-mark">DC</div><div className="dan-copy"><span className="micro">THE PERSON BEHIND THE PROCESS</span><strong>Dan Cheung</strong><span className="muted">Trader, coach and founder of WChampFX.</span></div></div><div><span className="eyebrow">Built from experience</span><h2>Structure beats noise.</h2><p className="lead">Dan built WChampFX for traders who want a repeatable path through the prop funding journey — not another collection of disconnected strategies.</p><div className="stat-list"><div className="stat"><b>$500K+</b><span>verified payouts*</span></div><div className="stat"><b>347+</b><span>students inside WChampFX</span></div><div className="stat"><b>1 process</b><span>from strategy to scale</span></div><div className="stat"><b>100%</b><span>free roadmap access</span></div></div><button className="btn" onClick={scrollToForm}>Get the framework</button></div></div></section>

        <section className="section tinted"><div className="container"><div className="section-head center"><span className="eyebrow">Student perspective</span><h2>Less noise. More process.</h2></div><div className="testimonials">{testimonials.map(([quote, name]) => <article className="quote" key={quote}><div className="stars">★★★★★</div><p>{quote}</p><small>{name}</small></article>)}</div></div></section>

        <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Choose your next step</span><h2>Where are you in the journey?</h2><p className="lead">Start with the section that sounds most like your current challenge. The roadmap will help you connect the dots.</p></div><div className="journey-grid">{[['I am still building my strategy','I need a repeatable foundation before I think about funding.'],['I am preparing for an evaluation','I want a clear process for passing without forcing trades.'],['I have a funded account','I want to preserve, get paid and scale with control.']].map(([title, copy]) => <button className="journey" key={title} onClick={scrollToForm}><h3>{title}</h3><p>{copy}</p></button>)}</div></div></section>

        <section className="section-sm"><div className="container case"><div className="roman"><div><span className="micro">A SIMPLE CASE STUDY</span><h2>From scattered trades to a scalable process.</h2></div></div><div><span className="eyebrow">The WChampFX approach</span><p className="lead">A funded account is not the finish line. It is the point where your process has to become even more consistent.</p><div className="case-stats"><div className="case-stat"><b>Strategy</b><span>one measurable edge</span></div><div className="case-stat"><b>Risk</b><span>aligned to the stage</span></div><div className="case-stat"><b>Rules</b><span>simple enough to follow</span></div><div className="case-stat"><b>Scale</b><span>earned, not forced</span></div></div><button className="btn" onClick={scrollToForm}>See the roadmap</button></div></div></section>

        <section className="section"><div className="container"><div className="section-head center"><span className="eyebrow">Your next move</span><h2>Start with one clear step.</h2></div><div className="steps">{[['01','Get the roadmap','Enter your details and receive the free training.'],['02','Find your stage','Use the framework to see what needs attention now.'],['03','Build your process','Apply the sequence instead of chasing the next shortcut.'],['04','Scale with control','Move forward when your execution earns it.']].map(([kicker,title,copy]) => <article className="next-step" key={kicker}><span className="kicker">{kicker}</span><h3>{title}</h3><p className="muted">{copy}</p></article>)}</div></div></section>

        <section className="section-sm"><div className="container final"><div><span className="eyebrow">Your roadmap is free</span><h2>Stop guessing what to fix next.</h2><p className="lead">Get the WChampFX $1M Prop Funding Roadmap and see the full process in one place.</p></div><button className="btn" onClick={scrollToForm}>GET THE FREE ROADMAP →</button></div></section>
      </main>
      <footer><div className="container footer-top"><div><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><p className="micro footer-copy">A structured path for serious prop traders.</p></div><div className="footer-links"><a href="#proof">Results</a><a href="#dan">About Dan</a><a href="#learn">Free Training</a><a href="#top">Privacy</a></div></div><div className="container disclaimer">*All results and payout references are illustrative and not a guarantee of future performance. Trading and prop firm evaluations involve significant risk. Educational content only.</div></footer>
      <div className="mobile-sticky"><button className="btn" onClick={scrollToForm}>GET FREE ROADMAP</button></div>
      {showExit && <div className="popup-backdrop show" role="presentation"><div className="popup popup-lead" role="dialog" aria-modal="true" aria-labelledby="popup-title"><button className="popup-close" aria-label="Close" onClick={() => setShowExit(false)}>×</button><div className="popup-media"><div><span className="micro">FEATURED TRAINING</span><strong>Dan Cheung</strong></div><div className="play" aria-hidden="true">▶</div></div><div className="popup-content">{!submitted ? <><span className="eyebrow">Before you go</span><h3 id="popup-title">Get the roadmap free</h3><p>Enter your details, then answer 6 quick questions to build your personal roadmap.</p><form onSubmit={handleSubmit}><div className="popup-form-grid"><Field label="First Name" name="firstName" placeholder="First name"/><Field label="Email" name="email" type="email" placeholder="you@email.com"/><Field label="WhatsApp" name="whatsapp" type="tel" placeholder="+971..."/><label className="field">Country<select name="country" required><option value="">Select country</option><option>United Kingdom</option><option>United States</option><option>Germany</option><option>United Arab Emirates</option><option>Australia</option><option>Canada</option><option>Other</option></select></label><button className="btn full popup-submit" type="submit">START THE 6 QUESTIONS →</button></div></form><div className="form-meta micro">Free access. Takes less than 30 seconds.</div><div className="risk-note">Educational content only. Trading and prop firm evaluations involve risk.</div></> : showRoadmap ? <div className="popup-result"><span className="eyebrow">Your roadmap is ready</span><h3>Start with your personal next step.</h3><p>Based on your answers, we&apos;ll tailor the WChampFX funding roadmap and send the next steps to your inbox.</p><div className="roadmap-result"><span className="micro">YOUR JOURNEY</span><strong>{quizAnswers[3] || 'Build a repeatable process'}</strong><span className="muted">Focus on the stage that will create the most progress next.</span></div></div> : <div className="popup-quiz"><div className="quiz-heading"><span className="eyebrow">Build Your Personal Funding Roadmap</span><h3>{quizQuestions[quizStep][0]}</h3><p>Question {quizStep + 1} of {quizQuestions.length} · Approximately 60 seconds</p></div><div className="quiz-progress"><span>Progress</span><span>{Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%</span></div><div className="quiz-bar"><span style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} /></div><div className="quiz-options">{(quizQuestions[quizStep][1] as string[]).map((answer) => <button className="quiz-option" key={answer} onClick={() => answerQuiz(answer)}>{answer}<span aria-hidden="true">→</span></button>)}</div></div>}</div></div></div>}
    </>
  )
}

function Field({ label, name, placeholder, type = 'text' }: { label: string; name: string; placeholder: string; type?: string }) {
  return <label className="field">{label}<input name={name} type={type} placeholder={placeholder} required /></label>
}
