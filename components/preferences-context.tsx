"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type SitePref = "leetcode" | "gfg" | "hackerrank" | "other";

type Scope = "checklist" | "top100";

type PrefSlice = {
  site: SitePref;
  custom: string;
  setSite: (s: SitePref) => void;
  setCustom: (s: string) => void;
};

type PrefContext = {
  checklist: PrefSlice;
  top100: PrefSlice;
};

const Ctx = createContext<PrefContext | null>(null);

const LS_KEY_CHECKLIST = "site_preference_selected_checklist_v1";
const LS_KEY_CHECKLIST_CUSTOM = "site_preference_custom_checklist_v1";
const LS_KEY_TOP100 = "site_preference_selected_top100_v1";
const LS_KEY_TOP100_CUSTOM = "site_preference_custom_top100_v1";

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // checklist scope
  const [clSite, setClSite] = useState<SitePref>("leetcode");
  const [clCustom, setClCustom] = useState("");
  // top100 scope
  const [tSite, setTSite] = useState<SitePref>("leetcode");
  const [tCustom, setTCustom] = useState("");

  // load
  useEffect(() => {
    try {
      const s1 = localStorage.getItem(LS_KEY_CHECKLIST) as SitePref | null;
      const c1 = localStorage.getItem(LS_KEY_CHECKLIST_CUSTOM);
      if (
        s1 === "leetcode" ||
        s1 === "gfg" ||
        s1 === "hackerrank" ||
        s1 === "other"
      ) {
        setClSite(s1);
      }
      if (typeof c1 === "string") setClCustom(c1);

      const s2 = localStorage.getItem(LS_KEY_TOP100) as SitePref | null;
      const c2 = localStorage.getItem(LS_KEY_TOP100_CUSTOM);
      if (
        s2 === "leetcode" ||
        s2 === "gfg" ||
        s2 === "hackerrank" ||
        s2 === "other"
      ) {
        setTSite(s2);
      }
      if (typeof c2 === "string") setTCustom(c2);
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY_CHECKLIST, clSite);
      localStorage.setItem(LS_KEY_CHECKLIST_CUSTOM, clCustom);
      localStorage.setItem(LS_KEY_TOP100, tSite);
      localStorage.setItem(LS_KEY_TOP100_CUSTOM, tCustom);
    } catch {}
  }, [clSite, clCustom, tSite, tCustom]);

  const value = useMemo<PrefContext>(
    () => ({
      checklist: {
        site: clSite,
        custom: clCustom,
        setSite: setClSite,
        setCustom: setClCustom,
      },
      top100: {
        site: tSite,
        custom: tCustom,
        setSite: setTSite,
        setCustom: setTCustom,
      },
    }),
    [clSite, clCustom, tSite, tCustom]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePreferenceScope(scope: Scope): PrefSlice {
  const v = useContext(Ctx);
  if (!v)
    throw new Error(
      "usePreferenceScope must be used within PreferencesProvider"
    );
  return scope === "top100" ? v.top100 : v.checklist;
}

// Back-compat: if some component still imports usePreferences, expose checklist scope by default
export function usePreferences() {
  const v = useContext(Ctx);
  if (!v)
    throw new Error("usePreferences must be used within PreferencesProvider");
  return v.checklist;
}
