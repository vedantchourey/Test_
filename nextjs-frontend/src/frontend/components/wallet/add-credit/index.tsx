import {
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WalletCard from "../../ui-components/wallet-card";
import FormLabel from "../../ui-components/formlabel";
import { getAuthHeader } from "../../../utils/headers";
import axios from "axios";
import Router from "next/router";
import { useAppDispatch } from "../../../redux-store/redux-store";
import { setCartDetails } from "../../../redux-store/wallet/wallet.-slice";
const AddCredit: React.FC = () => {
  const [amount, setAmount] = useState("0.00");
  const [errorMsg, setErrorMsg] = useState("");
  const appDispatch = useAppDispatch();
  const [razorPay, setRazorPay] = useState(false);
  useEffect((): void => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = (): void => {
      setRazorPay(true);
    };
    script.onerror = (): void => {
      setRazorPay(false);
    };
    document.body.appendChild(script);
  }, []);

  const addFunds = async (): Promise<void> => {
    if (amount === "") return setErrorMsg("Please enter amount");
    if (Number(amount) === 0)
      return setErrorMsg("Amount should be greater than 1.");
    if (!razorPay) return setErrorMsg("Something went wrong. Try again later");
    const headers = await getAuthHeader();
    axios
      .post(
        `/api/payment/create-order`,
        {
          amount,
        },
        {
          headers,
        }
      )
      .then(({ data }): void => {
        console.warn(data);
        appDispatch(setCartDetails(data));
        const options = {
          ...data,
          name: "Learning To Code Online",
          description: "Test Wallet Transaction",
          handler: async function (response: any): Promise<void> {
            axios.post(`/api/payment/update-order`, response, { headers });
            Router.push("credit/success");
          },
        };
        // @ts-expect-error: ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((): void => {
        setErrorMsg("Something went wrong. Try again later");
      });
  };
  
  return (
    <React.Fragment>
      <WalletCard>
        <Card
          style={{
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Container maxWidth={"sm"}>
            <Grid
              container
              alignItems="center"
              columnSpacing={2}
              rowSpacing={2}
              marginBottom={4}
              marginTop={2}
            >
              <Grid
                item
                xs={12}
                display="flex"
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Typography>Add Credits</Typography>
                <Typography marginTop={1}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum,
                  sunt?
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={1} display="flex">
                <FormControl fullWidth>
                  <FormLabel label={"Amount"}></FormLabel>
                  <OutlinedInput
                    value={amount}
                    onChange={(e): void => {
                      setAmount(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    id="input"
                  />
                  {errorMsg !== "" && (
                    <FormHelperText> {errorMsg} </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography marginY={1}>Checkout with</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Button
                  fullWidth
                  style={{
                    height: "56px",
                    border: "1px solid #6932F9",
                    color: "#ffffff",
                    marginRight: "20px",
                  }}
                >
                  Debit or Credit Card
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Button
                  fullWidth
                  style={{
                    height: "56px",
                    background: "#FFC439",
                    color: "#ffffff",
                  }}
                  onClick={addFunds}
                >
                  RazorPAy
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Card>
      </WalletCard>
    </React.Fragment>
  );
};

export default AddCredit;
