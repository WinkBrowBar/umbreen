/**
 * Homepage images. Every slot set to null renders a labelled placeholder.
 * To add a photo: drop the file in /public/images/home/ and set the path, e.g.
 *   heroFull: "/images/home/hero-full-length.jpg",
 */
export const homeImages = {
  heroFull: "/images/umbreen-01.jpeg" as string | null,          // Full-length editorial image of Umbreen
  about: "/images/umbreen-02.png" as string | null,              // Umbreen portrait (about section)
  serviceThreading: null as string | null,                       // Signature brow threading
  serviceWax: null as string | null,                             // Brow wax
  serviceLamination: null as string | null,                      // Brow lamination
  alyssaMilano: null as string | null,
  gloriaSteinem: null as string | null,
  elaineWelteroth: null as string | null,
  aprilLong: null as string | null,
  christeneBarberich: null as string | null,
  dianeVonFurstenberg: null as string | null,
  ventureWink: "https://embrowerment-website-videos.s3.eu-north-1.amazonaws.com/Image_20261002_161214+(1).jpg" as string | null,    ventureEmbrowerment: null as string | null,                    // Embrowerment® education / products
  ventureFoundation: null as string | null,                      // Embrowerment Foundation
  ventureEzpa: null as string | null,                            // EZPA
  instagram: [null, null, null, null, null, null] as (string | null)[], // 6 Instagram posts
  nycStudio: null as string | null,                              // Umbreen in her NYC studio
};
