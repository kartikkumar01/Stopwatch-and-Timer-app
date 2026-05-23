import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--chip-bg)] text-[var(--text-secondary)] ring-1 ring-[var(--chip-ring)] transition-all duration-300 hover:bg-[var(--chip-hover)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] sm:h-11 sm:w-11"
    >
      <span
        className={[
          "absolute text-lg transition-all duration-500",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        ].join(" ")}
        aria-hidden
      >
        ☀️
      </span>
      <span
        className={[
          "absolute text-lg transition-all duration-500",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        ].join(" ")}
        aria-hidden
      >
        🌙
      </span>
      <span className="sr-only">
        {isDark ? "Light" : "Dark"} mode (currently {theme})
      </span>
    </button>
  );
}
