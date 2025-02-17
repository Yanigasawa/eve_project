import React from "react";
import { useEveTypeContext } from "../../services/TypeProvider.jsx";
import { MarketGroup, EveType } from "../../types/etypes.js";

interface TypeNavAccordianProps {
  group: MarketGroup;
  isParent?: boolean;
}

const SideTypeNavAccordian: React.FC<TypeNavAccordianProps> = ({
  group,
  isParent,
}) => {
  const {
    eveTypesMap,
    handleCategoryClick,
    handleTypeClick,
    expandedMarketGroups,
    marketGroups,
  } = useEveTypeContext();

  if (!marketGroups) {
    return <div>loading...</div>;
  }

  return (
    <>
      {(isParent || expandedMarketGroups.includes(group.parentgroupid)) && (
        <li className="ul_child">
          <button
            className="type_nav_button"
            onClick={() => handleCategoryClick(group)}
          >
            {group.marketgroupname}
          </button>
          {group.children &&
            group.children.length > 0 &&
            expandedMarketGroups.includes(group.marketgroupid) && (
              <ul className="ul_child">
                {group.children.map((child) => (
                  <SideTypeNavAccordian
                    key={child.marketgroupid}
                    group={child}
                    isParent={false}
                  />
                ))}
              </ul>
            )}
          {group.hastypes === 1 &&
            expandedMarketGroups.includes(group.marketgroupid) && (
              <ul className="ul_child">
                {eveTypesMap
                  .get(group.marketgroupid)
                  ?.sort((a: EveType, b: EveType) =>
                    a.typename.localeCompare(b.typename),
                  )
                  .map((evetype: EveType) => (
                    <button
                      key={evetype.typeid}
                      className={"type_nav_button"}
                      onClick={() => handleTypeClick(evetype)}
                    >
                      {evetype.typename}
                    </button>
                  ))}
              </ul>
            )}
        </li>
      )}
    </>
  );
};

const SideTypeNavBody: React.FC = () => {
  const { marketGroups } = useEveTypeContext();

  const renderSideTypeNavAccordionParents = () => {
    if (!marketGroups) {
      return <div>loading...</div>;
    }

    return (
      <ul className="ul_parent">
        {marketGroups
          .get(0)
          ?.sort((a, b) => a.marketgroupname.localeCompare(b.marketgroupname))
          .map((group) => {
            return (
              <SideTypeNavAccordian
                key={group.marketgroupid}
                group={group}
                isParent={true}
              />
            );
          })}
      </ul>
    );
  };

  return (
    <div className="type_nav_body">{renderSideTypeNavAccordionParents()}</div>
  );
};
export default SideTypeNavBody;
