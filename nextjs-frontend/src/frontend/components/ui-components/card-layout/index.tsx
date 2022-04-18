import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import styled from "@emotion/styled";

interface CardLayoutProp {
  title?: string;
  styles?:object
}

const NoobCardHeader = styled(CardHeader)(() => ({
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
}));

const NoobCard = styled(Card)(() => ({
  borderRadius: "10px",
  marginBottom: "15px",
}));

const CardLayout: React.FC<CardLayoutProp> = ({ title, children,styles={} }) => {
  return (
    <NoobCard>
      {title ? (
        <NoobCardHeader
          title={<Typography textAlign={"left"}>{title}</Typography>}
        />
      ) : null}

      <CardContent sx={{...styles}}>{children}</CardContent>
    </NoobCard>
  );
};

export default CardLayout;
