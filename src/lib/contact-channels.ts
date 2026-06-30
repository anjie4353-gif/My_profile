import { SITE } from "@/lib/site-config";

export const CONTACT_CHANNELS = [
  { id: "linkedin", label: "LinkedIn", short: "In", href: SITE.social.linkedin, external: true },
  { id: "naukri", label: "Naukri", short: "Nk", href: SITE.social.naukri, external: true },
  { id: "email", label: "Email", short: "Mail", href: `mailto:${SITE.email}`, external: false },
  { id: "medium", label: "Medium", short: "Md", href: SITE.social.medium, external: true },
  { id: "call", label: "Call", short: "Call", href: `tel:${SITE.phone.tel}`, external: false },
  { id: "whatsapp", label: "WhatsApp", short: "WA", href: SITE.phone.whatsapp, external: true },
  { id: "github", label: "GitHub", short: "GH", href: SITE.social.github, external: true },
] as const;