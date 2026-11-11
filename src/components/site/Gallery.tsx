const allure1 = { url: "/images/umbreen-04.webp" };
const cosmopolitan1 = { url: "/images/umbreen-05.webp" };
const timeout = { url: "/images/umbreen-06.webp" };
const cosmopolitan2 = { url: "/images/umbreen-07.webp" };
const self = { url: "/images/umbreen-08.webp" };
const wmagazine = { url: "/images/umbreen-09.webp" };
const esquire = { url: "/images/umbreen-10.webp" };
const vogue = { url: "/images/umbreen-11.webp" };
const teenvogue = { url: "/images/umbreen-12.webp" };
const womenshealth1 = { url: "/images/umbreen-13.webp" };
const allure2 = { url: "/images/umbreen-14.webp" };
const womenshealth2 = { url: "/images/umbreen-15.webp" };
const towncountry = { url: "/images/umbreen-16.webp" };
const harpersbazaar = { url: "/images/umbreen-17.webp" };

const gallery = [
  [allure1.url, "Allure"], [cosmopolitan1.url, "Cosmopolitan"],
  [timeout.url, "Time Out New York"], [cosmopolitan2.url, "Cosmopolitan"],
  [self.url, "Self"], [wmagazine.url, "W Magazine"],
  [esquire.url, "Esquire"], [vogue.url, "Vogue Germany"],
  [teenvogue.url, "Teen Vogue"], [womenshealth1.url, "Women's Health"],
  [allure2.url, "Allure"], [womenshealth2.url, "Women's Health"],
  [towncountry.url, "Town & Country"], [harpersbazaar.url, "Harper's Bazaar"],
] as const;

export function Gallery() {
  return <section className="gallery" id="gallery"><div className="gallery-head"><h2 className="display">Her world</h2><p>Studio moments, the product line, and the practice behind the method.</p></div><div className="mosaic">{gallery.map(([src, title], i) => <figure className="mtile" key={i}><img src={src} alt={`${title} feature`} loading="lazy" /><figcaption><span>{title}</span><small>As featured</small></figcaption></figure>)}</div></section>;
}