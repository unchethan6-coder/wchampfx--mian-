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
export default function Page() {
  return (
    <>
      <header className="site-header"><div className="container nav"><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><nav className="nav-links" aria-label="Primary navigation"><a href="#proof">Results</a><a href="#dan">About Dan</a><a href="#learn">Free Training</a><a className="btn small" href="#quiz">GET FREE ROADMAP</a></nav></div></header>
      <main id="top">
        <section className="vsl-section" aria-labelledby="vsl-title"><div className="container"><div className="vsl-heading"><span className="eyebrow">Free training</span><h2 id="vsl-title">See the framework before you build your roadmap.</h2><p>Watch the training, then answer six quick questions to get your next best step.</p></div><div className="vsl-frame"><iframe src="https://www.youtube.com/embed/wIssK9Kqums?autoplay=1&mute=1&controls=1&playsinline=1&rel=0" title="WChampFX free training video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div></div></section>
        <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">Free WChampFX Training</span><h1>The <span>$1M Prop Funding Roadmap</span></h1><p className="lead">See the framework Dan Cheung uses to structure strategy, risk, funded accounts and account progression.</p><div className="proof-row"><span className="proof-pill">$500K+ verified payouts*</span><span className="proof-pill">Prop firm leaderboard trader</span><span className="proof-pill">347+ WChampFX students</span></div></div><div className="hero-training-card" id="quiz"><div className="media-placeholder"><div className="media-label"><span className="micro">FEATURED TRAINING</span><strong>Dan Cheung</strong></div><div className="play" aria-hidden="true">▶</div></div><iframe className="typeform-embed" src="https://form.typeform.com/to/kteHRTTw" title="WChampFX Quiz" allowFullScreen /></div></div></section>


        <section className="section-sm"><div className="container roadmap-wrap center"><span className="eyebrow">Roadmap Preview</span><h2>Inside The <span className="accent">$1M Funding Roadmap</span></h2><div className="roadmap">{roadmap.map((item, index) => <div className="road-step" key={item}><div className="step-dot">{index + 1}</div><span>{item}</span></div>)}</div><a className="btn" href="#quiz">Get My Free Roadmap</a></div></section>


        <section className="section" id="proof"><div className="container"><div className="section-head"><span className="eyebrow">The Core Problem</span><h2>Most Traders Don&apos;t Have a Funding Problem.<br/><span className="accent">They Have a Process Problem.</span></h2><p className="lead">The roadmap connects the critical stages into one structured process instead of treating each problem separately.</p></div><div className="cards">{problems.map(([num, title, copy]) => <article className="card" key={num}><div className="num">{num}</div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>


        <section className="section tinted" id="learn"><div className="container"><div className="section-head center"><span className="eyebrow">Free Training</span><h2>What You&apos;ll <span className="accent">Learn</span></h2></div><div className="learn-grid">{lessons.map(([num, title, copy]) => <article className="learn-card" key={num}><span className="micro">{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>


        <section className="section" id="dan"><div className="container authority"><div className="dan-visual"><div className="portrait-mark">DC</div><div className="dan-copy"><span className="micro">THE PERSON BEHIND THE PROCESS</span><strong>Dan Cheung</strong><span className="muted">Trader, coach and founder of WChampFX.</span></div></div><div><span className="eyebrow">Built from experience</span><h2>Structure beats <span className="accent">noise.</span></h2><p className="lead">Dan built WChampFX for traders who want a repeatable path through the prop funding journey — not another collection of disconnected strategies.</p><div className="stat-list"><div className="stat"><b>$500K+</b><span>verified payouts*</span></div><div className="stat"><b>347+</b><span>students inside WChampFX</span></div><div className="stat"><b>1 process</b><span>from strategy to scale</span></div><div className="stat"><b>100%</b><span>free roadmap access</span></div></div><a className="btn" href="#quiz">Get the framework</a></div></div></section>


        <section className="section tinted"><div className="container"><div className="section-head center"><span className="eyebrow">Student perspective</span><h2>Less noise. <span className="accent">More process.</span></h2></div><div className="testimonials">{testimonials.map(([quote, name]) => <article className="quote" key={quote}><div className="stars">★★★★★</div><p>{quote}</p><small>{name}</small></article>)}</div></div></section>


        <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Choose your next step</span><h2>Where are you in the <span className="accent">journey?</span></h2><p className="lead">Start with the section that sounds most like your current challenge. The roadmap will help you connect the dots.</p></div><div className="journey-grid">{[['I am still building my strategy','I need a repeatable foundation before I think about funding.'],['I am preparing for an evaluation','I want a clear process for passing without forcing trades.'],['I have a funded account','I want to preserve, get paid and scale with control.']].map(([title, copy]) => <a className="journey" key={title} href="#quiz"><h3>{title}</h3><p>{copy}</p></a>)}</div></div></section>


        <section className="section-sm"><div className="container case"><div className="roman"><div><span className="micro">A SIMPLE CASE STUDY</span><h2>From scattered trades to a <span className="accent">scalable process.</span></h2></div></div><div><span className="eyebrow">The WChampFX approach</span><p className="lead">A funded account is not the finish line. It is the point where your process has to become even more consistent.</p><div className="case-stats"><div className="case-stat"><b>Strategy</b><span>one measurable edge</span></div><div className="case-stat"><b>Risk</b><span>aligned to the stage</span></div><div className="case-stat"><b>Rules</b><span>simple enough to follow</span></div><div className="case-stat"><b>Scale</b><span>earned, not forced</span></div></div><a className="btn" href="#quiz">See the roadmap</a></div></div></section>


        <section className="section"><div className="container"><div className="section-head center"><span className="eyebrow">Your next move</span><h2>Start with one <span className="accent">clear step.</span></h2></div><div className="steps">{[['01','Get the roadmap','Enter your details and receive the free training.'],['02','Find your stage','Use the framework to see what needs attention now.'],['03','Build your process','Apply the sequence instead of chasing the next shortcut.'],['04','Scale with control','Move forward when your execution earns it.']].map(([kicker,title,copy]) => <article className="next-step" key={kicker}><span className="kicker">{kicker}</span><h3>{title}</h3><p className="muted">{copy}</p></article>)}</div></div></section>


        <section className="section-sm"><div className="container final"><div><span className="eyebrow">Your roadmap is free</span><h2>Stop guessing what to <span className="accent">fix next.</span></h2><p className="lead">Get the WChampFX $1M Prop Funding Roadmap and see the full process in one place.</p></div><a className="btn" href="#quiz">GET THE FREE ROADMAP →</a></div></section>
      </main>
      <footer><div className="container footer-top"><div><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><p className="micro footer-copy">A structured path for serious prop traders.</p></div><div className="footer-links"><a href="#proof">Results</a><a href="#dan">About Dan</a><a href="#learn">Free Training</a><a href="#top">Privacy</a></div></div><div className="container disclaimer">*All results and payout references are illustrative and not a guarantee of future performance. Trading and prop firm evaluations involve significant risk. Educational content only.</div></footer>
      <div className="mobile-sticky"><a className="btn" href="#quiz">GET FREE ROADMAP</a></div>
    </>
  )
}


}
