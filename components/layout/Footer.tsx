import { Mail, Phone, MapPin } from "lucide-react";
import { company, nav } from "@/lib/content";
import { socialIcons } from "@/components/ui/SocialIcon";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-bronze-light">Get in touch</p>
        <h2 className="font-serif-display mt-6 max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          Let&rsquo;s build your next space, engineered end to end.
        </h2>

        <div className="mt-20 grid gap-16 border-t border-ink-foreground/10 pt-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif-display text-2xl italic">Joy First Interiors</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
              One-stop, ISO-certified interior fit-out, civil, and technical services &mdash;
              Chennai, and across seven states.
            </p>
            <div className="mt-8 flex gap-3">
              {company.socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    data-cursor-hover
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-foreground/20 transition-colors hover:border-bronze hover:text-bronze-light"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-bronze-light">Sitemap</p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-bronze-light">Contact</p>
            <ul className="mt-6 space-y-4 text-sm text-ink-foreground/80">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-bronze" />
                <span>{company.registeredAddress}</span>
              </li>
              {company.phones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-bronze" />
                  <a href={`tel:${p.replace(/\s+/g, "")}`} className="hover:text-ink-foreground">
                    {p}
                  </a>
                </li>
              ))}
              {company.emails.map((e) => (
                <li key={e} className="flex gap-3">
                  <Mail size={16} className="mt-0.5 shrink-0 text-bronze" />
                  <a href={`mailto:${e}`} className="hover:text-ink-foreground">
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink-foreground/10 pt-8 text-xs text-ink-foreground/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Joy First Interiors. All rights reserved.</p>
          <p>{company.certifications.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
