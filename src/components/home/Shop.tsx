import { SHOP_SERUM_URL } from "@/lib/links";
import { homeImages } from "./images";
import { Img } from "./Placeholder";

/* Edit the product copy here */
const product = {
  kicker: "The Umbreen Collection",
  name: "Pure Hyaluronic Serum",
  price: "$130",
  intro: "Elevate your skincare routine with the Pure Hyaluronic Serum: deep hydration that supports skin renewal and softens the look of fine lines and wrinkles.",
  details: [["Size", "30 ML | 1 FL OZ"]],
  cta: "Shop Now",
};

export function Shop() {
  const external = SHOP_SERUM_URL.startsWith("http");
  return <section className="v2-shop" id="shop" aria-labelledby="shop-title">
    <figure className="v2-shop-media"><Img src={homeImages.productSerum} alt={`${product.name}, 30 ml dropper bottle`} label="Product photo" /></figure>
    <div className="v2-shop-text">
      <span className="v2-kicker">{product.kicker}</span>
      <h2 id="shop-title">{product.name}</h2>
      <p className="v2-shop-price">{product.price}</p>
      <p>{product.intro}</p>
      <dl className="v2-shop-details">{product.details.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <a href={SHOP_SERUM_URL} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="v2-btn">{product.cta} <span aria-hidden="true">→</span></a>
    </div>
  </section>;
}
