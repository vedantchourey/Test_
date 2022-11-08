import { Grid, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const ButtonComp: React.FC<any> = ({ 
  formats = [],
  setFormat,
  format,
  allstatus,
  status,
  setStatus,
  allcredits,
  credits,
  setCredits
   }) => {
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
          <Grid item xs={6} lg={2} md={2}>
          <Select 
              value={status || "status"}
              onChange={(e): any =>
                setStatus(e.target.value === "status" ? "" : e.target.value)
              }
              fullWidth={true}
              >
                <MenuItem value="status">Status</MenuItem>
                {allstatus.map((item: any, i: number) => {
                  return (
                    <MenuItem value={item} key={i}>
                      {(item === "complete"
                        ? "completed"
                        : item === "upcomming"
                        ? "upcoming"
                        : item
                      )
                        .charAt(0)
                        .toUpperCase() +
                        (item === "complete"
                          ? "completed"
                          : item === "upcomming"
                          ? "upcoming"
                          : item
                        ).slice(1)}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              lg={2}
              md={2}
              sx={{ marginTop: { sm: "8px", xs: "8px" } }}
            >
              <Select 
              value={credits || "credits"}
              onChange={(e): any =>
                setCredits(e.target.value === "credits" ? "" : e.target.value)
              }
              fullWidth={true}>
                <MenuItem value="credits">Credits</MenuItem>
                {allcredits.map((item: any, i: number) => {
                  return (
                    <MenuItem value={item} key={i}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
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
            </Select >
              <Select 
              sx={{mx:2}}
              value={status || "status"}
              onChange={(e): any =>
                setStatus(e.target.value === "status" ? "" : e.target.value)
              }
              >
                <MenuItem value="status">Status</MenuItem>
                {allstatus.map((item: any, i: number) => {
                  return (
                    <MenuItem value={item} key={i}>
                      {(item === "complete"
                        ? "completed"
                        : item === "upcomming"
                        ? "upcoming"
                        : item
                      )
                        .charAt(0)
                        .toUpperCase() +
                        (item === "complete"
                          ? "completed"
                          : item === "upcomming"
                          ? "upcoming"
                          : item
                        ).slice(1)}
                    </MenuItem>
                  );
                })}
              </Select>
              <Select 
              value={credits || "credits"}
              onChange={(e): any =>
                setCredits(e.target.value === "credits" ? "" : e.target.value)
              }>
                <MenuItem value="credits">Credits</MenuItem>
                {allcredits.map((item: any, i: number) => {
                  return (
                    <MenuItem value={item} key={i}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </MenuItem>
                  );
                })}
              </Select>
          </Grid>
          {/* <Grid item xs={12} textAlign={"right"}>
            </Grid>
            <Grid item xs={12} textAlign={"right"}>
            </Grid> */}
        </>
      )}
    </Grid>
  );
};

export default ButtonComp;
