import { EveType } from "../types/etypes";

export const fetchLocalOrders = async (evetype: EveType) => {
  try {
    const response = await fetch(`api/orders/local?typeid=${evetype.typeid}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return {};
  }
};
