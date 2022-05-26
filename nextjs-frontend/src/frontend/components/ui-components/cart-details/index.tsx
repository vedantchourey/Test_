import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux-store/redux-store";
import { cartDetailsSelector } from "../../../redux-store/wallet/wallet-selector";

const CartDetails: React.FC = () => {
  const cart_details = useAppSelector(cartDetailsSelector);
  return (
    <React.Fragment>
      <Card
        style={{ height: "100%", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <Grid container direction={"column"}>
          <Grid item sm={12} display="flex" justifyContent={"space-between"}>
            <Box
              style={{
                height: "80px",
                width: "80px",
                background: "#6932F9",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px 0px 20px 20px",
              }}
            >
              <Typography variant="h4">₹</Typography>
            </Box>
            <Box style={{ marginTop: "44px", marginRight: "20px" }}>
              <Typography variant="h1">
                {" "}
                {cart_details?.total_amount}{" "}
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              style={{ margin: "30px 20px 30px 20px" }}
            >
              <Typography>Amount</Typography>
              <Typography> ₹{cart_details?.amount} </Typography>
            </Box>
            <Divider
              style={{
                margin: "0px 20px 0px 20px",
                color: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Grid>

          <Grid item>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              style={{ margin: "30px 20px 30px 20px" }}
            >
              <Typography>GST</Typography>
              <Typography> {cart_details?.gst} </Typography>
            </Box>
            <Divider
              style={{
                margin: "0px 20px 0px 20px",
                color: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Grid>

          <Grid item>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              style={{ margin: "30px 20px 30px 20px" }}
            >
              <Typography>Service Charge</Typography>
              <Typography> {cart_details?.service_charge} </Typography>
            </Box>
            <Divider
              style={{
                margin: "0px 20px 0px 20px",
                color: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Grid>

          <Grid item>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              style={{ margin: "30px 20px 30px 20px" }}
            >
              <Typography>Total</Typography>
              <Typography> ₹{cart_details?.total_amount} </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default CartDetails;