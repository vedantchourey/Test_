import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as DoneIcon } from "../../../../../public/icons/DoneIcon.svg";
import { ReactComponent as ShapeIcon } from "../../../../../public/icons/ShapeIcon.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../../../public/icons/arrowLeftIcon.svg";

interface WalletMessageProps {
  isSuccess: boolean;
}

const WalletMessage: React.FC<WalletMessageProps> = ({ isSuccess }) => {
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
              {isSuccess ? <DoneIcon /> : <ShapeIcon />}
            </Box>
          </Grid>

          <Grid item>
            <Box>
              {isSuccess ? (
                <Typography>Thank you for your order</Typography>
              ) : (
                <Typography style={{ textAlign: "center" }}>
                  Something went wrong. Please try to checkout again
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item>
            <Box style={{ marginTop: 30, marginBlock: 30 }}>
              {isSuccess ? (
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
              ) : (
                <Button startIcon={<ArrowLeftIcon />}>
                   Return to checkout
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
};

export default WalletMessage;
