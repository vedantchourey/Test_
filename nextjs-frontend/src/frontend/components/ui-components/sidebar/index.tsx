import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import styled from "@emotion/styled";

const useStyles = makeStyles(() =>
  createStyles({
    listItems: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: "12px",
    },
    navDot: {
      width: "14px",
      minWidth: "14px",
    },
    naxText: {
      textAlign: "left",
    },
  }));

const NoobAccordion = styled(Accordion)(() => ({
  "& .MuiPaper-root": {
    borderRadius: "15px",
    "&:first-of-type": {
      borderRadius: "15px",
    },
  },
  "&:before": {
    background: "none",
  },
  marginBottom: "10px",
  borderRadius: "15px!important",
}));

const NoobListItemIcon = styled(ListItemIcon)(() => ({
  width: "14px",
  minWidth: "14px",
}));

const NoobListItemText = styled(ListItemText)(() => ({
  "& .MuiTypography-root":{
    textAlign: "left",
  }
}));

const NoobAccordionDetails = styled(AccordionDetails)(() => ({
  padding:"0px 16px 0px"
}));


interface NavProp {
  icon: React.ReactElement | null;
  title: string;
  items: {
    title: string;
    url: string;
  }[];
}

export interface SideBarNavProps {
  nav: NavProp[];
}

const SideBar: React.FC<SideBarNavProps> = ({ nav }) => {
  const classes = useStyles();

  const renderNav = ():JSX.Element[] => {
    return nav.map(({ icon, title, items }):JSX.Element => {
      return (
        <NoobAccordion key={title} >
          <AccordionSummary
            expandIcon={<img src='/icons/Downarrow.svg' alt='icon' />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box alignItems={"center"} display="flex">
              <Box marginRight={"24px"} alignItems={"center"} display="flex">
                {icon}
              </Box>
              <Typography>{title}</Typography>
            </Box>
          </AccordionSummary>
          <NoobAccordionDetails>
            <List className={classes.listItems}>
              {items.map(({ title }) => {
                return (
                
                  <ListItem key={title}>
                    <NoobListItemIcon>
                      <img src='/icons/Dot.svg' alt='icon' />
                    </NoobListItemIcon>
                    <NoobListItemText >
                      {title}
                    </NoobListItemText>
                  </ListItem>
                  
                );
              })}
            </List>
          </NoobAccordionDetails>
        </NoobAccordion>
      );
    });
  };
  return <React.Fragment>{renderNav()}</React.Fragment>;
};

export default SideBar;
