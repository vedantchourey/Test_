import { FormControl, Grid, Typography } from "@mui/material";
import React from "react";
import { TournamentData } from "../../tournament";
import ViewCard from "../../ui-components/view-card";
import ReactHtmlParser from "react-html-parser";

interface RulesProps {
  data: TournamentData;
}

const Rules: React.FC<RulesProps> = ({ data }) => {
  return (
    <React.Fragment>
      <ViewCard title="Rules the tournament">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Typography align="left" marginBottom="5px">
                {ReactHtmlParser(data?.info?.rules || "") || "-"}
              </Typography>
              {(data.bracketsMetadata?.rounds || []).map(
                (r: any, i: number) => (
                  <div style={{ marginLeft: 10 }} key={i}>
                    <Typography
                      align="left"
                      marginBottom="5px"
                      variant="caption"
                    >
                      Round {r.round}
                    </Typography>
                    <div style={{ fontFamily: "Inter", marginLeft: 10 }}>
                      {ReactHtmlParser(r.description || "")}
                    </div>
                  </div>
                )
              )}
            </FormControl>
          </Grid>
        </Grid>
      </ViewCard>
    </React.Fragment>
  );
};

export default Rules;
