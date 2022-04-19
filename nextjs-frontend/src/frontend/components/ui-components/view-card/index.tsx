import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import styled from "@emotion/styled";

interface CardProp {
  title?: string;
}

const NoobCardHeader = styled(CardHeader)(() => ({
  marginBottom: "1px",
}));

const NoobCard = styled(Card)(() => ({
  height: "100%",
  borderRadius: "0px",
  marginLeft: "70px",
  marginRight: "70px",
  marginBottom: "15px",
}));

const ViewCard: React.FC<CardProp> = ({ title, children }) => {
  return (
    <NoobCard>
      {title ? (
        <NoobCardHeader
          title={<Typography textAlign={"left"} color={"rgba(105,50,249,1)"}>{title}</Typography>}
        />
      ) : null}

      <CardContent>{children}</CardContent>
    </NoobCard>
  );
};

export default ViewCard;
