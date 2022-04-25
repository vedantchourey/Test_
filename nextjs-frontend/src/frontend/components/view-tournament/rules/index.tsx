import { FormControl, Grid, Typography } from "@mui/material";
import React from "react";
import { TournamentData } from "../../tournament";
import ViewCard from "../../ui-components/view-card";

interface RulesProps {
  data: TournamentData;
}

const Rules: React.FC<RulesProps> = ({data}) => {
  return (
    <React.Fragment>
      <ViewCard title="Rules the tournament">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Typography align="left" marginBottom="5px">
                {data?.info?.rules || '-'}
              </Typography>
            </FormControl>
          </Grid>
        </Grid>
      </ViewCard>
    </React.Fragment>
  );
};

export default Rules;
