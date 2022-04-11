import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const useStyles = makeStyles(() =>
  createStyles({
    accordion: {
      borderRadius: "10px",
    },
  }));

interface AccordionLabelProp {
  title: string;
  subTitle?:string;
  expanded?: boolean;
  icon?:{
    expanded?:JSX.Element
    notExpanded?:JSX.Element
  }
}

const NoobAccordionSummaryAlt = styled(AccordionSummary)(() => ({
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  minHeight: "41px",
}));

const NoobAccordionDetailsAlt = styled(AccordionDetails)(() => ({
  padding: 0,
  margin: "18px 0rem",
}));

const NoobAccordionAlt = styled(Accordion)(() => ({
  "&:before": {
    background: "none",
  },
  marginBottom: "10px",
  marginTop: "10px",
  boxShadow: "none",
}));

const AccordionAlt: React.FC<AccordionLabelProp> = ({ title, subTitle, children,icon }) => {
  const classes = useStyles();
  const [isExapnded, setExpanded] = React.useState(false);

  const expandedIcon = ():JSX.Element =>{
    if(icon){
      if(icon.expanded && isExapnded){
        return icon.expanded;
      }else if(icon.notExpanded && !isExapnded){
        return icon.notExpanded;
      }
    }
    if(isExapnded){
      return <img src="/icons/Minus.svg" alt="minus"/>
    }
    return <img src="/icons/Plus.svg" alt="plus"/>
    
  }
  return (
    <NoobAccordionAlt onChange={(e, expanded):void => setExpanded(expanded)}>
      <NoobAccordionSummaryAlt
        className={classes.accordion}
        expandIcon={expandedIcon()}
      >
        <Box display={"flex"} flexDirection="column" alignItems={"flex-start"}>
          <Typography variant="subtitle1">{title}</Typography>
          {subTitle?<Typography variant="subtitle1" color={"rgba(229, 229, 229, 0.5)"}>{subTitle}</Typography>:null}
        </Box>
      </NoobAccordionSummaryAlt>
      <NoobAccordionDetailsAlt>{children}</NoobAccordionDetailsAlt>
    </NoobAccordionAlt>
  );
};

export default AccordionAlt;
