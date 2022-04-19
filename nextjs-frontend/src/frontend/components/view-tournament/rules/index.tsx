import { FormControl, Grid, Typography } from "@mui/material";
import React from "react";
import ViewCard from "../../ui-components/view-card";

const Rules: React.FC = () => {
  return (
    <React.Fragment>
      <ViewCard title="Rules the tournament">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
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
            </FormControl>
          </Grid>
        </Grid>
      </ViewCard>
    </React.Fragment>
  );
};

export default Rules;
