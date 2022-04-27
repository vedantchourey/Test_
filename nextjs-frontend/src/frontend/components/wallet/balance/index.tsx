import { Box, Button, Card, Chip, Divider, Grid, Typography } from "@mui/material";
import React from "react";

const Balance = () => {
  return (
    <React.Fragment>
      <Card >
        <Grid container padding={2} columnSpacing={1} rowSpacing={1}>
          <Grid item md={6}>
            <Typography
              variant="h6"
              marginBottom={"16px"}
              marginLeft="30px"
              marginTop={2}
            >
              {" "}
              Your Balance{" "}
            </Typography>
            <Typography textAlign={"start"} marginLeft="30px">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Corrupti, inventore.
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Box display="flex" marginTop={2} style={{background:"#08001C", border:"1px solid rgba(255, 255, 255, 0.1)"}} height={76} width={"100%"}  justifyContent={"center"} alignItems={"center"}>
                <Typography color={"#F09633"} variant={"h6"} display="flex" justifyContent={"center"} alignItems={"center"}>
                    125 Credits
                </Typography>
            </Box>
          </Grid>

          <Grid item md={12}>
            <Divider
              variant="fullWidth"
              style={{
                borderColor: "rgba(255, 255, 255, 0.1)",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            />
          </Grid>
          <Grid item display={"flex"}>
            <Button
              style={{
                height: 56,
                width: 194,
                color: "#ffffff",
                backgroundColor: "#F09633",
                marginRight: "30px",
                marginLeft: "30px"
              }}
            >
              Withdraw
            </Button>
            <Button
              style={{
                height: 56,
                width: 194,
                backgroundColor: "#6932F9",
                color: "#ffffff",
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
