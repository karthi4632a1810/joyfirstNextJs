export default function Marquee({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <div className="flex shrink-0 gap-12">{children}</div>
        <div aria-hidden className="flex shrink-0 gap-12">
          {children}
        </div>
      </div>
    </div>
  );
}
