function DigitGroup({ value, label }) {
  return (
    <div className="flex min-w-[2.25rem] flex-col items-center gap-0.5 sm:min-w-[2.75rem] sm:gap-1 md:min-w-[3.25rem]">
      <span className="font-mono text-[1.65rem] font-semibold leading-none tracking-tight text-[var(--digit-primary)] tabular-nums min-[360px]:text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl">
        {value}
      </span>
      <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-[var(--digit-label)] sm:text-[10px] sm:tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

function Separator({ running }) {
  return (
    <span
      className={[
        "mb-3 font-mono text-2xl font-light text-[var(--digit-separator)] min-[360px]:mb-4 min-[360px]:text-3xl min-[400px]:mb-5 min-[400px]:text-4xl sm:text-5xl md:text-6xl",
        running ? "animate-tick" : "",
      ].join(" ")}
      aria-hidden
    >
      :
    </span>
  );
}

export default function TimeDisplay({
  hours,
  minutes,
  seconds,
  centiseconds,
  running = false,
  accentClass = "text-indigo-500 dark:text-indigo-400",
}) {
  return (
    <div
      className="flex w-full max-w-full items-end justify-center gap-0.5 overflow-hidden min-[400px]:gap-1 sm:gap-2"
      role="timer"
      aria-live="polite"
    >
      <DigitGroup value={hours} label="hr" />
      <Separator running={running} />
      <DigitGroup value={minutes} label="min" />
      <Separator running={running} />
      <DigitGroup value={seconds} label="sec" />
      <Separator running={running} />
      <div className="flex min-w-[2.25rem] flex-col items-center gap-0.5 sm:min-w-[2.75rem] sm:gap-1 md:min-w-[3.25rem]">
        <span
          className={[
            "font-mono text-[1.65rem] font-semibold leading-none tracking-tight tabular-nums min-[360px]:text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl",
            accentClass,
          ].join(" ")}
        >
          {centiseconds}
        </span>
        <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-[var(--digit-label)] sm:text-[10px] sm:tracking-[0.2em]">
          cs
        </span>
      </div>
    </div>
  );
}
