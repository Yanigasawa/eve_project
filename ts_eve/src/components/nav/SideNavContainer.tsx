import SideTypeNavBody from "./SideNavBody";

const SideNavButtonContainer = () => {
  return (
    <div className="side_nav_top_button_container">
      <button className="side_nav_top_button_container">Search Items</button>
      <button className="side_nav_top_button_container">
        Save to favorites
      </button>
    </div>
  );
};

const SideNavInput = () => {
  return <input name="search_types" className="side_nav_top_input" />;
};

const SideNavTopContainer = () => {
  return (
    <div className="side_nav_top_container">
      <SideNavButtonContainer />
      <SideNavInput />
    </div>
  );
};

const SideNavBodyContainer = () => {
  return (
    <div className="side_nav_body_container">
      <SideTypeNavBody />
    </div>
  );
};

const SideNavContainer = () => {
  return (
    <div className="side_nav_container">
      <SideNavTopContainer />
      <SideNavBodyContainer />
    </div>
  );
};

export default SideNavContainer;
