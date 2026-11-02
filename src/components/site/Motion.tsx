import { useRef, useState } from "react";

const video = "https://d3l8853brrvrt.cloudfront.net/EZJ-EyeSketch-2188913388.mp4";

export function Motion() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return <section className="motion motion--video"><div className="motion-frame">
    <video ref={ref} src={video} autoPlay muted loop playsInline preload="auto" aria-label="Umbreen Sheikh eye sketch — the method, filmed" />
    <div className="motion-tag">THE METHOD, FILMED</div>
    <div className="motion-caption"><div><h3 className="serif">Inside a real session</h3><p>FULL WALKTHROUGH ON YOUTUBE · 04:12</p></div>
      <button type="button" className="play-btn" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}>
        {playing
          ? <svg fill="currentColor" viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
          : <svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
      </button>
    </div>
  </div></section>;
}