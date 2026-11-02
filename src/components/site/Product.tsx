import { Button } from "@/components/ui/button";
const serum = { url: "/images/umbreen-18.jpeg" };

export function Product() {
  return <section className="product"><div className="product-text"><h2 className="display">Pure Hyaluronic Serum</h2><p className="serif">Formulated for the skin around the eye — the area most brow and lash work overlooks. Lightweight, fast-absorbing, built to support the zone she's spent a career studying.</p><Button asChild variant="editorial"><a href="#" id="shop">Shop the serum</a></Button></div><div className="panel"><img src={serum.url} alt="Umbreen Pure Hyaluronic Serum, 30ml" loading="lazy" /></div></section>;
}
