import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import TimeDisplay from "./TimeDisplay";

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatTime(timeValue) {
  const ms = Math.floor((timeValue % 1000) / 10);
  const sec = Math.floor((timeValue / 1000) % 60);
  const min = Math.floor((timeValue / (1000 * 60)) % 60);
  const hr = Math.floor(timeValue / (1000 * 60 * 60));
  return `${pad(hr)}:${pad(min)}:${pad(sec)}.${pad(ms)}`;
}

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  function startStopwatch() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
    setIsRunning(true);
  }

  function pauseStopwatch() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }

  function stopStopwatch() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  }

  function addLap() {
    if (time === 0) return;
    setLaps((prev) => [...prev, { time: formatTime(time), ms: time }]);
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  const lapDeltas = laps.map((lap, i) => {
    const prev = i === 0 ? 0 : laps[i - 1].ms;
    return lap.ms - prev;
  });
  const minDelta = lapDeltas.length > 1 ? Math.min(...lapDeltas) : null;
  const maxDelta = lapDeltas.length > 1 ? Math.max(...lapDeltas) : null;

  return (
    <div className="flex flex-1 flex-col">
      {/* Display */}
      <div className="relative mb-6 flex w-full flex-col items-center sm:mb-8">
        <TimeDisplay
          hours={pad(hours)}
          minutes={pad(minutes)}
          seconds={pad(seconds)}
          centiseconds={pad(milliseconds)}
          running={isRunning}
          accentClass="text-violet-600 dark:text-violet-400"
        />
        {isRunning && (
          <span className="mt-3 flex items-center gap-1.5 rounded-full bg-violet-500/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-violet-700 ring-1 ring-violet-500/30 dark:text-violet-300 sm:mt-4 sm:text-[10px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500 dark:bg-violet-400" />
            Recording
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="mb-5 grid grid-cols-2 gap-2 sm:mb-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
        <Button
          name="Reset"
          onClick={stopStopwatch}
          variant="danger"
          disabled={time === 0 && laps.length === 0}
          className="w-full"
        />
        <Button
          name="Pause"
          onClick={pauseStopwatch}
          variant="secondary"
          disabled={!isRunning}
          className="w-full"
        />
        <Button
          name={time > 0 && !isRunning ? "Resume" : "Start"}
          onClick={startStopwatch}
          variant="primary"
          size="lg"
          className="col-span-2 w-full !bg-violet-500 !shadow-violet-500/30 hover:!bg-violet-400 hover:!shadow-violet-400/40 sm:col-span-1 sm:min-w-[100px]"
        />
        <Button
          name="Lap"
          onClick={addLap}
          variant="accent"
          className="col-span-2 w-full !text-violet-700 !ring-violet-500/25 hover:!bg-violet-500/15 dark:!text-violet-300 dark:!ring-violet-500/30 dark:hover:!bg-violet-500/20 sm:col-span-1"
          disabled={!isRunning && time === 0}
        />
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="mt-auto min-h-0 animate-fade-up">
          <div className="mb-2 flex items-center justify-between sm:mb-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
              Laps
            </h3>
            <span className="rounded-full bg-[var(--chip-bg)] px-2 py-0.5 text-xs text-[var(--text-muted)] ring-1 ring-[var(--chip-ring)]">
              {laps.length}
            </span>
          </div>
          <ul className="lap-scroll max-h-36 space-y-1.5 overflow-y-auto pr-1 sm:max-h-48 sm:space-y-2 md:max-h-56">
            {[...laps].reverse().map((lap, revIndex) => {
              const index = laps.length - 1 - revIndex;
              const delta = lapDeltas[index];
              const isFastest =
                laps.length > 1 && delta === minDelta && minDelta !== maxDelta;
              const isSlowest =
                laps.length > 1 && delta === maxDelta && minDelta !== maxDelta;

              return (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-xl bg-[var(--lap-row-bg)] px-3 py-2.5 ring-1 ring-[var(--lap-row-ring)] transition-colors hover:bg-[var(--lap-row-hover)] sm:px-4 sm:py-3"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-[10px] font-bold text-violet-600 dark:text-violet-300 sm:h-7 sm:w-7 sm:text-xs">
                      {index + 1}
                    </span>
                    <span className="truncate text-xs text-[var(--text-muted)] sm:text-sm">
                      Lap
                    </span>
                  </span>
                  <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    {laps.length > 1 && index > 0 && (isFastest || isSlowest) && (
                      <span
                        className={[
                          "text-[9px] font-medium uppercase tracking-wide sm:text-[10px]",
                          isFastest
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-500/80 dark:text-rose-400/70",
                        ].join(" ")}
                      >
                        {isFastest ? "best" : "slow"}
                      </span>
                    )}
                    <span className="font-mono text-xs font-medium text-[var(--text-primary)] tabular-nums sm:text-sm">
                      {lap.time}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {laps.length === 0 && time === 0 && (
        <p className="mt-auto text-center text-xs text-[var(--text-faint)] animate-float sm:text-sm">
          Hit Start, then Lap to split your run
        </p>
      )}
    </div>
  );
}
