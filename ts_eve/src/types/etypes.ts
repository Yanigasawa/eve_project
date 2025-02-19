export type EveType = {
  baseprice: number;
  capacity: string;
  description: string;
  graphicid: number;
  groupid: number;
  iconid: number;
  marketgroupid: number;
  mass: number;
  portionsize: number;
  published: boolean;
  raceid: string;
  soundid: number;
  typeid: number;
  typename: string;
};

export type MarketGroup = {
  children?: MarketGroup[];
  description: string;
  hastypes: number;
  iconid: number;
  marketgroupid: MarketGroupId;
  marketgroupname: string;
  parentgroupid: number;
};

export type MarketGroupId = number;

export type OrderProviderContext = {
  currentBuyOrders?: Order[];
  currentSellOrders?: Order[];
  filterOrderLocation?: (locationID: number) => string;
};

export type EveTycoonOrder = {
  itemType?: ItemType;
  systems?: { [key: string]: System };
  stationNames?: { [key: string]: string };
  structureNames?: { [key: string]: string };
  orders?: Order[];
};

export type ItemType = {
  typeID: number;
  groupID: number;
  typeName: string;
  iconID: number;
  marketGroupID: number;
  description: string;
  published: number;
  volume: number;
};

export type Order = {
  duration: number;
  isBuyOrder: boolean;
  issued: number;
  locationId: number;
  minVolume: number;
  orderId: number;
  price: string;
  range?: Range;
  systemId: number;
  regionId: number;
  typeId: number;
  volumeRemain: number;
  volumeTotal: number;
};

export enum Range {
  Region = "REGION",
  Solarsystem = "SOLARSYSTEM",
  Station = "STATION",
  The1 = "_1",
  The10 = "_10",
  The2 = "_2",
  The20 = "_20",
  The3 = "_3",
  The30 = "_30",
  The4 = "_4",
  The40 = "_40",
  The5 = "_5",
}

export type System = {
  solarSystemID: number;
  solarSystemName: string;
  security: number;
};

export type UserCredentials = {
  password: Password;
  placeholder: string;
  salt: string;
  username: Username;
};

export type Password = string;
export type Username = string;

export type EveTypeProviderContext = {
  currentBreadCrumbs: MarketGroup[];
  currentType?: EveType;
  eveTypesMap: Map<MarketGroupId, EveType[]>;
  expandedMarketGroups: number[];
  handleCategoryClick: (evetype: EveType | MarketGroup) => void;
  handleEveTypes: (marketgroupid: number) => void;
  handleTypeClick: (evetype: EveType) => void;
  marketGroups: Map<number, MarketGroup[]>;
};
