const roadmap = ['Strategy', 'Risk Management', 'Prop Evaluation', 'Funded Account', 'Preservation', 'Payout Process', 'Scaling', 'Larger Allocation']
const testimonials = [
  ['“The roadmap gave me a process I could actually follow. I stopped trying to force every trade.”', 'WChampFX student'],
  ['“The biggest shift was understanding that passing and preserving are two different games.”', 'WChampFX student'],
  ['“Simple, structured and practical. I finally knew what to focus on next.”', 'WChampFX student'],
]
export default function Page() {
  return (
    <>
      <header className="site-header"><div className="container nav"><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><nav className="nav-links" aria-label="Primary navigation"><a href="#dan">About Dan</a><a className="btn small" href="#quiz">GET FREE ROADMAP</a></nav></div></header>
      <main id="top">
        <section className="vsl-section" aria-labelledby="vsl-title"><div className="container"><div className="vsl-heading"><span className="eyebrow">Free training</span><h2 id="vsl-title">See the framework before you build your roadmap.</h2><p>Watch the training, then answer six quick questions to get your next best step.</p></div><div className="vsl-frame"><iframe src="https://www.youtube.com/embed/wIssK9Kqums?autoplay=1&mute=1&controls=1&playsinline=1&rel=0" title="WChampFX free training video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div></div></section>
        <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">Free WChampFX Training</span><h1>The <span>$1M Prop Funding Roadmap</span></h1><p className="lead">See the framework Dan Cheung uses to structure strategy, risk, funded accounts and account progression.</p><div className="proof-row"><span className="proof-pill">$500K+ verified payouts*</span><span className="proof-pill">Prop firm leaderboard trader</span><span className="proof-pill">347+ WChampFX students</span></div></div><div className="hero-training-card" id="quiz"><div className="media-placeholder"><div className="media-label"><span className="micro">FEATURED TRAINING</span><strong>Dan Cheung</strong></div><div className="play" aria-hidden="true">▶</div></div><iframe className="typeform-embed" src="https://form.typeform.com/to/kteHRTTw" title="WChampFX Quiz" allowFullScreen /></div></div></section>




        <section className="section-sm"><div className="container roadmap-wrap center"><span className="eyebrow">Roadmap Preview</span><h2>Inside The <span className="accent">$1M Funding Roadmap</span></h2><div className="roadmap">{roadmap.map((item, index) => <div className="road-step" key={item}><div className="step-dot">{index + 1}</div><span>{item}</span></div>)}</div><a className="btn" href="#quiz">Get My Free Roadmap</a></div></section>
<section className="section" id="dan"><div className="container authority"><div className="dan-visual"><div className="portrait-mark">DC</div><div className="dan-copy"><span className="micro">THE PERSON BEHIND THE PROCESS</span><strong>Dan Cheung</strong><span className="muted">Trader, coach and founder of WChampFX.</span></div></div><div><span className="eyebrow">Built from experience</span><h2>Structure beats <span className="accent">noise.</span></h2><p className="lead">Dan built WChampFX for traders who want a repeatable path through the prop funding journey — not another collection of disconnected strategies.</p><div className="stat-list"><div className="stat"><b>$500K+</b><span>verified payouts*</span></div><div className="stat"><b>347+</b><span>students inside WChampFX</span></div><div className="stat"><b>1 process</b><span>from strategy to scale</span></div><div className="stat"><b>100%</b><span>free roadmap access</span></div></div><a className="btn" href="#quiz">Get the framework</a></div></div></section>




        <section className="section tinted"><div className="container"><div className="section-head center"><span className="eyebrow">Student perspective</span><h2>Less noise. <span className="accent">More process.</span></h2></div><div className="testimonials">{testimonials.map(([quote, name]) => <article className="quote" key={quote}><div className="stars">★★★★★</div><p>{quote}</p><small>{name}</small></article>)}</div></div></section>
<section className="section-sm"><div className="container case"><div className="roman"><div><span className="micro">A SIMPLE CASE STUDY</span><h2>From scattered trades to a <span className="accent">scalable process.</span></h2></div></div><div><span className="eyebrow">The WChampFX approach</span><p className="lead">A funded account is not the finish line. It is the point where your process has to become even more consistent.</p><div className="case-stats"><div className="case-stat"><b>Strategy</b><span>one measurable edge</span></div><div className="case-stat"><b>Risk</b><span>aligned to the stage</span></div><div className="case-stat"><b>Rules</b><span>simple enough to follow</span></div><div className="case-stat"><b>Scale</b><span>earned, not forced</span></div></div><a className="btn" href="#quiz">See the roadmap</a></div></div></section>
</main>
      <footer><div className="container footer-top"><div><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><p className="micro footer-copy">A structured path for serious prop traders.</p></div><div className="footer-links"><a href="#dan">About Dan</a><a href="#top">Privacy</a></div></div><div className="container disclaimer">*All results and payout references are illustrative and not a guarantee of future performance. Trading and prop firm evaluations involve significant risk. Educational content only.</div></footer>
      <div className="mobile-sticky"><a className="btn" href="#quiz">GET FREE ROADMAP</a></div>
    </>
  )
}





