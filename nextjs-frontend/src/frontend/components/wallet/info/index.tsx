import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux-store/redux-store";
import { setWalletDetails } from "../../../redux-store/wallet/wallet.-slice";
import { getAuthHeader } from "../../../utils/headers";
import WalletCard from "../../ui-components/wallet-card";
import Balance from "../balance";
import Transactions from "../transactions";

const WalletInfo: React.FC = () => {
  const appDispatch = useAppDispatch();
  const fetchWalletDetails = async (): Promise<void> => {
    const headers = await getAuthHeader();
    const { data } = await axios.get(`/api/wallet/details`, {
      headers,
    });
    if (data) appDispatch(setWalletDetails(data));
  };
  useEffect(() => {
    fetchWalletDetails();
  }, []);
  return (
    <WalletCard>
      <Grid container columnSpacing={2} rowSpacing={2}>
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
