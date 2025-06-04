"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataStructureTableProps {
  dataStructures: Record<string, string[]>;
  sectionKey: string;
  completedItems: Record<string, boolean>;
  onToggleItem: (id: string, checked: boolean) => void;
}

export function DataStructureTable({
  dataStructures,
  sectionKey,
  completedItems,
  onToggleItem,
}: DataStructureTableProps) {
  const dsNames = Object.keys(dataStructures);

  const getCompletedCount = (ds: string) => {
    return dataStructures[ds].filter(
      (item) => completedItems[`${sectionKey}-DataStructures-${ds}-${item}`]
    ).length;
  };

  const getTotalCompletedCount = () => {
    let completed = 0;
    let total = 0;

    dsNames.forEach((ds) => {
      completed += getCompletedCount(ds);
      total += dataStructures[ds].length;
    });

    return `${completed}/${total}`;
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Data Structures</CardTitle>
          <Badge variant="outline" className="ml-2">
            {getTotalCompletedCount()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Data Structure</TableHead>
              <TableHead>Applications & Operations</TableHead>
              <TableHead className="w-[100px] text-right">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dsNames.map((ds) => (
              <TableRow key={ds}>
                <TableCell className="font-medium">{ds}</TableCell>
                <TableCell>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dataStructures[ds].map((item) => {
                      const id = `${sectionKey}-DataStructures-${ds}-${item}`;
                      const isChecked = !!completedItems[id];

                      return (
                        <div key={id} className="flex items-center space-x-2">
                          <Checkbox
                            id={id}
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              onToggleItem(id, !!checked)
                            }
                          />
                          <label
                            htmlFor={id}
                            className={`text-sm ${
                              isChecked
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {item}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      getCompletedCount(ds) === dataStructures[ds].length
                        ? "success"
                        : "outline"
                    }
                  >
                    {getCompletedCount(ds)}/{dataStructures[ds].length}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
