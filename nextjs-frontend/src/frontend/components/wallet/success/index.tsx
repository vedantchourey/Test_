import { Grid } from "@mui/material";
import React from "react";
import CartDetails from "../../ui-components/cart-details";
import WalletCard from "../../ui-components/wallet-card";
import WalletMessage from "../../ui-components/wallet-message.tsx";

const Success:React.FC = () => {
  return (
    <React.Fragment>
      <WalletCard>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <WalletMessage isSuccess={true} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CartDetails />
          </Grid>
        </Grid>
      </WalletCard>
    </React.Fragment>
  );
};

export default Success;
