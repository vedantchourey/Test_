import React from "react";
import { Card, CardContent, Divider, useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

const NoobCard = styled(Card)(() => ({
  height: "100%",
  borderRadius: "0px",
  marginBottom: "15px",
  background: "rgba(8, 0, 28, 1)",
}));

const WalletCard: React.FC = ({ children }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <NoobCard style={!isSmall?{marginLeft:"70px",marginRight:"70px"}:{}}>
      <Divider
        variant="middle"
        style={{
          color: "white",
          fontWeight: 700,
          marginTop: 64,
          fontSize: 32
        }}
      >
        Wallet
      </Divider>

      <CardContent style={{ marginTop: 20 }}>{children}</CardContent>
    </NoobCard>
  );
};

export default WalletCard;
