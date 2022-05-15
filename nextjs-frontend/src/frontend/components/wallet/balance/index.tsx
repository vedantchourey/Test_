import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import Router from "next/router";
import React from "react";
import { useAppSelector } from "../../../redux-store/redux-store";
import { walletDetaislSelector } from "../../../redux-store/wallet/wallet-selector";

const Balance = (): any => {
  const wallet = useAppSelector(walletDetaislSelector);
  return (
    <React.Fragment>
      <Card>
        <Grid container padding={2} columnSpacing={1} rowSpacing={1}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" marginBottom={"16px"} marginTop={2}>
              {" "}
              Your Balance{" "}
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
          <Grid item xs={12} md={6} display={"flex"}>
            <Button
              fullWidth
              style={{
                height: 56,
                color: "#ffffff",
                backgroundColor: "#F09633",
              }}
            >
              Withdraw
            </Button>
          </Grid>
          <Grid item xs={12} md={6} display={"flex"}>
            <Button
              fullWidth
              style={{
                height: 56,
                backgroundColor: "#6932F9",
                color: "#ffffff",
              }}
              onClick={() => {
                Router.push("credit/add");
              }}
            >
              Add Credits
            </Button>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default Balance;
