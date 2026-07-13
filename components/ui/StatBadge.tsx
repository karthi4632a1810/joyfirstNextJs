export default function StatBadge({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  const styles =
    tone === "dark"
      ? "border-bronze-light/40 text-bronze-light"
      : "border-bronze/40 text-bronze-deep";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
      {label}
    </span>
  );
}
