const hero = { url: "/images/umbreen-01.jpeg" };
const logo = { url: "/images/umbreen-00.png" };

export function Hero() {
  return <section className="hero">
    <img src={logo.url} alt="" aria-hidden="true" className="hero-sig" />
    <div className="hero-text">
      <svg className="arc" viewBox="0 0 400 200" fill="none" aria-hidden="true"><path d="M20 160 C 90 20, 310 20, 380 160" stroke="currentColor" strokeWidth="2" opacity="0.28" /><path d="M60 170 C 120 60, 280 60, 340 170" stroke="var(--primary)" strokeWidth="2" opacity="0.7" /></svg>
      <div className="hero-kicker">FOUNDER · WINK BROW BAR — CREATOR · EMBROWERMENT®</div>
      <h1 className="display"><span className="hero-first">Umbreen<br /></span>Sheikh</h1>
      <p className="serif">An eye-zone authority redefining brow artistry through method, science, and precision — trained in biomedical science, practiced in a chair.</p>
    </div>
    <div className="hero-photo"><img src={hero.url} alt="Umbreen Sheikh" /></div>
  </section>;
}