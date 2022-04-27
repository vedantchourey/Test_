import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import WalletCard from "../../ui-components/wallet-card";
import {ReactComponent as Paypal} from '../../../../../public/icons/Paypal.svg';

const AddCredit = () => {
  return (
    <React.Fragment>
      <WalletCard>
        <Card
          style={{
            // height: "470px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Grid container direction={"column"} alignItems="center">
            <Grid item>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "60px",
                }}
              >
                <Typography>Add Credits</Typography>
              </Box>
              <Box style={{ marginTop: "16px" }}>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum,
                  sunt?
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <FormControl>
                  <InputLabel shrink>Amount</InputLabel>
                  <OutlinedInput
                    defaultValue="0.00"
                    id="input"
                    style={{
                      marginTop: "12px",
                      width: "640px",
                      height: "56px",
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item>
              <Typography style={{ marginTop: "30px", marginBottom: "30px" }}>
                Checkout with
              </Typography>
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                flexDirection="row"
                marginBottom={4}
              >
                <Button
                  style={{
                    height: "56px",
                    width: "300px",
                    border: "1px solid #6932F9",
                    color: "#ffffff",
                    marginRight: "20px",
                  }}
                >
                  Debit or Credit Card
                </Button>
                <Button
                  style={{
                    height: "56px",
                    width: "300px",
                    background: "#FFC439",
                    color: "#ffffff",
                  }}
                >
                  <Paypal />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </WalletCard>
    </React.Fragment>
  );
};

export default AddCredit;
