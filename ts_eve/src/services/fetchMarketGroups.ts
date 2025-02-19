import { MarketGroup } from "../types/etypes";

export const fetchMarketGroups = async (): Promise<MarketGroup[]> => {
  try {
    const response = await fetch("api/marketgroups");
    return await response.json();
  } catch (error) {
    console.error("Error fetching marketgroups: ", error);
    return [];
  }
};
