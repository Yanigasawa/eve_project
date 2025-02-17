import { useState, useEffect } from "react";
import { useEveTypeContext } from "./TypeProvider";
import { EveTycoonOrder, EveType, Order } from "../types/etypes";
import { fetchRemoteOrders, fetchRemoteOrdersTest } from "./fetchRemoteOrders";

export const useOrders = () => {
  const { currentType } = useEveTypeContext();
  console.log(currentType);
  const [currentOrders, setCurrentOrders] = useState<EveTycoonOrder>();
  const [currentBuyOrders, setCurrentBuyOrders] = useState<Order[]>();
  const [currentSellOrders, setCurrentSellOrders] = useState<Order[]>();

  const filterOrderLocation = (locationID: number): string => {
    const idString = locationID.toString();
    if (idString.startsWith("6")) {
      return currentOrders!.stationNames?.[idString]!;
    }
    if (idString.startsWith("3")) {
      return currentOrders!.systems?.[idString].solarSystemName!;
    }
    if (idString.startsWith("1")) {
      return currentOrders!.structureNames?.[idString]!;
    }
    return "";
  };

  const fetchAndSortOrders = async (currentType: EveType) => {
    if (currentType) {
      try {
        const fetchedOrders = await fetchRemoteOrders(currentType);
        setCurrentOrders(fetchedOrders);

        if (fetchedOrders) {
          const buyOrders: Order[] = fetchedOrders!
            .orders!.filter((order: Order) => order.isBuyOrder)
            .sort((a, b) => Number(b.price) - Number(a.price))
            .map((order: Order) => ({
              ...order,
              price: order.price.toLocaleString(),
            }));

          const sellOrders: Order[] = fetchedOrders!
            .orders!.filter((order: Order) => !order.isBuyOrder)
            .sort((a: Order, b: Order) => Number(a.price) - Number(b.price))
            .map((order: Order) => ({
              ...order,
              price: order.toLocaleString(),
            }));

          setCurrentBuyOrders(buyOrders);
          setCurrentSellOrders(sellOrders);
        }
      } catch (error) {
        console.error("error fetching or sorting orders: ", error);
      }
    }
  };
  useEffect(() => {
    fetchAndSortOrders(currentType!);
  }, [currentType]);

  return {
    currentBuyOrders,
    currentSellOrders,
    filterOrderLocation,
  };
};
