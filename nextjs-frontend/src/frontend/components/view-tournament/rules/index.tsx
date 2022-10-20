import { FormControl, Grid, Typography } from "@mui/material";
import React from "react";
import { TournamentData } from "../../tournament";
import ViewCard from "../../ui-components/view-card";
import ReactHtmlParser from "react-html-parser";
import { isDeviceTypeSelector } from "../../../../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../../../../src/frontend/redux-store/layout/device-types";
import { useAppSelector } from "../../../redux-store/redux-store";

interface RulesProps {
  data: TournamentData;
}

const Rules: React.FC<RulesProps> = ({ data }) => {
  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  return (
    <React.Fragment>
      <ViewCard title="Tournament Rules">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Typography align="left" marginBottom="5px" style={{ fontSize: !isDesktop ? 10 : 15 }}>
                {ReactHtmlParser(data?.info?.rules || "") || "-"}
              </Typography>
              {(data.bracketsMetadata?.rounds || []).map(
                (r: any, i: number) => (
                  <div style={{ marginLeft: 10 }} key={i}>
                    <Typography
                      align="left"
                      marginBottom="5px"
                      variant="caption"
                      style={{ fontSize: !isDesktop ? 10 : 15 }}
                    >
                      Round {r.round}
                    </Typography>
                    <div style={{ fontFamily: "Inter", marginLeft: 10, fontSize: !isDesktop ? 10 : 15 }}>
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
