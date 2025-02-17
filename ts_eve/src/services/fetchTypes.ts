import { EveType } from "../types/etypes";

export const fetchTypes = async (): Promise<EveType[]> => {
  try {
    const response = await fetch("api/types");
    console.log(response.text);
    return await response.json();
  } catch (error) {
    console.error("Error fetching people: ", error);
    return [];
  }
};
