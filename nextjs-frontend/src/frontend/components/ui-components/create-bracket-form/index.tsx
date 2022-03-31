import React from "react";
import TextField from "@mui/material/TextField";
import {
    Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "../formlabel";
import { DatePicker } from "@mui/lab";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../toggle-button-group";
import { Box } from "@mui/system";
import CardLayout from "../card-layout";
import NoobReachTextEditor from "../rte";

const CreateBracketForm = () => {
  const [data, setData] = React.useState({
    hasTournament: false,
    from: null,
    to: null,
    matchCheckIn: "false",
    elimination: "single",
    thirdPartyMatch: false,
  });
  const changeHandler = (
    property: string,
    value: string | boolean | Date | null
  ) => {
    setData({ ...data, [property]: value });
  };
  return (
    <CardLayout>
      <Grid container rowSpacing={1} columnSpacing={5}>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard">
            <OutlinedInput id="game" placeholder="Bracket Name" />
            <FormHelperText>A name is required</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={5}>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard">
            <FormLabel label="Start Date(DD/MM/YYYY)"></FormLabel>
            <DatePicker
              onChange={(value) => changeHandler("from", value)}
              value={data.from}
              renderInput={(params) => <TextField {...params} />}
            />
            <FormHelperText> Date Displayed in IST </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="standard">
            <FormLabel label="Start Time"></FormLabel>
            <DatePicker
              onChange={(value) => changeHandler("from", value)}
              value={data.from}
              renderInput={(params) => <TextField {...params} />}
            />

            <FormHelperText> Time Displayed in IST </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormHelperText> Match Check in </FormHelperText>
            <NoobToggleButtonGroup
              exclusive
              value={data.matchCheckIn}
              onChange={(e, val) => changeHandler("matchCheckIn", val)}
              fullWidth
            >
              <NoobToggleButton value="false">Off</NoobToggleButton>
              <NoobToggleButton value="true">On</NoobToggleButton>
            </NoobToggleButtonGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={6}
          justifyContent={"space-between"}
          display={"flex"}
          alignItems="center"
        >
          {data.matchCheckIn === "true" ? (
            <React.Fragment>
              <FormControlLabel label="Check in Timer" control={<Checkbox />} />
              <TextField type="number" placeholder="Minutes" />
            </React.Fragment>
          ) : null}
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel label="Bracket Style" />
            <RadioGroup
              value={data.elimination}
              onChange={(event) =>
                changeHandler("elimination", event.target.value)
              }
            >
              <FormControlLabel
                value="single"
                control={<Radio />}
                label="Single Elimination"
              />
              {data.elimination === "single" ? (
                <FormControlLabel
                  style={{ paddingLeft: "2rem" }}
                  control={
                    <Checkbox
                      checked={data.thirdPartyMatch}
                      onChange={(event) =>
                        changeHandler("thirdPartyMatch", event.target.checked)
                      }
                    />
                  }
                  label="Enable Third Place Match"
                />
              ) : null}
              <FormControlLabel
                value="double"
                control={<Radio />}
                label="Double Elimination"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormHelperText> Bracket Size (# of Players) </FormHelperText>
            <TextField type="number" />
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel label="Scoring Format" />
            <OutlinedInput placeholder="Best of" />
          </FormControl>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <FormLabel label="Best of For All Round" />
            <TextField type="number" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormLabel label="Rounds" />
            <FormHelperText> Round 1 </FormHelperText>
            <Box display={"flex"} marginBottom={5} justifyContent="space-between">
                <Select style={{width:"70%"}} displayEmpty defaultValue={""}>
                    <MenuItem value="">Select Round </MenuItem>
                    <MenuItem value="1">Best of 1</MenuItem>
                    <MenuItem value="2">Best of 2</MenuItem>
                </Select>
                <Button style={{width:"25%"}} variant="contained" startIcon={<img src="/icons/delete.svg" alt="delete"/>}>Remove Details</Button>
            </Box>
            <NoobReachTextEditor />
        </Grid>
        <Grid item xs={12}>
            <FormHelperText> Round 2 </FormHelperText>
            <Box display={"flex"} marginBottom={5} justifyContent="space-between">
                <Select style={{width:"70%"}} displayEmpty defaultValue={""}>
                    <MenuItem value="">Select Round </MenuItem>
                    <MenuItem value="1">Best of 1</MenuItem>
                    <MenuItem value="2">Best of 2</MenuItem>
                </Select>
                <Button style={{width:"25%"}} variant="contained" startIcon={<img src="/icons/Plus.svg" alt="add"/>}>Add Details</Button>
            </Box>
        </Grid>
      </Grid>
    </CardLayout>
  );
};

export default CreateBracketForm;
