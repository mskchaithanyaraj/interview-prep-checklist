"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { usePreferenceScope } from "@/components/preferences-context";

interface ChecklistSectionProps {
  title: string;
  items: ReadonlyArray<string>;
  sectionKey: string;
  completedItems: Record<string, boolean>;
  onToggleItem: (id: string, checked: boolean) => void;
  density?: "default" | "comfortable";
  gridClassName?: string;
  mode?: "concept" | "problem";
}

export function ChecklistSection({
  title,
  items,
  sectionKey,
  completedItems,
  onToggleItem,
  density = "default",
  gridClassName,
  mode = "concept",
}: ChecklistSectionProps) {
  // Use scoped preference: top100 pages will pass mode="problem" but scope is still derived outside.
  // We'll default to checklist scope; Top100 page uses its own dropdown and we can override when needed.
  const { site, custom } = usePreferenceScope(
    mode === "problem" ? "top100" : "checklist"
  );
  const uniqueItems = useMemo(() => Array.from(new Set(items)), [items]);
  const getCompletedCount = () => {
    return uniqueItems.filter((item) => completedItems[`${sectionKey}-${item}`])
      .length;
  };

  const labelTextClass = density === "comfortable" ? "text-base" : "text-sm";
  const labelLeadingClass =
    density === "comfortable" ? "leading-snug" : "leading-tight";
  const itemGap = density === "comfortable" ? "gap-3" : "gap-2";
  const checkboxSize = density === "comfortable" ? "size-5" : "size-4";
  const gridCls =
    gridClassName ||
    (density === "comfortable"
      ? "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3");

  // Build the suffix once from preference
  const siteSuffix =
    site === "leetcode"
      ? "LeetCode"
      : site === "gfg"
      ? "GeeksForGeeks"
      : site === "hackerrank"
      ? "HackerRank"
      : custom || "";

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Badge variant="outline" className="ml-2">
            {getCompletedCount()}/{uniqueItems.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className={gridCls}>
          {uniqueItems.map((item) => {
            const id = `${sectionKey}-${item}`;
            const isChecked = !!completedItems[id];
            const isIntroTop100 =
              item.trim().toLowerCase() === "introduction to top 100 codes";

            return (
              <div key={id} className={`flex items-start ${itemGap}`}>
                <Checkbox
                  id={id}
                  checked={isChecked}
                  onCheckedChange={(checked) => onToggleItem(id, !!checked)}
                  className={checkboxSize}
                />
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={id}
                    className={`cursor-pointer ${labelTextClass} ${labelLeadingClass} ${
                      isChecked ? "line-through text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {item}
                  </label>
                  {!isIntroTop100 &&
                    (() => {
                      const base =
                        mode === "problem"
                          ? "Problem"
                          : "Explain the concept of";
                      const parts = [base, item, siteSuffix].filter(
                        Boolean
                      ) as string[];
                      const q = parts.join(" ");
                      const href = `https://www.google.com/search?q=${encodeURIComponent(
                        q
                      )}`;
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline inline-flex items-center text-xs"
                          title={q}
                        >
                          Google
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      );
                    })()}
                  {isIntroTop100 && (
                    <a
                      href="https://prepinsta.com/top-100-codes/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center text-xs"
                      title="Open reference"
                    >
                      Open
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
