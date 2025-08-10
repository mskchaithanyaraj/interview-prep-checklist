"use client";

import { usePreferenceScope } from "@/components/preferences-context";

export default function SitePreferenceDropdown({
  scope,
}: {
  scope: "checklist" | "top100";
}) {
  const { site, setSite, custom, setCustom } = usePreferenceScope(scope);
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-gray-600">Search preference:</label>
      <select
        className="border rounded px-2 py-1 text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
        value={site}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSite(e.target.value as "leetcode" | "gfg" | "hackerrank" | "other")
        }
      >
        <option value="leetcode">LeetCode</option>
        <option value="gfg">GFG</option>
        <option value="hackerrank">HackerRank</option>
        <option value="other">Other</option>
      </select>
      {site === "other" && (
        <input
          type="text"
          placeholder="custom keywords/site"
          className="border rounded px-2 py-1 text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      )}
    </div>
  );
}
