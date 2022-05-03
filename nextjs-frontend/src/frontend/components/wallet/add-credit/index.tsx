import {
  
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import WalletCard from "../../ui-components/wallet-card";
import { ReactComponent as Paypal } from "../../../../../public/icons/Paypal.svg";
import FormLabel from "../../ui-components/formlabel";

const AddCredit:React.FC = () => {
  return (
    <React.Fragment>
      <WalletCard>
        <Card
          style={{
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Container maxWidth={"sm"} >
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
                  <OutlinedInput defaultValue="0.00" id="input" />
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
                >
                  <Paypal />
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
