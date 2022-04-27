import { Grid } from "@mui/material";
import WalletCard from "../../ui-components/wallet-card";
import Balance from "../balance";
import Transactions from "../transactions";

const WalletInfo: React.FC = () => {
  return (
    <WalletCard>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={7}>
          <Balance />
        </Grid>
        <Grid item xs={12} md={5}>
          <Transactions />
        </Grid>
      </Grid>
    </WalletCard>
  );
};

export default WalletInfo;
