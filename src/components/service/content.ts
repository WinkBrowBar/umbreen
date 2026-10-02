import type { ServiceContent } from "./types";

export const threading: ServiceContent = {
  slug: "signature-brow-threading",
  meta: {
    title: "Professional Eyebrow Threading Service in NYC | Umbreen",
    description: "Get eyebrow threading in NYC from an expert brow artist with brow mapping and shaping based on your natural features, plus a complimentary fill-in.",
    keyword: "eyebrow threading service",
  },
  hero: {
    kicker: "Signature Service · New York City",
    title: "Eyebrow Threading Service in NYC",
    lead: "Precise eyebrow threading service with brow mapping built around your natural features, performed by Umbreen, a licensed cosmetologist and brow artist with over a decade of experience in the salon industry.",
    note: "Every appointment includes a consultation, custom brow mapping, threading, and a complimentary fill.",
    image: null, // TODO: add photo, e.g. "/images/services/threading.jpg"
    imageLabel: "Signature brow threading image",
  },
  intro: [
    { title: "Why Threading Works for Brows", body: [
      "Threading is a centuries-old technique. A twisted cotton thread lifts hair out at the follicle, row by row, for a clean, defined shape with no chemicals on the skin. Waxing lifts a layer of skin along with the hair. Threading removes only the hair.",
      "The thread gives precise control around the brows, removing individual hairs and cleaning up small areas without disturbing the surrounding hair. That makes it especially useful for defining the brow line while keeping the shape intact.",
    ] },
    { title: "The Umbreen Approach to Professional Eyebrow Threading", body: [
      "Umbreen sources a special organic certified cotton thread. Its natural fibers pull hair gently at the root and ease the discomfort common to other threads.",
      "Every session opens with a consultation and custom brow mapping, so the shape reflects your own bone structure, not a template. The service runs through the Embrowerment® Method, Umbreen's approach to precision threading, facial harmony, and natural-looking results.",
    ] },
  ],
  steps: {
    kicker: "What's Included",
    title: "What's Included in Your Eyebrow Threading Service",
    items: [
      ["Consultation", "A discussion of your current brows, desired shape, and maintenance goals."],
      ["Brow Mapping", "Your brows are mapped in relation to your bone structure and facial features."],
      ["Signature Threading", "Cotton thread removes unwanted hair at the root with controlled precision."],
      ["Brow Shaping", "The shape is refined while preserving the natural character of your brows."],
      ["Complimentary Fill-In", "A follow-up fill-in with clean brow product is included to maintain your shape."],
    ],
  },
  pricing: {
    title: "Eyebrow Threading Price",
    items: [
      { name: "Signature Embrowerment® Thread", price: "$88", desc: "Your appointment includes professional brow threading using Umbreen's signature Embrowerment® approach." },
    ],
    offer: {
      kicker: "New Client Offer",
      title: "First Brow Shaping for $35",
      lines: ["Available exclusively at the 244 E 60th Street location in Manhattan for a limited time.", "New clients only. Mention the offer when booking."],
    },
  },
  who: {
    title: "Who is Eyebrow Threading For?",
    intro: "A professional eyebrow threading service can work well for clients who want to:",
    items: ["Define an existing brow shape", "Clean up unwanted growth", "Maintain their regular brow shape", "Correct uneven or overgrown brows", "Grow out over-plucked brows", "Avoid waxing around the brows"],
  },
  aftercare: {
    title: "Post-Threading Care for Your Brows",
    items: [
      "Avoid makeup, retinol, or exfoliating products on the brow area for 24 hours.",
      "Skip direct sun exposure and saunas the day of your appointment, since skin is slightly more sensitive right after threading.",
      "Book your next visit every two to three weeks. A regular cycle trains the brow and holds its shape longer.",
    ],
  },
  crossLink: { text: "If you're looking to lift and set your existing brow hairs rather than reshape them, explore Umbreen's", label: "eyebrow lamination service", to: "/service/eyebrow-lamination" },
  cta: {
    title: "Book an Appointment With an Eyebrow Threading Expert in NYC",
    body: "Schedule your appointment with Umbreen at Wink Brow Bar, her threading salon in NYC, with three convenient locations across the city.",
  },
  faqs: [
    ["Where can I get eyebrow threading in NYC with Umbreen?", "At Wink Brow Bar, with studios in the West Village, Cobble Hill, and the Upper East Side. Every technician is certified in the Embrowerment® Method."],
    ["How long does eyebrow threading take?", "About 15 minutes for a signature threading service, plus a short consultation and brow mapping beforehand."],
    ["Is eyebrow threading better than waxing?", "Threading is gentler on skin and follicles than waxing and reaches individual rows of hair that waxing can miss. Many clients who find waxing painful prefer threading instead."],
    ["Why is threading considered more hygienic than other hair removal methods?", "Threading uses a single length of cotton thread for each client, with nothing dipped, reused, or applied directly to the skin the way wax is. That lowers the risk of cross-contamination and product buildup."],
    ["Is eyebrow threading safe for sensitive or acne-prone skin?", "Yes. Because threading uses no wax, adhesives, or chemicals, and nothing adheres to the skin's surface, it's generally considered one of the gentler options for sensitive or acne-prone skin. Your brow artist can always tailor the approach during your consultation."],
  ],
};

