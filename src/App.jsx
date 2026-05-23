import { useState } from "react";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import ThemeToggle from "./components/ThemeToggle";

const tabs = [
  { id: "timer", label: "Timer", icon: "⏱" },
  { id: "stopwatch", label: "Stopwatch", icon: "⏲" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("timer");

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[var(--bg-base)] font-sans text-[var(--text-primary)] transition-colors duration-300">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div
          className="absolute -left-32 -top-32 h-72 w-72 rounded-full blur-[100px] sm:h-96 sm:w-96"
          style={{ background: "var(--bg-glow-1)" }}
        />
        <div
          className="absolute -right-24 top-1/4 h-64 w-64 rounded-full blur-[90px] sm:h-80 sm:w-80"
          style={{ background: "var(--bg-glow-2)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full blur-[80px] sm:left-1/3 sm:h-72 sm:w-72"
          style={{ background: "var(--bg-glow-3)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--grid-dot) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-3 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:max-w-lg sm:px-6 sm:py-8 md:max-w-xl lg:max-w-2xl">
        {/* Theme toggle */}
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>

        {/* Tab switcher */}
        <nav
          className="relative mb-5 flex rounded-2xl bg-[var(--tab-bg)] p-1 ring-1 ring-[var(--tab-ring)] animate-fade-up sm:mb-6"
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium transition-all duration-300 sm:gap-2 sm:py-3",
                  isActive
                    ? "text-[var(--tab-active)]"
                    : "text-[var(--tab-inactive)] hover:text-[var(--text-secondary)]",
                ].join(" ")}
              >
                <span className="text-base sm:text-lg" aria-hidden>
                  {tab.icon}
                </span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-[var(--tab-pill)] shadow-lg ring-1 transition-[left] duration-300 ease-out"
            style={{
              left: activeTab === "timer" ? "4px" : "calc(50%)",
              boxShadow: "0 4px 24px var(--tab-pill-shadow)",
              borderColor: "var(--tab-pill-ring)",
            }}
          />
        </nav>

        {/* Main card */}
        <main
          className="flex flex-1 flex-col rounded-2xl bg-[var(--card-bg)] p-4 shadow-2xl ring-1 ring-[var(--card-ring)] backdrop-blur-xl animate-fade-up sm:rounded-3xl sm:p-6 md:p-8"
          style={{ boxShadow: "0 25px 50px -12px var(--card-shadow)" }}
          role="tabpanel"
        >
          <div key={activeTab} className="animate-scale-in flex flex-1 flex-col">
            {activeTab === "timer" ? <Timer /> : <Stopwatch />}
          </div>
        </main>
      </div>
    </div>
  );
}
