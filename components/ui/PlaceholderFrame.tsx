type PlaceholderFrameProps = {
  label: string;
  aspect?: string;
  tone?: "bronze" | "stone" | "ink";
  className?: string;
};

const tones: Record<string, string> = {
  bronze: "from-bronze/25 via-bronze-deep/10 to-transparent",
  stone: "from-stone/40 via-stone-soft/20 to-transparent",
  ink: "from-ink/70 via-ink-soft/40 to-transparent",
};

/**
 * Correctly-sized slot for real project photography once available.
 * Intentionally not a fake photo — JoyFirst's actual portfolio isn't
 * misrepresented while this placeholder is in place.
 */
export default function PlaceholderFrame({
  label,
  aspect = "aspect-[4/5]",
  tone = "stone",
  className = "",
}: PlaceholderFrameProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for project photography: ${label}`}
      className={`relative overflow-hidden rounded-[2px] border border-charcoal/10 bg-gradient-to-br ${tones[tone]} ${aspect} ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(0,0,0,0.05)_50%,transparent_52%,transparent_100%)]" />
      <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-charcoal-soft/70">
        {label}
      </span>
    </div>
  );
}
