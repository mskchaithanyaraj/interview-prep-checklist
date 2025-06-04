"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown } from "lucide-react";

type Props = {
  sections: string[];
  active: string | null;
  onChange: (s: string | null) => void;
};

const label = (k: string) => {
  const pretty = k
    .replace(/^\d+_/, "")
    .replace(/([A-Z])/g, " $1")
    .trim();
  return pretty;
};

export function FilterBar({ sections, active, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Detect overflow
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const handleScroll = () => {
      const shouldShow = el.scrollHeight - el.scrollTop > el.clientHeight + 1;
      setShowArrow(shouldShow);
    };

    handleScroll(); // initial
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <div className="sticky top-0 z-20 pb-4">
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setOpen((o) => !o)}
        >
          <Filter size={16} />
          {active ? label(active) : "All Sections"}
          <ChevronDown
            className="text-gray-400 mb-1 absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform duration-200"
            size={18}
          />
        </Button>

        {open && (
          <div className="relative">
            <div
              ref={listRef}
              className="absolute mt-1 w-full max-h-[15rem] overflow-y-auto bg-white border rounded shadow z-10"
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-50"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
              >
                All
              </button>
              {sections.map((s) => (
                <button
                  key={s}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                    active === s ? "bg-gray-100 font-semibold" : ""
                  }`}
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                  }}
                >
                  {label(s)}
                </button>
              ))}
            </div>

            {/* Scroll Indicator Overlay */}
            {showArrow && (
              <div
                className="pointer-events-none absolute -bottom-60 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent flex items-end justify-center z-20 transition-opacity duration-300"
                style={{ opacity: showArrow ? 1 : 0 }}
              >
                <div className="flex items-center justify-center rounded-full border border-gray-300 bg-white p-1 shadow-sm">
                  <ChevronDown className="text-gray-400" size={18} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
