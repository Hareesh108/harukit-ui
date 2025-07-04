import * as React from "react";

interface Tab {
  label: string;
  id: string;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode[];
  className?: string;
}

export function Tabs({ tabs, children, className }: TabsProps) {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      setActive((prev) => (prev + 1) % tabs.length);
      tabRefs.current[(active + 1) % tabs.length]?.focus();
    } else if (e.key === "ArrowLeft") {
      setActive((prev) => (prev - 1 + tabs.length) % tabs.length);
      tabRefs.current[(active - 1 + tabs.length) % tabs.length]?.focus();
    }
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Tabs"
        className="flex border-b border-gray-200 dark:border-gray-700"
        onKeyDown={onKeyDown}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            aria-selected={active === i}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={active === i ? 0 : -1}
            className={`px-4 py-2 text-sm font-medium focus:outline-none transition border-b-2 ${active === i ? "border-yellow-500 text-yellow-600 dark:text-yellow-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-yellow-500"}`}
            onClick={() => setActive(i)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {children &&
          children.map &&
          children.map((child, i) =>
            tabs[i] ? (
              <div
                key={tabs[i].id}
                role="tabpanel"
                id={`tabpanel-${tabs[i].id}`}
                aria-labelledby={`tab-${tabs[i].id}`}
                hidden={active !== i}
                tabIndex={0}
              >
                {child}
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}
