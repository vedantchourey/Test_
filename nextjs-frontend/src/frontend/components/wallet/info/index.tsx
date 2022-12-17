import { Box, Button, Card, Divider, Grid,TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../../redux-store/redux-store";
import { setWalletDetails } from "../../../redux-store/wallet/wallet.-slice";
import { getAuthHeader } from "../../../utils/headers";
import WalletCard from "../../ui-components/wallet-card";
import Balance from "../balance";
import Transactions from "../transactions";
import sha256 from 'sha256';
import { isDeviceTypeSelector } from "../../../redux-store/layout/layout-selectors";
import { deviceTypes } from "../../../redux-store/layout/device-types";
import { useFormik } from "formik";
import Link from "next/link";

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
    sessionStorage.setItem('id',requestId)
    setStan(v4())
    

    const sha = sha256(("NOOB6775" + "|" + requestId + "|" + "S87uv7834rt" + "|" + "vfg896y45I"))
    setSha256(sha)
    console.log('sha -> ', sha)
    
  }

  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  const formik = useFormik({
    initialValues: {
      mobile: "",
     otp:""},
    onSubmit: async (data, { setSubmitting }) => {
      setSubmitting(true);
      <Link href={"https://sandbox.veri5digital.com/video-id-kyc/_initWebVIKYC"} />
      
      setSubmitting(false);
    },
  });

  
  return (
    <WalletCard>
      <Grid container columnSpacing={2} rowSpacing={2}>

      <Card sx={{ mt: 2 }}>
        <Grid container padding={2} columnSpacing={1} rowSpacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" marginBottom={"16px"} marginTop={2}>
              KYC Verification
            </Typography>
            <Divider
              variant="fullWidth"
              style={{
                borderColor: "rgba(255, 255, 255, 0.1)",
                marginTop: !isDesktop ? 0 : "30px",
                marginBottom: "30px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={!isDesktop ? 0 : 3}>
              <Grid container spacing={1} marginTop={!isDesktop ? 0 : 3}>
                <Grid item xs={!isDesktop ? 12 : 4}>
                  <TextField
                    margin="none"
                    label="Client Code"
                    size="small"
                    name="client_code"
                    fullWidth
                    value={"NOOB6775"}
                  />
                </Grid>
                <Grid item xs={!isDesktop ? 12 : 4}>
                  <TextField
                    margin="none"
                    label="api_key"
                    size="small"
                    fullWidth
                    value={"S87uv7834rt"}
                   />
                </Grid>
                <Grid item xs={!isDesktop ? 12 : 4}>
                  <TextField
                    margin="none"
                    label="Redirect url"
                    size="small"
                    fullWidth
                    value={"http://localhost:3000/wallet/info"}
                  />
                </Grid>
                <Grid item xs={!isDesktop ? 12 : 4}>
                  <TextField
                    margin="none"
                    label="request_id"
                    size="small"
                    fullWidth
                    value={requirestCode}
                  />
                </Grid>
                <Grid item xs={!isDesktop ? 12 : 4}>
                  <TextField
                    margin="none"
                    label="Stan"
                    size="small"
                    fullWidth
                    value={stan}
                   />
                </Grid>
                <Grid item xs={!isDesktop ? 12 : 4}>
                  <TextField
                    margin="none"
                    label="Hash"
                    size="small"
                    value={sha256Data}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={!isDesktop ? 12 : 4}>
                  <TextField
                    margin="none"
                    label="mobile"
                    size="small"
                    name="mobile"
                    fullWidth
                    value={formik.values.mobile}
                  />
                </Grid>
                <Grid item xs={!isDesktop ? 12 : 4}>
                  <TextField
                    margin="none"
                    label="OTP-required"
                    size="small"
                    name="mobile"
                    fullWidth
                    value={formik.values.otp}
                   />
                </Grid>
              </Grid>
                <Box display={"flex"} justifyContent={"flex-end"}>
                  <Button
                    variant="contained"
                    // disabled={formik.isSubmitting}
                    onClick={formik.submitForm}
                  >
                    Proceed
                  </Button>
                </Box>
            
            </Box>
          </Grid>
        </Grid>
      </Card>
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
