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
      <footer><div className="container footer-top"><div><a className="brand" href="#top" aria-label="WChampFX home"><img src="/logo.svg" alt="WChampFX" /></a><p className="micro footer-copy">A structured path for serious prop traders.</p></div><div className="footer-links"><a href="#top">Privacy</a></div></div><div className="container disclaimer"><strong>Risk Disclaimer</strong><p>Foreign exchange (Forex) trading and participation in proprietary trading evaluation programs involve a high degree of risk and are highly speculative. Currency prices can be extremely volatile, and trading may result in the loss of some or all funds used in connection with trading activities. Forex trading may not be suitable for everyone. You should carefully consider your financial circumstances, experience, and risk tolerance and seek independent financial advice where appropriate.</p><p>WChampFX and Dan Cheung provide educational and informational content only. Nothing presented on this website, within any WChampFX program, training material, video, webinar, community, advertisement, or communication constitutes financial, investment, legal, or tax advice, or a recommendation to buy, sell, or trade any financial instrument.</p><p>No representation, promise, or guarantee is made that any individual will achieve profits, successfully complete a proprietary trading evaluation, receive access to a simulated funded account, receive payouts, or achieve results similar to those shown or discussed. Individual results vary substantially and depend on factors including experience, strategy, market conditions, risk management, discipline, and the rules of any third-party proprietary trading firm.</p><p>Any examples, testimonials, case studies, trading results, account sizes, payouts, or performance figures shown are provided for educational and illustrative purposes only. They should not be interpreted as typical, expected, or guaranteed results. Past performance is not indicative of future results.</p><p>WChampFX is not responsible for the rules, pricing, account conditions, evaluation requirements, payouts, restrictions, or business practices of independent third-party proprietary trading firms referenced or promoted through this website. Users should independently review the terms, risk disclosures, and conditions of any third-party provider before purchasing or participating in an evaluation program.</p><p>Where simulated or hypothetical trading results are presented, they have inherent limitations. Simulated results do not represent actual trading and may not accurately account for factors that affect real-market execution, including liquidity, slippage, spreads, commissions, psychological factors, and changing market conditions. Simulated results may also benefit from hindsight.</p><p><strong>CFTC Rule 4.41 Notice:</strong> Hypothetical or simulated performance results have certain limitations. Unlike an actual performance record, simulated results do not represent actual trading. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.</p><p>By using this website or accessing WChampFX content, you acknowledge that trading involves substantial risk and that no promise or guarantee of profitability, successful evaluation completion, funding, payouts, or financial success has been made by WChampFX, Dan Cheung, or their affiliates.</p><p>Please review the applicable <a href="#top">Terms of Use</a>, <a href="#top">Privacy Policy</a>, <a href="#top">Risk Disclosure</a>, and <a href="#top">Earnings Disclaimer</a> before participating in any program or acting on information provided through this website.</p></div></footer>
      <div className="mobile-sticky"><a className="btn" href="#quiz">GET FREE ROADMAP</a></div>
    </>
  )
}























