import React from "react";
import NavTabs from "../ui-components/navtabs";
import Basic from "./basic";
import Info from "./info";
import Settings from "./settings";

const Setup = ():JSX.Element => {
  const getNavTabs = ():{title:string, component:JSX.Element}[] => {
    const items = [
      {
        title: "Basic",
        component: <Basic />,
      },
      {
        title: "Info",
        component: <Info />,
      },
      {
        title: "Settings",
        component: <Settings />,
      },
    ];

    return items;
  };

  return (
    <React.Fragment>
      <NavTabs items={getNavTabs()}></NavTabs>
    </React.Fragment>
  );
};

export default Setup;
