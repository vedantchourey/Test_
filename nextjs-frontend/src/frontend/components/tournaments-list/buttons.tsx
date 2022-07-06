import { Grid, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const ButtonComp: React.FC<any> = ({ formats = [], setFormat, format }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container columnSpacing={2} mt={5}>
      {isMobile ? (
        <>
          <Grid item xs={6} lg={2} md={2}>
            <Select
              value={format || "Team Size"}
              onChange={(e): any =>
                setFormat(e.target.value === "Team Size" ? "" : e.target.value)
              }
              placeholder={"Select Team size"}
              fullWidth={true}
            >
              <MenuItem value="Team Size">Team Size</MenuItem>
              {(formats || []).map((format: any, i: number) => {
                return (
                  <MenuItem value={format} key={i}>
                    {format}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          {/* <Grid item xs={6} lg={2} md={2}>
              <Select value={"status"} fullWidth={true}>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              lg={2}
              md={2}
              sx={{ marginTop: { sm: "8px", xs: "8px" } }}
            >
              <Select value={"entryfee"} fullWidth={true}>
                <MenuItem value="entryfee">Entry Fee</MenuItem>
              </Select>
            </Grid> */}
        </>
      ) : (
        <>
          <Grid item xs={12} textAlign={"right"}>
            <Select
              value={format || "Team Size"}
              onChange={(e): any =>
                setFormat(e.target.value === "Team Size" ? "" : e.target.value)
              }
              placeholder={"Select Team size"}
            >
              <MenuItem value="Team Size">Team Size</MenuItem>
              {(formats || []).map((format: any, i: number) => {
                return (
                  <MenuItem value={format} key={i}>
                    {format}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={6} lg={2} md={2} justifyContent={"flex-end"}></Grid>
          {/* <Grid item xs={6} lg={2} md={2}>
              <Select value={"status"} fullWidth={true}>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} lg={2} md={2}>
              <Select value={"entryfee"} fullWidth={true}>
                <MenuItem value="entryfee">Entry Fee</MenuItem>
              </Select>
            </Grid> */}
        </>
      )}
    </Grid>
  );
};

export default ButtonComp;
