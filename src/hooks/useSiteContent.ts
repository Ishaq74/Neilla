import { useQuery } from "@tanstack/react-query";
import { getSiteContent, getSiteSettings, getActiveTheme } from "@/lib/apiSiteContent";

export interface SiteContent {
  page: string;
  section: string;
  content: Record<string, unknown>;
}

export const useSiteContent = (page: string, section?: string) => {
  return useQuery({
    queryKey: ["site-content", page, section],
    queryFn: async () => {
      const data: SiteContent[] = await getSiteContent();
      // Transform to a plus usable format
      const contentMap: Record<string, Record<string, unknown>> = {};
      data?.forEach((item) => {
        contentMap[item.section] = item.content;
      });
      return contentMap;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const data: { key: string; value: unknown }[] = await getSiteSettings();
      const settingsMap: Record<string, unknown> = {};
      data?.forEach((item) => {
        settingsMap[item.key] = item.value;
      });
      return settingsMap;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useActiveTheme = () => {
  return useQuery({
    queryKey: ["active-theme"],
    queryFn: async () => {
      const data = await getActiveTheme();
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
