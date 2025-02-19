import { useEffect, useState } from "react";
import { MarketGroup } from "../types/etypes";
import { fetchMarketGroups } from "./fetchMarketGroups";
import { buildTree } from "./buildTree";

export const useMarketGroups = () => {
  const [marketGroups, setMarketGroups] = useState<Map<number, MarketGroup[]>>(
    new Map(),
  );

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
