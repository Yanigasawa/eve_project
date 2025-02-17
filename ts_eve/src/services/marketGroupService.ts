import { useEffect, useState } from "react";
import { MarketGroup } from "../types/etypes.ts";
import { fetchMarketGroups } from "./fetchMarketGroups.ts";

export const useMarketGroups = () => {
  const [marketGroups, setMarketGroups] = useState<Map<number, MarketGroup[]>>(
    new Map(),
  );

  const buildTree = (
    marketgroups: MarketGroup[],
  ): Map<number, MarketGroup[]> => {
    const lookup = new Map<number, MarketGroup[]>();

    marketgroups.forEach((group: MarketGroup) => {
      if (!lookup.has(group.parentgroupid)) {
        lookup.set(group.parentgroupid, []);
      }
    });

    marketgroups.forEach((group: MarketGroup) => {
      lookup.get(group.parentgroupid)!.push({ ...group, children: [] });
    });

    lookup.forEach((children) => {
      children.forEach((child) => {
        if (lookup.has(child.marketgroupid)) {
          child.children = lookup.get(child.marketgroupid)!;
        }
      });
    });
    return lookup;
  };

  useEffect(() => {
    const handleMarketGroups = async () => {
      try {
        const data: MarketGroup[] = await fetchMarketGroups();
        setMarketGroups(buildTree(data));
      } catch (error) {
        console.error("error fetching market groups:", error);
      }
    };
    handleMarketGroups();
  }, []);

  return { marketGroups };
};
