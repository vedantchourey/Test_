import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuthHeader } from "../../../utils/headers";
import WalletCard from "../../ui-components/wallet-card";
import Balance from "../balance";
import Transactions from "../transactions";

const WalletInfo: React.FC = () => {
  const [apiResp, setApiResp] = useState({
    wallet: {},
    transaction: [],
  });
  const fetchWalletDetails = async () => {
    const headers = await getAuthHeader();
    let { data } = await axios.get(`/api/wallet/details`, {
      headers,
    });
    if (data) setApiResp(data);
  };
  useEffect(() => {
    fetchWalletDetails();
  }, []);
  return (
    <WalletCard>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} md={7}>
          <Balance wallet={apiResp.wallet} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Transactions transaction={apiResp.transaction} />
        </Grid>
      </Grid>
    </WalletCard>
  );
};

export default WalletInfo;
