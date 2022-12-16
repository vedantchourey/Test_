import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAppDispatch } from "../../../redux-store/redux-store";
import { setWalletDetails } from "../../../redux-store/wallet/wallet.-slice";
import { getAuthHeader } from "../../../utils/headers";
import WalletCard from "../../ui-components/wallet-card";
import Balance from "../balance";
import Transactions from "../transactions";
import sha256 from 'sha256';

const WalletInfo: React.FC = () => {
  const appDispatch = useAppDispatch();
  const [requirestCode, setRequirestCode] = useState("")
  const [sha256Data, setSha256] = useState("")
  const [stan, setStan] = useState("");

  const fetchWalletDetails = async (): Promise<void> => {
    const headers = await getAuthHeader();
    const { data } = await axios.get(`/api/wallet/details`, {
      headers,
    });
    if (data) appDispatch(setWalletDetails(data));
  };
  useEffect(() => {
    fetchWalletDetails();
    handleOnKyc();
  }, []);

  const handleOnKyc = () => {
    console.log("here");
    let requestId = v4();
    setRequirestCode(requestId)
    setStan(v4())
    

    const sha = sha256(("NOOB6775" + "|" + requestId + "|" + "S87uv7834rt" + "|" + "vfg896y45I"))
    setSha256(sha)
    console.log('sha -> ', sha)
    
  }

  return (
    <WalletCard>
      <Grid container columnSpacing={2} rowSpacing={2}>

        <form method="post" action="https://sandbox.veri5digital.com/video-id-kyc/_initWebVIKYC">
          <input type="hidden" name="client_code" placeholder="<<Your Client Code>>" value={"NOOB6775"} />
          <input type="hidden" name="api_key" value="S87uv7834rt" />
          <input type="hidden" name="redirect_url" value="http://localhost:3000/wallet/info" />
          <input type="hidden" name="request_id" value={requirestCode} />
          <input type="hidden" name="stan" value={stan} />
          <input type="hidden" name="hash" value={sha256Data} />
          <input
            type="hidden"
            name="mobile"
            placeholder="<<registered mobile number value>>"
          />
          <input type="hidden" name="otp_required" value="N" />
          <Button type="submit">Proceed</Button>
        </form>

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
