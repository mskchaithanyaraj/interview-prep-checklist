"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SitePreferenceDropdown from "@/components/site-preference-dropdown";
import { useEffect, useState } from "react";

export default function AppHeader() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  // Basic spinner toggle on route change
  useEffect(() => {
    setIsNavigating(true);
    const t = setTimeout(() => setIsNavigating(false), 200); // brief spinner to indicate toggle
    return () => clearTimeout(t);
  }, [pathname]);

  const onChecklist = pathname === "/";
  const onTop100 = pathname?.startsWith("/top100");

  const baseTab = "rounded-md px-3 py-1.5 text-sm transition-colors border";
  const inactive =
    "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-gray-200";
  const active = "bg-gray-900 text-white border-gray-900";

  return (
    <header className="sticky top-0 backdrop-blur bg-white/60 border-b z-30">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link
          href="/"
          className={`${baseTab} ${onChecklist ? active : inactive}`}
        >
          Checklist
        </Link>
        <Link
          href="/top100"
          className={`${baseTab} ${onTop100 ? active : inactive}`}
        >
          Top 100 MNC Prep
        </Link>
        <div className="ml-auto">
          {onChecklist && <SitePreferenceDropdown scope="checklist" />}
          {onTop100 && <SitePreferenceDropdown scope="top100" />}
        </div>
        {isNavigating && (
          <div className="ml-2 inline-flex items-center text-gray-500 text-xs">
            <svg
              className="animate-spin h-4 w-4 mr-1 text-gray-500"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading
          </div>
        )}
      </div>
    </header>
  );
}
