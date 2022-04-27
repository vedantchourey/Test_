import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as DoneIcon } from "../../../../../public/icons/DoneIcon.svg";

const WalletMessage = () => {
  return (
    <React.Fragment>
      <Card
        style={{ height: "100%", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <Grid container direction={"column"} alignItems="center">
          <Grid item>
            <Box
              style={{
                height: "48px",
                width: "48px",
                borderRadius: "50%",
                background: "#19D873",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "60px 0px 60px 0px",
              }}
            >
              <DoneIcon style={{}} />
            </Box>
          </Grid>

          <Grid item>
            <Box>
              <Typography>Thank you for your order</Typography>
              <Typography style={{marginTop:"15px"}}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                eaque rem nisi veritatis laboriosam? Dolor mollitia cupiditate
                laborum aspernatur ducimus.
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box style={{ marginTop: "30px" }}>
              <Button
                style={{
                  color: "#ffffff",
                  padding: "16px, 59px, 16px, 59px",
                  border: "1px solid #6932F9",
                }}
              >
                {" "}
                Home Page
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default WalletMessage;
