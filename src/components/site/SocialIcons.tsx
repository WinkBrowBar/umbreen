import { INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL, FACEBOOK_URL } from "@/lib/links";

export const icons = {
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2.5" /><path d="M7.5 10.5v6M7.5 7.6v.1M11 16.5v-3.4c0-1.5.9-2.6 2.3-2.6s2.2 1 2.2 2.6v3.4M11 10.5v6" /></>,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" /></>,
  facebook: <path d="M14 8.5h2.5V5H14c-2.2 0-3.5 1.4-3.5 3.6V11H8v3.4h2.5V21h3.4v-6.6h2.5l.5-3.4h-3V9.2c0-.5.3-.7.6-.7z" fill="currentColor" stroke="none" />,
  x: <path d="M4 4l16 16M20 4L4 20" />,
  pinterest: <><circle cx="12" cy="12" r="9" /><path d="M11 9.5c2.8-1 4.6.6 4.2 2.8-.4 2-2.2 3-3.6 2.2M11.6 10.6 9.5 20" /></>,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export const socials = [
  { key: "instagram", label: "Instagram", href: INSTAGRAM_URL },
  { key: "linkedin", label: "LinkedIn", href: LINKEDIN_URL },
  { key: "youtube", label: "YouTube", href: YOUTUBE_URL },
  { key: "facebook", label: "Facebook", href: FACEBOOK_URL },
] as const;

export function SocialIcon({ name }: { name: keyof typeof icons }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">{icons[name]}</svg>;
}