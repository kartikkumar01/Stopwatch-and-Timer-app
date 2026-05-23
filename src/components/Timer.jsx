import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import TimerDisplay from "./TimerDisplay";

const PRESETS = [
  { label: "1 min", min: 1 },
  { label: "5 min", min: 5 },
  { label: "10 min", min: 10 },
  { label: "25 min", min: 25 },
];

function msFromInputs(hr, min, sec) {
  return (
    Number(hr || 0) * 3600000 +
    Number(min || 0) * 60000 +
    Number(sec || 0) * 1000
  );
}

export default function Timer() {
  const [inputHr, setInputHr] = useState("");
  const [inputMin, setInputMin] = useState("");
  const [inputSec, setInputSec] = useState("");
  const [time, setTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const intervalRef = useRef(null);

  const configuredMs = msFromInputs(inputHr, inputMin, inputSec);
  const displayMs = time > 0 ? time : configuredMs;
  const isActive = totalDuration > 0 && !completed;
  const progress = isActive ? time / totalDuration : 0;
  const isConfigured = configuredMs > 0 || time > 0;
  const inputsLocked = isRunning || time > 0;

  function startTimer() {
    if (intervalRef.current) return;

    if (time === 0) {
      if (configuredMs <= 0) return;
      setTotalDuration(configuredMs);
      setTime(configuredMs);
      setCompleted(false);
      runTimer(configuredMs);
    } else {
      runTimer(time);
    }
    setIsRunning(true);
  }

  function runTimer(initialTime) {
    let currentTime = initialTime;

    intervalRef.current = setInterval(() => {
      currentTime -= 10;

      if (currentTime <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTime(0);
        setIsRunning(false);
        setCompleted(true);
        return;
      }

      setTime(currentTime);
    }, 10);
  }

  function pauseTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    setTotalDuration(0);
    setIsRunning(false);
    setCompleted(false);
    setInputHr("");
    setInputMin("");
    setInputSec("");
  }

  function applyPreset(preset) {
    if (isRunning) return;
    setInputHr("0");
    setInputMin(String(preset.min));
    setInputSec("0");
    setTime(0);
    setTotalDuration(0);
    setCompleted(false);
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const inputClass =
    "w-14 rounded-lg bg-[var(--input-bg)] py-2 text-center font-mono text-xl font-semibold text-[var(--input-text)] ring-1 ring-[var(--input-ring)] transition-all placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-40 sm:w-16 sm:py-2.5 sm:text-2xl";

  return (
    <div className="flex flex-1 flex-col">
      <section className="mb-6 rounded-2xl bg-[var(--chip-bg)] px-4 py-8 ring-1 ring-[var(--chip-ring)] sm:px-6 sm:py-10">
        {completed ? (
          <div className="animate-celebrate flex flex-col items-center gap-3 py-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl ring-2 ring-emerald-400/40 sm:h-16 sm:w-16 sm:text-3xl">
              ✓
            </div>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">
              Time&apos;s up!
            </p>
            <p className="text-sm text-[var(--text-muted)]">Chill session complete</p>
          </div>
        ) : (
          <>
            <div className="relative">
              {isRunning && (
                <span className="absolute right-0 top-0 flex items-center gap-1.5 rounded-full bg-cyan-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-700 ring-1 ring-cyan-500/30 dark:text-cyan-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  Live
                </span>
              )}
              <TimerDisplay timeMs={displayMs} running={isRunning} />
            </div>

            {isActive && (
              <div className="mt-6 space-y-1.5">
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--ring-track)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-[width] duration-150 ease-linear"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <p className="text-center text-[10px] tabular-nums text-[var(--text-faint)]">
                  {Math.round(progress * 100)}% remaining
                </p>
              </div>
            )}

            {!isActive && !isConfigured && (
              <p className="mt-4 text-center text-sm text-[var(--text-faint)]">
                Set a duration below or pick a preset
              </p>
            )}
          </>
        )}
      </section>

      {!isRunning && time === 0 && !completed && (
        <div className="mb-5 sm:mb-6">
          <p className="mb-2.5 text-center text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] sm:text-xs">
            Quick start
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className={[
                  "rounded-xl px-4 py-2 text-sm font-medium ring-1 transition-all active:scale-95",
                  configuredMs === preset.min * 60000 && time === 0
                    ? "bg-cyan-500/20 text-cyan-700 ring-cyan-500/40 dark:text-cyan-300"
                    : "bg-[var(--chip-bg)] text-[var(--text-secondary)] ring-[var(--chip-ring)] hover:bg-cyan-500/10 hover:text-cyan-700 hover:ring-cyan-500/30 dark:hover:text-cyan-300",
                ].join(" ")}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!completed && (
        <div className="mb-6 flex flex-col items-center gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] sm:text-xs">
            Custom duration
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { label: "h", value: inputHr, set: setInputHr },
              { label: "m", value: inputMin, set: setInputMin },
              { label: "s", value: inputSec, set: setInputSec },
            ].map(({ label, value, set }, i) => (
              <div key={label} className="flex items-center gap-2 sm:gap-3">
                {i > 0 && (
                  <span className="font-mono text-xl text-[var(--digit-separator)] sm:text-2xl">
                    :
                  </span>
                )}
                <div className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    placeholder="00"
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    disabled={inputsLocked}
                    aria-label={
                      label === "h" ? "Hours" : label === "m" ? "Minutes" : "Seconds"
                    }
                    className={inputClass}
                  />
                  <span className="text-[10px] font-medium uppercase text-[var(--text-muted)]">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap justify-center gap-2 sm:gap-3">
        {completed ? (
          <Button
            name="Reset"
            onClick={stopTimer}
            variant="primary"
            size="lg"
            className="min-w-[160px]"
          />
        ) : (
          <>
            <Button
              name="Reset"
              onClick={stopTimer}
              variant="danger"
              disabled={!isConfigured && !isRunning}
            />
            <Button
              name="Pause"
              onClick={pauseTimer}
              variant="secondary"
              disabled={!isRunning}
            />
            <Button
              name={time > 0 && !isRunning ? "Resume" : "Start"}
              onClick={startTimer}
              variant="primary"
              size="lg"
              disabled={!isConfigured}
              className="min-w-[100px] !bg-cyan-600 !shadow-cyan-600/25 hover:!bg-cyan-500 dark:!bg-cyan-500 dark:!shadow-cyan-500/30"
            />
          </>
        )}
      </div>
    </div>
  );
}
