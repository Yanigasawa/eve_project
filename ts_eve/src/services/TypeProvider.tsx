"use client";
import React, { createContext, useContext } from "react";
import { useMarketGroups } from "../services/marketGroupService";
import { useEveTypes } from "../services/typeService";
import { EveTypeProviderContext } from "../types/etypes";

export const EveTypeContext = createContext<EveTypeProviderContext | undefined>(
  undefined,
);

export const EveTypeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { marketGroups } = useMarketGroups();

  const {
    currentType,
    eveTypesMap,
    handleCategoryClick,
    handleEveTypes,
    currentBreadCrumbs,
    handleTypeClick,
    expandedMarketGroups,
  } = useEveTypes();

  return (
    <EveTypeContext.Provider
      value={{
        currentBreadCrumbs,
        currentType,
        eveTypesMap,
        expandedMarketGroups,
        handleCategoryClick,
        handleEveTypes,
        handleTypeClick,
        marketGroups,
      }}
    >
      {children}
    </EveTypeContext.Provider>
  );
};

export const useEveTypeContext = () => {
  const context = useContext(EveTypeContext);
  if (!context) {
    throw new Error("useEveType must be used within an EveTypeProvider");
  }
  return context;
};
