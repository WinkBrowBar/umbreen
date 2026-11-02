import { INSTAGRAM_URL, LINKEDIN_URL, YOUTUBE_URL, FACEBOOK_URL } from "@/lib/links";

export const icons = {
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2.5" /><path d="M7.5 10.5v6M7.5 7.6v.1M11 16.5v-3.4c0-1.5.9-2.6 2.3-2.6s2.2 1 2.2 2.6v3.4M11 10.5v6" /></>,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" /></>,
  facebook: <path d="M14 8.5h2.5V5H14c-2.2 0-3.5 1.4-3.5 3.6V11H8v3.4h2.5V21h3.4v-6.6h2.5l.5-3.4h-3V9.2c0-.5.3-.7.6-.7z" fill="currentColor" stroke="none" />,
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