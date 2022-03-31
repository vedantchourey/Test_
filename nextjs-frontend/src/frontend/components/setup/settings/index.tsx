import React from "react";
import CardLayout from "../../ui-components/card-layout";
import Grid from "@mui/material/Grid";
import FormLabel from "../../ui-components/formlabel";
import {
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  FormHelperText,
} from "@mui/material";

import FormControl from "@mui/material/FormControl";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../ui-components/toggle-button-group";

const Settings = () => {
  const [data, setData] = React.useState({
    checkInType: "free",
    checkIn: "true",
    matchScoreReporting: "admin-only",
    requiredScreenShot: "false",
    registrationLimit: "limited",
    countryFlagsBrackets: "false",
    registrationRegion: "all",
  });
  const changeHanlder = (property: string, value: boolean | string) => {
    setData({ ...data, [property]: value });
  };
  return (
    <>
      <CardLayout title="Required Fields">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Game Region/Server"></FormLabel>
              <Select displayEmpty defaultValue={""}>
                <MenuItem value="">Asia </MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Platform"></FormLabel>
              <Select displayEmpty defaultValue={""}>
                <MenuItem value="">PlayStation 5 </MenuItem>
                <MenuItem value="Australia">PlayStation 4</MenuItem>
                <MenuItem value="Canada">PlayStation 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Tournament Format"></FormLabel>
              <Select displayEmpty defaultValue={""}>
                <MenuItem value="">1v1 </MenuItem>
                <MenuItem value="Australia">2v1</MenuItem>
                <MenuItem value="Canada">3v1</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Check-in Type"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={data.checkInType}
                onChange={(e, val) => changeHanlder("checkInType", val)}
                fullWidth
              >
                <NoobToggleButton value="free">Free</NoobToggleButton>
                <NoobToggleButton value="credit">Credit</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Credits"></FormLabel>
              <Select displayEmpty defaultValue={""}>
                <MenuItem value="">Select Credits </MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Check-in"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={data.checkIn}
                onChange={(e, val) => changeHanlder("checkIn", val)}
                fullWidth
              >
                <NoobToggleButton value="false">Disable</NoobToggleButton>
                <NoobToggleButton value="true">Enabled</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel label="Check-in Start Time"></FormLabel>
                <Box display="flex" justifyContent={"flex-start"}>
                  <OutlinedInput placeholder="Bracket Name" />
                  <FormHelperText>Minutes before registration close</FormHelperText>
                </Box>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Match Score Reporting"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={data.matchScoreReporting}
                onChange={(e, val) => changeHanlder("matchScoreReporting", val)}
                fullWidth
              >
                <NoobToggleButton value="admin-only">
                  Admin Only
                </NoobToggleButton>
                <NoobToggleButton value="admins-players">
                  Admins & Players
                </NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Require ScreenShots"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={data.requiredScreenShot}
                onChange={(e, val) => changeHanlder("requiredScreenShot", val)}
                fullWidth
              >
                <NoobToggleButton value="false">Not Required</NoobToggleButton>
                <NoobToggleButton value="true">
                  Admins & Required
                </NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
        </Grid>
      </CardLayout>

      <CardLayout title="Advanced Fields">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Registration Participant Limit"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={data.registrationLimit}
                onChange={(e, val) => changeHanlder("registrationLimit", val)}
                fullWidth
              >
                <NoobToggleButton value="limited">Limited</NoobToggleButton>
                <NoobToggleButton value="unlimited">Unlimited</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl >
              <FormLabel label="Limit"></FormLabel>
              <OutlinedInput  />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Country Flags on Brackets"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={data.countryFlagsBrackets}
                onChange={(e, val) =>
                  changeHanlder("countryFlagsbrackets", val)
                }
                fullWidth
              >
                <NoobToggleButton value="true">Off</NoobToggleButton>
                <NoobToggleButton value="false">On</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Registration Region"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={data.registrationRegion}
                onChange={(e, val) => changeHanlder("registrationRegion", val)}
                fullWidth
              >
                <NoobToggleButton value="all">All</NoobToggleButton>
                <NoobToggleButton value="specific-region">
                  Specific Region
                </NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
        </Grid>
      </CardLayout>
    </>
  );
};

export default Settings;
