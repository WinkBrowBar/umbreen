/** Shows the image when `src` is set, otherwise a labelled placeholder box (same size). */
export function Img({ src, alt, label, className = "" }: { src: string | null; alt: string; label?: string; className?: string }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className={className} />;
  return <div className={`ph ${className}`} role="img" aria-label={alt}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></svg>
    <span>{label ?? alt}</span>
  </div>;
}
