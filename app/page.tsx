const roadmap = ['Strategy', 'Risk Management', 'Prop Evaluation', 'Funded Account', 'Preservation', 'Payout Process', 'Scaling', 'Larger Allocation']
export default function Page() {
  return (
    <>
      <header className="site-header"><div className="container nav"><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><nav className="nav-links" aria-label="Primary navigation"><a className="btn small" href="#quiz">GET FREE ROADMAP</a></nav></div></header>
      <main id="top">
        <section className="vsl-section" aria-labelledby="vsl-title"><div className="container"><div className="vsl-heading"><span className="eyebrow">Free training</span><h2 id="vsl-title">See the framework before you build your roadmap.</h2><p>Watch the training, then answer six quick questions to get your next best step.</p></div><div className="vsl-frame"><iframe src="https://www.youtube.com/embed/wIssK9Kqums?autoplay=1&mute=1&controls=1&playsinline=1&rel=0" title="WChampFX free training video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div></div></section>
        <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">Free WChampFX Training</span><h1>The <span>$1M Prop Funding Roadmap</span></h1><p className="lead">See the framework Dan Cheung uses to structure strategy, risk, funded accounts and account progression.</p><div className="proof-row"><span className="proof-pill">$500K+ verified payouts*</span><span className="proof-pill">Prop firm leaderboard trader</span><span className="proof-pill">347+ WChampFX students</span></div></div><div className="hero-training-card" id="quiz"><div className="media-placeholder"><div className="media-label"><span className="micro">FEATURED TRAINING</span><strong>Dan Cheung</strong></div><div className="play" aria-hidden="true">▶</div></div><iframe className="typeform-embed" src="https://form.typeform.com/to/kteHRTTw" title="WChampFX Quiz" allowFullScreen /></div></div></section>








        <section className="section-sm"><div className="container roadmap-wrap center"><span className="eyebrow">Roadmap Preview</span><h2>Inside The <span className="accent">$1M Funding Roadmap</span></h2><div className="roadmap">{roadmap.map((item, index) => <div className="road-step" key={item}><div className="step-dot">{index + 1}</div><span>{item}</span></div>)}</div><a className="btn" href="#quiz">Get My Free Roadmap</a></div></section>








        
</main>
      <footer><div className="container footer-top"><div><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><p className="micro footer-copy">A structured path for serious prop traders.</p></div><div className="footer-links"><a href="#top">Privacy</a></div></div><div className="container disclaimer">*All results and payout references are illustrative and not a guarantee of future performance. Trading and prop firm evaluations involve significant risk. Educational content only.</div></footer>
      <div className="mobile-sticky"><a className="btn" href="#quiz">GET FREE ROADMAP</a></div>
    </>
  )
}











