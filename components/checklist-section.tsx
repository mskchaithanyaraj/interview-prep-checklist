"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";

interface ChecklistSectionProps {
  title: string;
  items: ReadonlyArray<string>;
  sectionKey: string;
  completedItems: Record<string, boolean>;
  onToggleItem: (id: string, checked: boolean) => void;
  density?: "default" | "comfortable";
  gridClassName?: string;
}

export function ChecklistSection({
  title,
  items,
  sectionKey,
  completedItems,
  onToggleItem,
  density = "default",
  gridClassName,
}: ChecklistSectionProps) {
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
            const googleQuery = `(${item}) Leetcode/Gfg/Hackerrank`;
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(
              googleQuery
            )}`;

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
                  {!isIntroTop100 && (
                    <a
                      href={googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center text-xs"
                      title={googleQuery}
                    >
                      Google
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
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
