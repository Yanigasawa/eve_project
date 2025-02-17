"use client";
import React, { createContext, useContext } from "react";
import { useOrders } from "./orderService";
import { EveTycoonOrder, OrderProviderContext } from "../types/etypes";

export const OrderContext = createContext<OrderProviderContext | undefined>(
  undefined,
);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentBuyOrders, currentSellOrders, filterOrderLocation } =
    useOrders();

  return (
    <OrderContext.Provider
      value={{
        currentBuyOrders,
        currentSellOrders,
        filterOrderLocation,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useTypes must be used within a TypeProvider");
  }
  return context;
};
