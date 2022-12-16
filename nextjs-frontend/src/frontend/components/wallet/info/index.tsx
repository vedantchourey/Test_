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
  }, []);

  const handleOnKyc = () => {
    console.log("here");
    let requestId = v4();
    setRequirestCode(requestId)
    setStan(v4())
    

    const sha = sha256(("NOOB6775" + "|" + requestId + "|" + "Jsh39koppg" + "|" + "s32rlk2a2"))
    setSha256(sha)
    console.log('sha -> ', sha)
    
  }

  return (
    <WalletCard>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Button onClick={handleOnKyc}>KYC TESTING</Button>

        <form method="post" action="https://sandbox.veri5digital.com/video-id-kyc/_initWebVIKYC">
          <input type="text" name="client_code" placeholder="<<Your Client Code>>" value={"NOOB6775"} />
          <input type="text" name="api_key" value="Jsh39koppg" />
          <input type="text" name="redirect_url" value="http://localhost:3000" />
          <input type="text" name="request_id" value={requirestCode} />
          <input type="text" name="stan" value={stan} />
          <input type="text" name="hash" value={sha256Data} />
          <input
            type="text"
            name="mobile"
            placeholder="<<registered mobile number value>>"
          />
          <input type="text" name="otp_required" placeholder="<”Y” | ”N”>" />
          <button type="submit">Proceed </button>
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
