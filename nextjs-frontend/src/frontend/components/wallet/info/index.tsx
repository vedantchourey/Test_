import { Box, Button, Card, Grid, Typography } from "@mui/material";
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
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import frontendConfig from "../../../utils/config/front-end-config";

const WalletInfo: React.FC = () => {
  const appDispatch = useAppDispatch();

  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const [requirestCode, setRequirestCode] = useState("")
  const [sha256Data, setSha256] = useState("")
  const [stan, setStan] = useState("");
  const [KycVerified, setKycVerified] = useState(false);

  const fetchWalletDetails = async (): Promise<void> => {
    const headers = await getAuthHeader();
    const { data } = await axios.get(`/api/wallet/details`, {
      headers,
    });
    if (data) appDispatch(setWalletDetails(data));
  };
  useEffect(() => {
    fetchWalletDetails();
    if(!query.requestId){
      handleOnKyc();
    } else{
      fetchKyc();
    }
  }, []);

  const handleOnKyc = (): any => {
    
    const requestId = v4();
    const stanId = v4();

    setRequirestCode(requestId);
    localStorage.setItem('id',requestId);
    localStorage.setItem('stanId',stanId);
    setStan(stanId);
    const sha = sha256((frontendConfig.VERIFY_CLIENT_CODE + "|" + requestId + "|" + frontendConfig.VERIFY_AADHAAR_API_KYC + "|" + frontendConfig.VERIFY_AADHAAR_SALT));
    setSha256(sha);
  }

  const fetchKyc = async (): Promise<any> => {
    const userId = query.userId;
    const stanId = localStorage.getItem("stanId");

    const sha = sha256(
      frontendConfig.VERIFY_CLIENT_CODE + "|" + userId + "|" + frontendConfig.VERIFY_AADHAAR_API_KYC + "|" + frontendConfig.VERIFY_AADHAAR_SALT
    );

    const data: any = {
      headers: {
        client_code: frontendConfig.VERIFY_CLIENT_CODE,
        stan: stanId,
        function_code: "REVISED",
        function_sub_code: "DEFAULT",
      },
      request: {
        user_id: userId,
        api_key: frontendConfig.VERIFY_AADHAAR_API_KYC,
        hash: sha,
      },
    };

    const headers = await getAuthHeader();

    await axios
      .post(`/api/kyc/fetchKyc`, data, {
        headers: headers,
      })
      .then(() => {
        router.push("/wallet/info");
      })
      .catch((err) => {
        console.error("error ->",err);
      });
  }

  
  return (
    <WalletCard>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} md={7}>
          <Balance setKycVerified={setKycVerified} />
          {!KycVerified && (
            <Card sx={{ mt: 2, mb: 2 }}>
              <Grid container padding={2} columnSpacing={1} rowSpacing={1}>
                <Grid item xs={12}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant="h6">KYC Verification</Typography>
                    <form
                      method="post"
                      action={`${frontendConfig.VERIFY_AADHAAR_KYC_URL}/_initWebVIKYC`}
                    >
                      <input
                        type="hidden"
                        name="client_code"
                        placeholder="<<Your Client Code>>"
                        value={frontendConfig.VERIFY_CLIENT_CODE}
                      />
                      <input type="hidden" name="api_key" value={frontendConfig.VERIFY_AADHAAR_API_KYC} />
                      <input
                        type="hidden"
                        name="redirect_url"
                        value="http://localhost:3000/wallet/info"
                      />
                      <input
                        type="hidden"
                        name="request_id"
                        value={requirestCode}
                      />
                      <input type="hidden" name="stan" value={stan} />
                      <input type="hidden" name="hash" value={sha256Data} />
                      <input
                        type="hidden"
                        name="mobile"
                        placeholder="<<registered mobile number value>>"
                      />
                      <input type="hidden" name="otp_required" value="N" />
                      <Button type="submit" variant="contained">
                        Proceed
                      </Button>
                    </form>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          <Transactions />
        </Grid>
      </Grid>
    </WalletCard>
  );
};

export default WalletInfo;
