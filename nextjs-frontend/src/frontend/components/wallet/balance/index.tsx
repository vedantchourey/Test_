import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux-store/redux-store";
import * as yup from "yup";
import { walletDetaislSelector } from "../../../redux-store/wallet/wallet-selector";
import { getAuthHeader } from "../../../utils/headers";
import axios from "axios";

const Balance = (): any => {
  const wallet = useAppSelector(walletDetaislSelector);
  const [isVerified, setIsVerified] = useState(false);
  const validationSchema = yup.object({
    mobile: yup.string().required("Mobile is required"),
    accNo: yup.string().required("Account number is required"),
    ifsc: yup.string().required("IFSC code is required"),
    name: yup.string().required("Name code is required"),
    aadhar_no: yup.string().required("aadhar is required"),
  });

  const getKycDetails = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get(`/api/kyc`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.length) {
          const kycData: any = res.data[0];
          formik.setValues({
            mobile: kycData.mobile,
            accNo: kycData.account_no,
            aadhar_no: kycData.aadhar_no,
            ifsc: kycData.ifsc,
            name: kycData.name,
          });
          setIsVerified(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submmitKycDetails = async (data: any): Promise<void> => {
    const headers = await getAuthHeader();
    await axios
      .post(`/api/kyc`, data, {
        headers: headers,
      })
      .then((res) => {
        if (res.status) {
          setIsVerified(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      accNo: "",
      ifsc: "",
      name: "",
      aadhar_no: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      setSubmitting(true);
      await submmitKycDetails(data);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    getKycDetails();
  }, []);

  return (
    <React.Fragment>
      <Card>
        <Grid container padding={2} columnSpacing={1} rowSpacing={1}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" marginBottom={"16px"} marginTop={2}>
              Your Balance
            </Typography>
            <Typography textAlign={"start"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Corrupti, inventore.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              display="flex"
              marginTop={2}
              style={{
                background: "#08001C",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              height={76}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                color={"#F09633"}
                variant={"h6"}
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                {wallet?.balance} Credits
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider
              variant="fullWidth"
              style={{
                borderColor: "rgba(255, 255, 255, 0.1)",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} display={"flex"}></Grid>
          <Grid item xs={12} md={6} display={"flex"}>
            <Button
              fullWidth
              style={{
                height: 56,
                backgroundColor: "#6932F9",
                color: "#ffffff",
              }}
              onClick={(): void => {
                Router.push("credit/add");
              }}
            >
              Add Credits
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ mt: 2 }}>
        <Grid container padding={2} columnSpacing={1} rowSpacing={1}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" marginBottom={"16px"} marginTop={2}>
              Available for Withdraw
            </Typography>
            <Typography textAlign={"start"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Corrupti, inventore.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              display="flex"
              marginTop={2}
              style={{
                background: "#08001C",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              height={76}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                color={"#F09633"}
                variant={"h6"}
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                {wallet?.balance} INR.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider
              variant="fullWidth"
              style={{
                borderColor: "rgba(255, 255, 255, 0.1)",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} display={"flex"}></Grid>
          <Grid item xs={12} md={6} display={"flex"}>
            <Button
              fullWidth
              disabled={!isVerified}
              style={{
                height: 56,
                color: "#ffffff",
                backgroundColor: isVerified
                  ? "#F09633"
                  : "rgba(255,255,255,0.2)",
              }}
            >
              Withdraw
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ mt: 2 }}>
        <Grid container padding={2} columnSpacing={1} rowSpacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" marginBottom={"16px"} marginTop={2}>
              KYC Details
            </Typography>
            <Divider
              variant="fullWidth"
              style={{
                borderColor: "rgba(255, 255, 255, 0.1)",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={3}>
              <Grid container spacing={1} marginTop={3}>
                <Grid item xs={6}>
                  <TextField
                    disabled={isVerified}
                    margin="none"
                    label="Aadhar Number"
                    size="small"
                    name="aadhar_no"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.aadhar_no}
                    helperText={
                      formik.touched.aadhar_no && formik.errors.aadhar_no
                    }
                    error={Boolean(
                      formik.touched.aadhar_no && formik.errors.aadhar_no
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled={isVerified}
                    margin="none"
                    label="Bank Account Name"
                    size="small"
                    name="name"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    helperText={formik.touched.name && formik.errors.name}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled={isVerified}
                    margin="none"
                    label="Account Number"
                    size="small"
                    name="accNo"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.accNo}
                    helperText={formik.touched.accNo && formik.errors.accNo}
                    error={Boolean(formik.touched.accNo && formik.errors.accNo)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled={isVerified}
                    margin="none"
                    label="IFSC Code"
                    size="small"
                    name="ifsc"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ifsc}
                    helperText={formik.touched.ifsc && formik.errors.ifsc}
                    error={Boolean(formik.touched.ifsc && formik.errors.ifsc)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    disabled={isVerified}
                    margin="none"
                    label="Phone number"
                    size="small"
                    name="mobile"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                    error={Boolean(
                      formik.touched.mobile && formik.errors.mobile
                    )}
                  />
                </Grid>
              </Grid>
              {!isVerified && (
                <Box display={"flex"} justifyContent={"flex-end"}>
                  <Button
                    variant="contained"
                    disabled={formik.isSubmitting}
                    onClick={formik.submitForm}
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default Balance;
