import { Button } from "@mui/material";
import NavTabs from "../ui-components/navtabs";
import Create from "./create";

const Brackets = () => {
  const getNavTabs = () => {
    const items = [
      {
        title: "Create",
        component: <Create />,
      },
    ];

    return items;
  };

  const action = <Button variant="contained">Preview</Button>;
  return <NavTabs items={getNavTabs()} action={action}></NavTabs>;
};

export default Brackets;
