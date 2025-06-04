import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface SummaryChecklistProps {
  title: string;
  items: Record<string, string>;
}

export function SummaryChecklist({ title, items }: SummaryChecklistProps) {
  return (
    <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(items).map(([key, value]) => (
            <div
              key={key}
              className="flex items-start space-x-2 bg-white p-3 rounded-md shadow-sm"
            >
              <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-sm">{key}</div>
                <div className="text-xs text-gray-600">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
