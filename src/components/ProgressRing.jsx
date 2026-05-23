export default function ProgressRing({
  progress = 1,
  color = "#22d3ee",
  trackColor = "var(--ring-track)",
}) {
  const r = 47;
  const stroke = 4;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 size-full -rotate-90"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={trackColor}
        strokeWidth={stroke}
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-[stroke-dashoffset] duration-150 ease-linear"
        style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
      />
    </svg>
  );
}
