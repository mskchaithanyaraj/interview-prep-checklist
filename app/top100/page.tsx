"use client";

import { useEffect, useMemo, useState } from "react";
import { top100Data } from "@/lib/top100";
import { ChecklistSection } from "@/components/checklist-section";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type Completed = Record<string, boolean>;

const STORAGE_KEY = "top100_completed_items_v1";
const STORAGE_EXPIRY_KEY = "top100_completed_items_expiry_v1";
// 9 months in ms (approx 30 days per month)
const NINE_MONTHS_MS = 9 * 30 * 24 * 60 * 60 * 1000;

export default function Top100MncPrepPage() {
  const sections = top100Data.Top100MncPrep;
  const [completed, setCompleted] = useState<Completed>({});
  const [filter, setFilter] = useState<string | null>(null);

  // Load with 9-month expiry window
  useEffect(() => {
    try {
      const expiryRaw = localStorage.getItem(STORAGE_EXPIRY_KEY);
      const itemsRaw = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();
      if (expiryRaw && itemsRaw) {
        const expiry = parseInt(expiryRaw, 10);
        if (!Number.isNaN(expiry) && now < expiry) {
          setCompleted(JSON.parse(itemsRaw));
          return;
        }
      }
      // expired or missing -> reset
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_EXPIRY_KEY, String(now + NINE_MONTHS_MS));
    } catch {}
  }, []);

  // Persist changes and refresh expiry window slidingly on each update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      const now = Date.now();
      localStorage.setItem(STORAGE_EXPIRY_KEY, String(now + NINE_MONTHS_MS));
    } catch {}
  }, [completed]);

  const sectionKeys = useMemo(() => Object.keys(sections), [sections]);

  const totals = useMemo(() => {
    const t = { total: 0, done: 0 };
    sectionKeys.forEach((key) => {
      const items = sections[
        key as keyof typeof sections
      ] as ReadonlyArray<string>;
      const unique = Array.from(new Set(items));
      t.total += unique.length;
      unique.forEach((i) => {
        if (completed[`${key}-${i}`]) t.done += 1;
      });
    });
    return t;
  }, [completed, sectionKeys, sections]);

  const onToggle = (id: string, checked: boolean) => {
    setCompleted((prev) => ({ ...prev, [id]: checked }));
  };

  const reset = () => {
    if (confirm("Reset all Top 100 progress?")) {
      setCompleted({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Top 100 MNC Prep
              </h1>
              <p className="text-gray-600 mb-2">
                Personalized checklist with per-section progress
              </p>
              <div className="flex items-center gap-4">
                <Progress
                  value={totals.total ? (totals.done / totals.total) * 100 : 0}
                  className="h-2 flex-1"
                />
                <span className="text-base font-medium">
                  {totals.done}/{totals.total}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded border text-sm ${
                !filter ? "bg-gray-900 text-white" : "bg-white"
              }`}
              onClick={() => setFilter(null)}
            >
              All
            </button>
            {sectionKeys.map((k) => (
              <button
                key={k}
                className={`px-3 py-1 rounded border text-sm ${
                  filter === k ? "bg-gray-900 text-white" : "bg-white"
                }`}
                onClick={() => setFilter(k)}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {sectionKeys
          .filter((k) => !filter || filter === k)
          .map((k) => (
            <SectionWithProgress
              key={k}
              title={k}
              items={Array.from(
                new Set(
                  sections[k as keyof typeof sections] as ReadonlyArray<string>
                )
              )}
              sectionKey={k}
              completedItems={completed}
              onToggleItem={onToggle}
            />
          ))}
      </div>
    </main>
  );
}

// Wrapper to show a per-section progress bar atop the ChecklistSection
function SectionWithProgress({
  title,
  items,
  sectionKey,
  completedItems,
  onToggleItem,
}: {
  title: string;
  items: ReadonlyArray<string>;
  sectionKey: string;
  completedItems: Completed;
  onToggleItem: (id: string, checked: boolean) => void;
}) {
  const unique = Array.from(new Set(items));
  const done = unique.filter(
    (i) => completedItems[`${sectionKey}-${i}`]
  ).length;
  const pct = unique.length ? (done / unique.length) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-3 w-60">
          <Progress value={pct} className="h-2 flex-1" />
          <span className="text-base font-medium">
            {done}/{unique.length}
          </span>
        </div>
      </div>

      <ChecklistSection
        title="Problems"
        items={unique}
        sectionKey={sectionKey}
        completedItems={completedItems}
        onToggleItem={onToggleItem}
        density="comfortable"
        gridClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
        mode="problem"
      />
    </div>
  );
}
