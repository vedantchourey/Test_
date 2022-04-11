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
import { useRouter } from "next/router";

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

const NoobListItem = styled(ListItem)(() => ({
  "&.Mui-selected":{
    backgroundColor:"transparent",
    color:"#7265F1"
  }
}));

const NoobAccordionDetails = styled(AccordionDetails)(() => ({
  padding:"0px 16px 0px"
}));

interface NavItems{
  title: string;
  url: string;
  as?:string;
  // eslint-disable-next-line
  isActive?:(url:string)=>boolean

}

interface NavProp {
  icon: React.ReactElement | null;
  title: string;
  items: NavItems[];
  isActive?:(url:string)=>boolean
}

export interface SideBarNavProps {
  nav: NavProp[];
}

const SideBar: React.FC<SideBarNavProps> = ({ nav }) => {
  const classes = useStyles();
  const router = useRouter();
  const [active,setActive]= React.useState("");

  React.useEffect(()=>{

    const navItem = nav.find(({items,isActive})=>{
      if(isActive){
        return isActive(router.asPath);
      }
      return items.find((item)=>{
        return item.url === router.asPath;
      }) !== undefined
    })

    if(navItem){
      setActive(navItem.title);
    }

  },[router.asPath])

  const changeHandler = (newActive:string):void=>{
    if(newActive === active){
      setActive("");
    }else{
      setActive(newActive);
    }
    
  }

  const renderNav = ():JSX.Element[] => {
    return nav.map(({ icon, title, items }):JSX.Element => {
      return (
        <NoobAccordion key={title} expanded={active === title} onChange={():void=>changeHandler(title)}>
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
              {items.map(({ title,url, as,isActive}) => {
                return (
                
                  <NoobListItem key={`${url}-${as}`} selected={isActive && isActive(router.asPath)}>
                    <NoobListItemIcon>
                      <img src='/icons/Dot.svg' alt='icon' />
                    </NoobListItemIcon>
                    <NoobListItemText onClick={():Promise<boolean>=>router.push(url,as,{shallow:true})} style={{cursor:"pointer"}}>
                      {title}
                    </NoobListItemText>
                  </NoobListItem>
                  
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
