import React from "react";
import { useState } from "react";

const HeaderTitle = () => {
  return <span>Eve Market Viewer </span>;
};

const HeaderUserLoginContainer = () => {
  const [loginInfo, setLoginInfo] = useState();

  return (
    <div>
      <input />

      <input />
    </div>
  );
};

const HeaderButtonContainer: React.FC = () => {
  const [isButtonExpanded, setIsButtonExpanded] = useState(false);

  const toggleButton = () => {
    return setIsButtonExpanded(!isButtonExpanded);
  };

  return (
    <div>
      {isButtonExpanded ? (
        <>
          <button className="expand login" onClick={() => toggleButton()}>
            {"> "}
          </button>
          <HeaderUserLoginContainer />
        </>
      ) : (
        <button className="expand login" onClick={() => toggleButton()}>
          Would you like to login ?
        </button>
      )}
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <HeaderTitle />
      <HeaderButtonContainer />
    </div>
  );
};

export default Header;
