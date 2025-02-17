import { EveType, MarketGroup } from "../types/etypes";

export const searchTypes = async (
  marketgroupid: MarketGroup["marketgroupid"],
): Promise<EveType[]> => {
  try {
    const response = await fetch(
      `api/types/search?marketgroupid=${marketgroupid}`,
    );
    return await response.json();
  } catch (error) {
    console.error("Error searching people: ", error);
    return [];
  }
};
