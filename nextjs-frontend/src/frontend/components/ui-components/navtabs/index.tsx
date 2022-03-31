import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      width: "100%",
      borderRadius: "10px",
      background: theme.palette.background.paper,
      marginBottom: theme.spacing(1),
    },
  })
);

interface NavProps {
  items: {
    title: string;
    component: React.ReactElement;
  }[];
  action?: React.ReactElement;
}

const NavTabs: React.FC<NavProps> = ({ items = [], action = null }) => {
  const [value, setValue] = React.useState(0);
  const [tabs] = React.useState(items.map((item) => item.title));
  const [components] = React.useState(items.map((item) => item.component));
  const classes = useStyles();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs
        value={value}
        classes={{ root: classes.tabs }}
        onChange={handleChange}
        aria-label="nav tabs"
      >
        {tabs.map((tab) => {
          return <Tab label={tab}></Tab>;
        })}
        {action ? <Box paddingRight={2} width={"100%"} display="flex" alignItems={"center"} justifyContent={"flex-end"}>{action}</Box> : null}
      </Tabs>
      {components[value]}
    </React.Fragment>
  );
};

export default NavTabs;
