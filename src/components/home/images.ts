/**
 * ALL editable site images in one place.
 * Images marked "Unsplash" are free stock stand-ins (Unsplash License: free for commercial use, no attribution required).
 * Replace them with Umbreen's own photos when available.
 * Every slot set to null shows a labelled placeholder.
 * To add a photo: drop the file in /public/images/home/ (or use a full https:// link) and set the path, e.g.
 *   heroFull: "/images/home/hero-full-length.jpg",
 */
export const homeImages = {
  /* ---------- Homepage: hero + expertise ---------- */
  heroFull: "/images/umbreen-01.jpeg" as string | null,          // Hero — full-length editorial image of Umbreen
  about: "/images/umbreen-02.png" as string | null,              // Expertise section — portrait of Umbreen

  /* ---------- Homepage: "Brow artistry, individually considered" service cards ---------- */
  // serviceThreading: "https://images.unsplash.com/photo-1790244342917-b08f24662dde?auto=format&fit=crop&w=900&q=70" as string | null,  // Unsplash · Rosalie Gdy                       // Card: Signature Brow Threading
  // serviceWax: "https://images.unsplash.com/photo-1783013951101-2d9ed3eac234?auto=format&fit=crop&w=900&q=70" as string | null,  // Unsplash · melvin Ankrah                             // Card: Brow Wax
  serviceThreading: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?auto=format&fit=crop&w=900&q=70" as string | null,  // Unsplash · Rune Enstad (threading close-up)   // Card: Signature Brow Threading
  // serviceWax: "https://images.unsplash.com/photo-1783013951101-2d9ed3eac234?auto=format&fit=crop&w=900&q=70" as string | null,  // Unsplash · Klara Kulikova (brow close-up)   // Card: Brow Wax
    serviceWax: "https://media.istockphoto.com/id/1219595414/photo/beautician-applying-wax-with-wooden-spatula-above-womans-eyebrow-stock-photo.jpg?s=612x612&w=0&k=20&c=Td1tbdhQ-VGHMoAdCu0vdoK7XYcOwNtYH377FOUO_Ro=" as string | null,  // Card: Brow Wax
  serviceLamination: "https://images.unsplash.com/photo-1581003250898-36050e78fcd3?auto=format&fit=crop&w=900&q=70" as string | null,  // Unsplash · Le Petit (same as lamination page)   // Card: Brow Lamination                  // Card: Brow Lamination

  /* ---------- Homepage: "In Good Company" portraits ---------- */
  alyssaMilano: null as string | null,
  gloriaSteinem: null as string | null,
  elaineWelteroth: null as string | null,
  aprilLong: null as string | null,
  christeneBarberich: null as string | null,
  dianeVonFurstenberg: null as string | null,

  /* ---------- Homepage: Ventures ---------- */
  ventureWink: "https://embrowerment-website-videos.s3.eu-north-1.amazonaws.com/Screenshot+2026-10-04+at+9.36.01%E2%80%AFPM.png" as string | null,          // Wink Brow Bar
  ventureEmbrowerment: "https://embrowerment-website-videos.s3.eu-north-1.amazonaws.com/Screenshot+2026-10-04+at+9.24.48%E2%80%AFPM.png" as string | null,  // Embrowerment®
  ventureFoundation: "https://embrowerment-website-videos.s3.eu-north-1.amazonaws.com/Screenshot+2026-10-04+at+9.23.39%E2%80%AFPM.png" as string | null,    // Embrowerment Foundation
  ventureEzpa: "https://images.unsplash.com/photo-1554881070-b818fe59eff3?auto=format&fit=crop&w=1200&q=70" as string | null,  // Unsplash · Raden Prasetya                                                                                                                          // EZPA

  /* ---------- Homepage: Instagram grid + Find Umbreen ---------- */
  instagram: [
    "https://images.unsplash.com/photo-1587910234573-d6fc84743bc8?auto=format&fit=crop&w=600&q=70",
    "https://images.unsplash.com/photo-1622336889416-8d790ad807d7?auto=format&fit=crop&w=600&q=70",
    "https://images.unsplash.com/photo-1595550912256-b24059bb08e8?auto=format&fit=crop&w=600&q=70",
    "https://images.unsplash.com/photo-1586782002395-4b748cf6e71d?auto=format&fit=crop&w=600&q=70",
    "https://images.unsplash.com/photo-1565113521364-cb12a3ec0f28?auto=format&fit=crop&w=600&q=70",
    "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=600&q=70",
  ] as (string | null)[],  // Unsplash stand-ins — replace with real @thisisumbreen posts // 6 Instagram posts
  // nycStudio: "https://images.unsplash.com/photo-1626383137804-ff908d2753a2?auto=format&fit=crop&w=1400&q=70" as string | null,  // Unsplash · Giorgio Trovato                              // "Find Umbreen in New York City" photo
  nycStudio: "https://embrowerment-website-videos.s3.eu-north-1.amazonaws.com/Image_20261002_161214+(1).jpg" as string | null,

  /* ---------- Service pages (top photo on each) ---------- */
  pageThreading: "https://images.unsplash.com/photo-1733145820333-6fa6ed6f8f5d?auto=format&fit=crop&w=1400&q=70" as string | null,  // Unsplash · Alexander Mass                          // /service/signature-brow-threading
  pageLamination: "https://images.unsplash.com/photo-1581003250898-36050e78fcd3?auto=format&fit=crop&w=1400&q=70" as string | null,  // Unsplash · Le Petit                         // /service/eyebrow-lamination
};

  // ventureWink: "https://embrowerment-website-videos.s3.eu-north-1.amazonaws.com/Image_20261002_161214+(1).jpg" as string | null,    
