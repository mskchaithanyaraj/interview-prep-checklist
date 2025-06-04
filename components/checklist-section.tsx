"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChecklistSectionProps {
  title: string;
  items: string[];
  sectionKey: string;
  completedItems: Record<string, boolean>;
  onToggleItem: (id: string, checked: boolean) => void;
}

export function ChecklistSection({
  title,
  items,
  sectionKey,
  completedItems,
  onToggleItem,
}: ChecklistSectionProps) {
  const getCompletedCount = () => {
    return items.filter((item) => completedItems[`${sectionKey}-${item}`])
      .length;
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Badge variant="outline" className="ml-2">
            {getCompletedCount()}/{items.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item) => {
            const id = `${sectionKey}-${item}`;
            const isChecked = !!completedItems[id];

            return (
              <div key={id} className="flex items-start space-x-2">
                <Checkbox
                  id={id}
                  checked={isChecked}
                  onCheckedChange={(checked) => onToggleItem(id, !!checked)}
                />
                <label
                  htmlFor={id}
                  className={`cursor-pointer text-sm leading-tight ${
                    isChecked ? "line-through text-gray-500" : "text-gray-900"
                  }`}
                >
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
