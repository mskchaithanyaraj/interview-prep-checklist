"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { ChecklistSection } from "@/components/checklist-section";
import { DataStructureTable } from "@/components/data-structure-table";
import { SummaryChecklist } from "@/components/summary-checklist";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { syllabus } from "@/lib/data";
import { FilterBar } from "@/components/filter-bar";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(syllabus);
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [filter, setFilter] = useState<string | null>(null);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("completedItems");
    if (savedItems) {
      setCompletedItems(JSON.parse(savedItems));
    }
  }, []);

  // Calculate progress whenever completedItems changes
  useEffect(() => {
    if (data) {
      let totalItems = 0;
      let completedCount = 0;

      // Count all checkable items
      Object.keys(data).forEach((key) => {
        if (key === "SummaryChecklist") return;

        const section = data[key];
        if (section.Topics) {
          totalItems += section.Topics.length;
          section.Topics.forEach((topic: string) => {
            if (completedItems[`${key}-${topic}`]) completedCount++;
          });
        } else if (section.KeyConcepts) {
          totalItems += section.KeyConcepts.length;
          section.KeyConcepts.forEach((topic: string) => {
            if (completedItems[`${key}-KeyConcepts-${topic}`]) completedCount++;
          });
        }

        if (section.InterviewFocus) {
          totalItems += section.InterviewFocus.length;
          section.InterviewFocus.forEach((topic: string) => {
            if (completedItems[`${key}-InterviewFocus-${topic}`])
              completedCount++;
          });
        }

        if (section.DataStructures) {
          Object.keys(section.DataStructures).forEach((ds) => {
            totalItems += section.DataStructures[ds].length;
            section.DataStructures[ds].forEach((topic: string) => {
              if (completedItems[`${key}-DataStructures-${ds}-${topic}`])
                completedCount++;
            });
          });
        }

        if (section.Algorithms) {
          totalItems += section.Algorithms.length;
          section.Algorithms.forEach((topic: string) => {
            if (completedItems[`${key}-Algorithms-${topic}`]) completedCount++;
          });
        }

        if (section.TimeAndSpaceComplexity) {
          totalItems += section.TimeAndSpaceComplexity.length;
          section.TimeAndSpaceComplexity.forEach((topic: string) => {
            if (completedItems[`${key}-TimeAndSpaceComplexity-${topic}`])
              completedCount++;
          });
        }
      });

      const newProgress =
        totalItems > 0 ? (completedCount / totalItems) * 100 : 0;
      setProgress(newProgress);

      // Save to localStorage
      localStorage.setItem("completedItems", JSON.stringify(completedItems));
    }
  }, [completedItems, data]);

  const handleToggleItem = (id: string, checked: boolean) => {
    setCompletedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          setData(json.SoftwareEngineeringInterviewPreparationSyllabus || json);
          // Reset progress when loading new data
          setCompletedItems({});
        } catch (error) {
          console.error("Invalid JSON file", error);
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress?")) {
      setCompletedItems({});
      localStorage.removeItem("completedItems");
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Software Engineering Interview Preparation Checklist
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <p className="text-gray-600 mb-2">
                Track your interview preparation progress
              </p>
              <div className="flex items-center gap-4">
                <Progress value={progress} className="h-2 flex-1" />
                <span className="text-sm font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                Reset Progress
              </Button>
              <Button variant="outline" className="relative max-md:hidden">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="mr-2 h-4 w-4" />
                Upload JSON
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-sm text-blue-700">
              Check off topics as you study them. Your progress will be saved
              automatically in your browser.
            </p>
          </div>
        </div>

        <FilterBar
          sections={Object.keys(data).filter((k) => k !== "SummaryChecklist")}
          active={filter}
          onChange={setFilter}
        />

        {/* Render each section */}
        {Object.keys(data)
          .filter((key) => !filter || key === filter)
          .map((key) => {
            if (key === "SummaryChecklist") {
              return null; // Skip summary checklist here, handled separately
            }

            const section = data[key];
            const sectionTitle = key
              .replace(/^\d+_/, "")
              .replace(/([A-Z])/g, " $1")
              .trim();

            if (key === "3_DataStructuresAndAlgorithms") {
              return (
                <div key={key} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{sectionTitle}</h2>

                  {/* Data Structures Table */}
                  <DataStructureTable
                    dataStructures={section.DataStructures}
                    sectionKey={key}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />

                  {/* Algorithms */}
                  <ChecklistSection
                    title="Algorithms"
                    items={section.Algorithms}
                    sectionKey={`${key}-Algorithms`}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />

                  {/* Time and Space Complexity */}
                  <ChecklistSection
                    title="Time and Space Complexity"
                    items={section.TimeAndSpaceComplexity}
                    sectionKey={`${key}-TimeAndSpaceComplexity`}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />
                </div>
              );
            }

            return (
              <div key={key} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{sectionTitle}</h2>

                {section.Topics && (
                  <ChecklistSection
                    title="Topics"
                    items={section.Topics}
                    sectionKey={key}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />
                )}

                {section.KeyConcepts && (
                  <ChecklistSection
                    title="Key Concepts"
                    items={section.KeyConcepts}
                    sectionKey={`${key}-KeyConcepts`}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />
                )}

                {section.InterviewFocus && (
                  <ChecklistSection
                    title="Interview Focus"
                    items={section.InterviewFocus}
                    sectionKey={`${key}-InterviewFocus`}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />
                )}

                {section.RecommendedSites && (
                  <ChecklistSection
                    title="Recommended Sites"
                    items={section.RecommendedSites}
                    sectionKey={`${key}-RecommendedSites`}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />
                )}

                {section.Practice && (
                  <ChecklistSection
                    title="Practice"
                    items={section.Practice}
                    sectionKey={`${key}-Practice`}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />
                )}

                {section.Bonus && (
                  <ChecklistSection
                    title="Bonus"
                    items={section.Bonus}
                    sectionKey={`${key}-Bonus`}
                    completedItems={completedItems}
                    onToggleItem={handleToggleItem}
                  />
                )}

                {section.OptionalFor && (
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Optional for:</span>{" "}
                    {section.OptionalFor}
                  </div>
                )}
              </div>
            );
          })}
        {!filter && (
          <SummaryChecklist
            title="Summary Checklist"
            items={data["SummaryChecklist"]}
          />
        )}
      </div>
    </main>
  );
}
