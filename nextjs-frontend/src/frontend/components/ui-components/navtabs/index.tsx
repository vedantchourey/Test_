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
  }));

interface NavProps {
  items: string[];
  action?: React.ReactElement;
  current?: string;
  onClick?: (tab: string) => void;
}

const NavTabs: React.FC<NavProps> = ({
  items = [],
  action = null,
  current = "",
  onClick,
}) => {
  const classes = useStyles();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    if (onClick) {
      onClick(items[newValue]);
    }
  };

  const getSelected = ():number =>{
    const newItem = items.find((item)=>item.toLowerCase() === current);
    return items.indexOf(newItem || "");
  }
  
  return (
    <React.Fragment>
      <Tabs
        value={getSelected()}
        classes={{ root: classes.tabs }}
        onChange={handleChange}
        aria-label="nav tabs"
      >
        {items.map((tab) => {
          return <Tab key={tab} label={tab}></Tab>;
        })}
        {action ? (
          <Box
            paddingRight={2}
            width={"100%"}
            display="flex"
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            {action}
          </Box>
        ) : null}
      </Tabs>
    </React.Fragment>
  );
};

export default NavTabs;
