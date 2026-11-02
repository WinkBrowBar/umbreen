const portrait = { url: "/images/image.png" };

export function Statement() {
  return <section className="statement" id="journal">
    <div className="statement-text"><h2 className="display">Precision is<br />not decoration.</h2>
      <div className="body"><p>Umbreen built her practice on a simple premise: the eye zone rewards discipline more than trend. Every shape she draws is measured against bone structure, muscle movement, and growth pattern — not a photo pulled from a phone.</p><p>A licensed cosmetologist with a background in Biomedical Sciences from King's College London, she treats brow work as applied anatomy — which is why her method has become a reference point for the industry, not just a service on a menu.</p></div>
      <div className="cred">FEATURED IN VOGUE · ALLURE · THE HOLLYWOOD REPORTER</div>
    </div>
    <figure><img src={portrait.url} alt="Umbreen Sheikh, close portrait" loading="lazy" /></figure>
  </section>;
}
