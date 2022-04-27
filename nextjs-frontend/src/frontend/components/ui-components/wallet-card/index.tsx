import React from "react";
import {
  Card,
  CardContent,
  Divider
} from "@mui/material";
import styled from "@emotion/styled";

const NoobCard = styled(Card)(() => ({
  height: "100%",
  borderRadius: "0px",
  marginLeft: "70px",
  marginRight: "70px",
  marginBottom: "15px",
  background: "rgba(8, 0, 28, 1)"
}));

const WalletCard:React.FC = ({ children }) => {
  return (
    <NoobCard>
      <Divider
        variant="middle"
        style={{
          color: "white",
          fontWeight: 700,
          marginTop: 64,
        }}
      >
        Wallet
      </Divider>

      <CardContent style={{marginTop:20}}>{children}</CardContent>
    </NoobCard>
  );
};

export default WalletCard;
