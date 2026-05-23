function formatParts(ms) {
  const cs = Math.floor((ms % 1000) / 10);
  const sec = Math.floor((ms / 1000) % 60);
  const min = Math.floor((ms / (1000 * 60)) % 60);
  const hr = Math.floor(ms / (1000 * 60 * 60));
  return {
    hr: String(hr).padStart(2, "0"),
    min: String(min).padStart(2, "0"),
    sec: String(sec).padStart(2, "0"),
    cs: String(cs).padStart(2, "0"),
    showHours: hr > 0,
  };
}

export default function TimerDisplay({ timeMs, running = false }) {
  const { hr, min, sec, cs, showHours } = formatParts(timeMs);

  const colonClass = [
    "select-none font-mono font-extralight text-[var(--digit-separator)]",
    running ? "animate-tick" : "",
  ].join(" ");

  return (
    <div className="flex flex-col items-center gap-3" role="timer" aria-live="polite">
      <div className="flex items-baseline justify-center gap-1 sm:gap-1.5">
        {showHours && (
          <>
            <span className="font-mono text-5xl font-semibold tabular-nums tracking-tight text-[var(--digit-primary)] sm:text-6xl">
              {hr}
            </span>
            <span className={`${colonClass} text-4xl sm:text-5xl`}>:</span>
          </>
        )}
        <span className="font-mono text-5xl font-semibold tabular-nums tracking-tight text-[var(--digit-primary)] sm:text-6xl">
          {min}
        </span>
        <span className={`${colonClass} text-4xl sm:text-5xl`}>:</span>
        <span className="font-mono text-5xl font-semibold tabular-nums tracking-tight text-[var(--digit-primary)] sm:text-6xl">
          {sec}
        </span>
        <span className={`${colonClass} mx-0.5 text-3xl sm:text-4xl`}>.</span>
        <span className="font-mono text-4xl font-semibold tabular-nums text-cyan-600 dark:text-cyan-400 sm:text-5xl">
          {cs}
        </span>
      </div>
      <p className="text-xs font-medium text-[var(--text-muted)]">
        {showHours ? "hours · min · sec" : "min · sec · cs"}
      </p>
    </div>
  );
}
