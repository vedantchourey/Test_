import {
  Box,
  Divider,
  FormControl,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import ViewCard from "../../ui-components/view-card";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    description: {
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: "12px",

      color: "rgba(255,255,255,1)",
    },
    title: {
      color: "rgba(181, 181, 181, 1)",
    },
    subTitle: {
      color: "rgba(255, 255, 255, 1)",
    },
  }));

const Details: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ViewCard title="About the tournament">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography align="left" marginBottom="5px">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex in
                dignissimos sunt excepturi laboriosam, amet, rerum consectetur
                doloremque dolorum quae voluptates eligendi aperiam odit
                quisquam fugit dolore ea perspiciatis dolorem incidunt aliquid.
                Eum ab voluptatum autem possimus ullam laboriosam magni
                similique, laborum optio nesciunt ut nihil quisquam ex, beatae
                officiis?
              </Typography>
              <Typography align="left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                dicta voluptates nemo, quia, quasi ipsum quos consectetur
                ducimus totam, enim illo! Optio a quibusdam nobis distinctio
                alias sunt aliquid quidem.
              </Typography>
              <Divider style={{ marginBottom: "30px", marginTop: "30px" }} />
              <Grid container rowSpacing={1} columnSpacing={5}>
                <Grid item md={4}>
                  <Box marginTop={1}>
                    <LinearProgress
                      variant="determinate"
                      color={"secondary"}
                      value={80}
                    />
                  </Box>
                  <Box
                    display="flex"
                    marginTop={1}
                    alignItems={"center"}
                    justifyContent="space-between"
                  >
                    <Box width={"45%"} display="flex">
                      <Typography marginRight={1}>50</Typography>
                      <Typography
                        color={"#5A5A5A"}
                        fontWeight={600}
                        letterSpacing={"-0.011em"}
                        textTransform={"uppercase"}
                      >
                        Total Slots
                      </Typography>
                    </Box>
                    <Box width={"45%"} display="flex">
                      <Typography marginRight={1}>12</Typography>
                      <Typography
                        color={"#5A5A5A"}
                        fontWeight={600}
                        letterSpacing={"-0.011em"}
                        textTransform={"uppercase"}
                      >
                        Left Slots
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Typography className={classes.title}>
                    {" "}
                    Tournament Type
                  </Typography>
                  <Typography className={classes.subTitle}>
                    {" "}
                    Single Elimination{" "}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography className={classes.title}> Prize Pool</Typography>
                  <Typography className={classes.subTitle}>
                    {" "}
                    450$ USD{" "}
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <Typography className={classes.title}> Platform </Typography>
                  <Typography className={classes.subTitle}> PC </Typography>
                </Grid>
                <Grid item md={3} display="flex" justifyContent={"flex-end"}>
                  <Typography marginRight={1}>
                    Tournament Entry Status:
                  </Typography>
                  <Typography color="secondary"> Open </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </ViewCard>
    </React.Fragment>
  );
};

export default Details;
