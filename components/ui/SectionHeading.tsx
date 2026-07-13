import RevealText from "./RevealText";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const eyebrowColor = tone === "dark" ? "text-bronze-light" : "text-bronze-deep";
  const descColor = tone === "dark" ? "text-ink-foreground/70" : "text-charcoal-soft";

  return (
    <div className={`flex max-w-3xl flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <span className={`text-xs uppercase tracking-[0.3em] ${eyebrowColor}`}>{eyebrow}</span>
      )}
      <RevealText as="h2" className="font-serif-display mt-6 text-4xl leading-[1.1] md:text-6xl">
        {heading}
      </RevealText>
      {description && (
        <p className={`mt-6 text-base leading-relaxed md:text-lg ${descColor}`}>{description}</p>
      )}
    </div>
  );
}
