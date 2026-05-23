const variants = {
  primary:
    "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 hover:shadow-indigo-400/40 active:scale-[0.97] dark:shadow-indigo-500/30",
  secondary:
    "bg-slate-900/5 text-slate-800 ring-1 ring-slate-900/10 hover:bg-slate-900/10 dark:bg-white/8 dark:text-white/90 dark:ring-white/10 dark:hover:bg-white/12 dark:hover:ring-white/20 active:scale-[0.97]",
  danger:
    "bg-rose-500/12 text-rose-600 ring-1 ring-rose-500/25 hover:bg-rose-500/20 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-500/30 dark:hover:bg-rose-500/25 dark:hover:text-rose-200 active:scale-[0.97]",
  ghost:
    "text-slate-500 hover:bg-slate-900/5 hover:text-slate-800 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80 active:scale-[0.97]",
  accent:
    "bg-cyan-500/15 text-cyan-700 ring-1 ring-cyan-500/25 hover:bg-cyan-500/25 dark:bg-cyan-500/20 dark:text-cyan-300 dark:ring-cyan-500/30 dark:hover:bg-cyan-500/30 active:scale-[0.97]",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-xl sm:px-5",
  lg: "px-5 py-2.5 text-sm font-semibold rounded-xl sm:px-6 sm:py-3",
};

export default function Button({
  name,
  onClick,
  variant = "secondary",
  size = "md",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--focus-offset)]",
        "disabled:pointer-events-none disabled:scale-100 disabled:opacity-40",
        variants[variant] ?? variants.secondary,
        sizes[size] ?? sizes.md,
        className,
      ].join(" ")}
    >
      {name}
    </button>
  );
}
