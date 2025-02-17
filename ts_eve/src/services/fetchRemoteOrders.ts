import { EveType, EveTycoonOrder } from "../types/etypes";

export const fetchRemoteOrders = async (
  evetype: EveType,
): Promise<EveTycoonOrder> => {
  try {
    const response = await fetch(`/api/orders/remote/${evetype.typeid}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return {};
  }
};
