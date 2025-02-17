import { useState } from "react";
import { useEffect } from "react";
import { searchTypes } from "./searchTypes";
import { useMarketGroups } from "./marketGroupService";
import { EveType, MarketGroup, MarketGroupId } from "../types/etypes";

export const useEveTypes = () => {
  const { marketGroups } = useMarketGroups();
  const [currentBreadCrumbs, setCurrentBreadCrumbs] = useState<MarketGroup[]>(
    [],
  );

  const [currentType, setCurrentType] = useState<EveType>();
  const [eveTypesMap, setEveTypesMap] = useState<Map<MarketGroupId, EveType[]>>(
    new Map(),
  );

  const [expandedMarketGroups, setExpandedMarketGroups] = useState<number[]>(
    [],
  );

  const handleEveTypes = async (marketgroupid: number) => {
    if (eveTypesMap.has(marketgroupid)) return;
    try {
      const data: EveType[] = await searchTypes(marketgroupid);
      setEveTypesMap(new Map(eveTypesMap).set(marketgroupid, data));
    } catch (error) {
      console.error("error searching types", error);
    }
  };

  const handleTypeClick = (evetype: EveType) => {
    setCurrentBreadCrumbs(getCurrentBreadCrumbs(evetype.marketgroupid));
    setCurrentType(evetype);
  };

  const handleCategoryClick = (node: MarketGroup | EveType) => {
    if ("hastypes" in node) {
      if (node.hastypes === 1 && !eveTypesMap.has(node.marketgroupid)) {
        handleEveTypes(node.marketgroupid);
      }
    }
    if (expandedMarketGroups.includes(node.marketgroupid)) {
      return setExpandedMarketGroups(
        expandedMarketGroups.filter((a) => a !== node.marketgroupid),
      );
    }
    return setExpandedMarketGroups([
      ...expandedMarketGroups,
      node.marketgroupid,
    ]);
  };

  const getCurrentBreadCrumbs = (
    marketgroupid: number | MarketGroupId,
    chain: MarketGroup[] = [],
  ): MarketGroup[] => {
    if (!marketGroups || !marketgroupid) return chain;

    const groups: MarketGroup[] = Array.from(marketGroups.values()).flat();

    const group = groups.find(
      (marketgroup) => marketgroup.marketgroupid === marketgroupid,
    );
    if (!group) return chain;

    return group.parentgroupid
      ? getCurrentBreadCrumbs(group.parentgroupid, [group, ...chain])
      : [group, ...chain];
  };

  useEffect(() => {
    if (currentType) {
      handleEveTypes(currentType.marketgroupid);
    }
  }, [currentType]);

  return {
    currentBreadCrumbs,
    currentType,
    eveTypesMap,
    expandedMarketGroups,
    handleCategoryClick,
    handleEveTypes,
    handleTypeClick,
  };
};
