import React from "react";
import { Card, CardContent, CardContentProps, CardHeader, Typography } from "@mui/material";
import styled from "@emotion/styled";

interface CardProp {
  title?: string;
  contentProps?:CardContentProps;
}

const NoobCardHeader = styled(CardHeader)(() => ({
  marginBottom: "1px",
}));

const NoobCard = styled(Card)(() => ({
  height: "100%",
  borderRadius: "0px",
  marginBottom: "15px",
}));

const ViewCard: React.FC<CardProp> = ({ title, children, contentProps }) => {
  return (
    <NoobCard sx={{marginX:{xs:"10px",sm:"10px",md:"70px"}}}>
      {title ? (
        <NoobCardHeader
          title={<Typography textAlign={"left"} color={"rgba(105,50,249,1)"}>{title}</Typography>}
        />
      ) : null}

      <CardContent {...contentProps}>{children}</CardContent>
    </NoobCard>
  );
};

export default ViewCard;
