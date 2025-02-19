import { MarketGroup } from "../types/etypes";

//only will work when array size is > 1

const buildTree = (marketgroups: MarketGroup[]): Map<number, MarketGroup[]> => {
  const lookup = new Map<number, MarketGroup[]>();

  marketgroups.forEach((group: MarketGroup) => {
    if (!lookup.has(group.parentgroupid)) {
      lookup.set(group.parentgroupid, []);
    }
  });

  marketgroups.forEach((group: MarketGroup) => {
    lookup.get(group.parentgroupid)?.push({ ...group, children: [] });
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

export { buildTree };