export const lamination: ServiceContent = {
  slug: "eyebrow-lamination",
  meta: {
    title: "Eyebrow Lamination in NYC for Polished Brows | Umbreen",
    description: "Get eyebrow lamination in NYC by Umbreen, with a keratin-infused treatment designed to lift, shape, and condition brows for a defined look. Book now",
    keyword: "eyebrow lamination",
  },
  hero: {
    kicker: "Brow Treatment · New York City",
    title: "Eyebrow Lamination in NYC",
    lead: "Keratin eyebrow lamination that lifts, sets, and conditions your brows for a fuller, bolder shape, performed by Umbreen, a licensed cosmetologist and brow artist.",
    note: "A 3-step treatment that lasts 6 to 8 weeks with proper aftercare. Add a tint and shape for a fully polished result.",
    image: null, // TODO: add photo, e.g. "/images/services/lamination.jpg"
    imageLabel: "Eyebrow lamination image",
  },
  intro: [
    { title: "What Brow Lamination Does for Your Eyebrows", body: [
      "Brow lamination is a keratin treatment that lifts, sets, and conditions the brow hairs. The hairs are brushed into a fuller, more defined direction, then set in place, creating a defined shape that typically lasts 6–8 weeks with proper aftercare.",
      "It can make sparse or uneven brows appear denser by bringing existing hairs together, while coarse, unruly, or downward-growing hairs are guided into a more consistent direction. The result is a more consistent brow shape that stays styled without constant touch-ups.",
    ] },
    { title: "Keratin Brow Lamination by Umbreen", body: [
      "Umbreen's keratin brow lamination lifts and sets the existing brow hairs while keeping their natural texture and character at the center of the treatment. The finish is polished and defined, without forcing every brow into the same shape.",
      "With over a decade of salon experience, Umbreen begins each appointment with an assessment of your natural brow growth, proportions, and bone structure. Guided by the Embrowerment® Method, she shapes the direction of the hairs to complement your features rather than applying a uniform upward lift.",
    ] },
  ],
  steps: {
    kicker: "The Process",
    title: "The Eyebrow Lamination Process",
    items: [
      ["Consultation", "To assess your natural brow growth, hair direction, and facial structure."],
      ["Lift", "A lifting solution softens the brow hairs so they can be repositioned."],
      ["Set", "The hairs are brushed into their desired direction and set into place."],
      ["Condition", "A conditioning step finishes the treatment, leaving the brows groomed and defined."],
      ["Tint + Shape", "Add a classic tint to enhance definition, along with signature brow shaping."],
    ],
  },
  pricing: {
    title: "Brow Lamination Pricing",
    intro: "Choose the lamination treatment that fits the finish you want.",
    items: [
      { name: "Keratin Brow Lamination", price: "$100", desc: "A three-step keratin treatment to lift, set, and condition your natural brow hairs for a polished, defined look." },
      { name: "Keratin Brow Lamination + Classic Tint + Shape", price: "$150", desc: "Add classic tint and signature brow shaping to your lamination for added definition and a more refined, face-framing finish.", tag: "Complete finish" },
    ],
  },
  who: {
    title: "Who Should Get Brow Lamination",
    intro: "Brow lamination works well if you want to:",
    items: ["Fill in sparse or thin brows", "Smooth coarse or wiry hair", "Redirect downward or uneven growth", "Cut down on daily brow styling"],
  },
  aftercare: {
    title: "Eyebrow Lamination Aftercare",
    items: [
      "Keep it dry for 24 hours. No washing, steam, or heavy sweating.",
      "Skip brow makeup for a day to give the treatment time to fully set.",
      "Use a clean spoolie each morning. Avoid over-brushing the hairs.",
      "Wait 24 to 48 hours before applying brow oils or serums.",
      "Rebook in 6 to 8 weeks to keep the shape consistent.",
    ],
  },
  crossLink: { text: "If you prefer just a defined shape without changing the direction of your brow hairs, explore Umbreen's", label: "signature eyebrow threading service", to: "/service/signature-brow-threading" },
  cta: {
    title: "Book Your Eyebrow Lamination in NYC",
    body: "Every lamination appointment happens at Wink Brow Bar, Umbreen's home for brow artistry in NYC since 2014. Get the best brow lamination in NYC here!",
  },
  faqs: [
    ["Is eyebrow lamination safe for sensitive skin?", "In most cases, yes. As with any chemical treatment, mention sensitivities, allergies, or pregnancy during your consultation. A patch test beforehand is a simple way to rule out a reaction."],
    ["How long does brow lamination last?", "Six to eight weeks with proper aftercare. Results fade gradually as new hair grows in, so most clients rebook within that window."],
    ["What are the specific chemical ingredients found in brow lamination perming solutions?", "Lamination solutions typically use a gentle perming lotion to soften the hair's internal bonds, followed by a neutralizing step and a keratin-based conditioning treatment. Exact formulations vary by product line, so ask your technician about the specific solution used during your consultation."],
    ["How long do you have to wait to get your eyebrows wet after lamination?", "About 24 hours. Water, steam, and heavy sweating during that window can loosen the set before it fully takes hold."],
    ["How long does a brow lamination appointment take?", "Around 30 to 45 minutes for lamination alone, closer to an hour with the Tint and Shape add-on."],
  ],
};