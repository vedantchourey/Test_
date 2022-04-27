import { Grid } from "@mui/material";
import React from "react";
import CartDetails from "../../ui-components/cart-details";
import WalletCard from "../../ui-components/wallet-card";
import WalletMessage from "../../ui-components/wallet-message.tsx";

const Success = () => {
  return (
    <React.Fragment>
      <WalletCard>
        <Grid container columnSpacing={2}>
            <Grid item md={8}>
                <WalletMessage />
            </Grid>
          <Grid item md={4}>
            <CartDetails />
          </Grid>
        </Grid>
      </WalletCard>
    </React.Fragment>
  );
};

export default Success;
