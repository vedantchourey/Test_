import React from "react";
import CardLayout from "../../ui-components/card-layout";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { useFormik } from "formik";
import FormLabel from "../../ui-components/formlabel";
import {
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  FormHelperText,
  Button,
  TextField,
} from "@mui/material";

import FormControl from "@mui/material/FormControl";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../ui-components/toggle-button-group";
import { TimePicker } from "@mui/lab";

interface SettingProps {
  onBack?: () => void;
  data?: SettingData;
  onSave?: (data: SettingData) => void;
}

export interface SettingData {
  server: string;
  platform: string;
  tournamentFormat: string;
  entryType: string;
  entryFeeAmount: string;
  checkInType: string;
  checkInStartTime: string;
  ScoreReporting: string;
  screenShots: string;
  limitType: string;
  limit: number;
  countryFlagOnBrackets: boolean;
  registrationRegion: string;
}

const Settings: React.FC<SettingProps> = ({
  onBack,
  onSave,
  data,
}): JSX.Element => {
  const validationSchema = yup.object({
    server: yup.string().required("Region/Server is required"),
    platform: yup.string().required("Platform is required"),
    tournamentFormat: yup.string().required("Tournament Format is required"),
    entryType: yup.string().required("Entry type is required"),
    entryFeeAmount: yup.string().when("entryType", {
      is: "credit",
      then: yup.string().required("Fee amount is required"),
    }),
    checkInType: yup.string().required("check In type is required"),
    checkInStartTime: yup.string().when("checkInType", {
      is: "enable",
      then: yup.string().required("Check in start time required"),
    }),
    ScoreReporting: yup.string().required("Score reporting is required"),
    screenShots: yup.string().required("screenShots are required"),
    limitType: yup.string().required("limit type is required"),
    limit: yup.number().when("limitType", {
      is: "LIMITED",
      then: yup.number().required("limit number is required"),
    }),
    countryFlagOnBrackets: yup.boolean().required("country flag is required"),
    registrationRegion: yup
      .string()
      .required("Registration Region is required"),
  });

  const formik = useFormik({
    initialValues: {
      server: data?.server || "",
      platform: data?.platform || "",
      tournamentFormat: data?.tournamentFormat || "",
      entryType: data?.entryType || "free",
      entryFeeAmount: data?.entryFeeAmount || "",
      checkInType: data?.checkInType || "disable",
      checkInStartTime: data?.checkInStartTime || "",
      ScoreReporting: data?.ScoreReporting || "ADMIN_PLAYER",
      screenShots: data?.screenShots || "NOT_REQUIRED",
      limitType: data?.limitType || "UNLIMITED",
      limit: data?.limit || -1,
      countryFlagOnBrackets: data?.countryFlagOnBrackets || true,
      registrationRegion: data?.registrationRegion || "all",
    },
    validationSchema: validationSchema,
    onSubmit: (values: SettingData) => {
      if (onSave) {
        onSave(values);
      }
    },
  });
  const changeHandler = (property: string, value: boolean | string): void => {
    formik.setFieldValue(property, value, true);
  };
  return (
    <>
      <CardLayout title="Required Fields">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Game Region/Server"></FormLabel>
              <Select
                displayEmpty
                defaultValue={""}
                onChange={(e): void => changeHandler("server", e.target.value)}
              >
                <MenuItem value="">Select Region/ Server </MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="Russia">Australia</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
              </Select>
              {formik.touched.server && Boolean(formik.errors.server) ? (
                <FormHelperText>{formik.errors.server}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Platform"></FormLabel>
              <Select
                displayEmpty
                defaultValue={""}
                onChange={(e): void =>
                  changeHandler("platform", e.target.value)
                }
              >
                <MenuItem value="">Select Platform </MenuItem>
                <MenuItem value="Playstation4">PlayStation 4</MenuItem>
                <MenuItem value="Playstation2">PlayStation 2</MenuItem>
                <MenuItem value="Playstation3">PlayStation 3</MenuItem>
              </Select>
              {formik.touched.server && Boolean(formik.errors.server) ? (
                <FormHelperText>{formik.errors.server}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Tournament Format"></FormLabel>
              <Select
                displayEmpty
                defaultValue={""}
                onChange={(e): void =>
                  changeHandler("tournamentFormat", e.target.value)
                }
              >
                <MenuItem value=""> Select Tournament Formate </MenuItem>
                <MenuItem value="formate1">1v1</MenuItem>
                <MenuItem value="formate2">2v1</MenuItem>
                <MenuItem value="formate3">3v1</MenuItem>
              </Select>
              {formik.touched.tournamentFormat &&
              Boolean(formik.errors.tournamentFormat) ? (
                  <FormHelperText>
                    {formik.errors.tournamentFormat}
                  </FormHelperText>
                ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Check-in"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={formik.values.entryType}
                onChange={(e: React.MouseEvent<Element, MouseEvent>, val:string): void =>
                  changeHandler("entryType", val)
                }
                fullWidth
              >
                <NoobToggleButton value="free">Free</NoobToggleButton>
                <NoobToggleButton value="credit">Credit</NoobToggleButton>
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
            {formik.values.entryType === "credit" ? (
              <React.Fragment>
                <FormControl fullWidth>
                  <FormLabel label="Credits"></FormLabel>
                  <Select
                    displayEmpty
                    defaultValue={""}
                    onChange={(val):void => {
                      changeHandler("entryFeeAmount", val.target.value);
                    }}
                  >
                    <MenuItem value="">Select Credits </MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                  </Select>
                  {formik.touched.entryFeeAmount &&
                  Boolean(formik.errors.entryFeeAmount) ? (
                      <FormHelperText>
                        {formik.errors.entryFeeAmount}
                      </FormHelperText>
                    ) : null}
                </FormControl>
              </React.Fragment>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Check-in"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={formik.values.checkInType}
                onChange={(e: React.MouseEvent<Element, MouseEvent>, val:string): void =>
                  changeHandler("checkInType", val)
                }
                fullWidth
              >
                <NoobToggleButton value="disable">Disable</NoobToggleButton>
                <NoobToggleButton value="enable">Enabled</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {formik.values.checkInType === "enable" ? (
              <React.Fragment>
                <FormControl fullWidth>
                  <FormLabel label="Check-in Start Time"></FormLabel>
                  <Box display="flex" justifyContent={"flex-start"}>
                    <TimePicker
                      inputFormat="HH:mm a"
                      onChange={(value): void =>
                        changeHandler("checkInStartTime", value as string)
                      }
                      value={formik.values.checkInStartTime}
                      renderInput={(params): JSX.Element => (
                        <TextField
                          id="startTime"
                          error={
                            formik.touched.checkInStartTime &&
                            Boolean(formik.errors.checkInStartTime)
                          }
                          onBlur={formik.handleBlur}
                          {...params}
                        />
                      )}
                    />
                    {formik.touched.checkInStartTime &&
                    Boolean(formik.errors.checkInStartTime) ? (
                        <FormHelperText>
                          {" "}
                          {formik.errors.checkInStartTime}{" "}
                        </FormHelperText>
                      ) : null}
                  </Box>
                </FormControl>
              </React.Fragment>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Match Score Reporting"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={formik.values.ScoreReporting}
                onChange={(e: React.MouseEvent<Element, MouseEvent>, val:string): void =>
                  changeHandler("ScoreReporting", val)
                }
                fullWidth
              >
                <NoobToggleButton value="ADMIN">Admin Only</NoobToggleButton>
                <NoobToggleButton value="ADMIN_PLAYER">
                  Admins & Players
                </NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Require screenShots"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={formik.values.screenShots}
                onChange={(e, val): void => changeHandler("screenShots", val)}
                fullWidth
              >
                <NoobToggleButton value="NOT_REQUIRED">
                  Not Required
                </NoobToggleButton>
                <NoobToggleButton value="REQUIRED">
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
                value={formik.values.limitType}
                onChange={(e: React.MouseEvent<Element, MouseEvent>, val:string): void =>
                  changeHandler("limitType", val)
                }
                fullWidth
              >
                <NoobToggleButton value="LIMITED">Limited</NoobToggleButton>
                <NoobToggleButton value="UNLIMITED">Unlimited</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            {formik.values.limitType === "LIMITED" ? (
              <FormControl>
                <FormLabel label="Limit"></FormLabel>
                <OutlinedInput id="limit" onChange={formik.handleChange} />
              </FormControl>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Country Flags on Brackets"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={formik.values.countryFlagOnBrackets ? "on" : "off"}
                onChange={(e: React.MouseEvent<Element, MouseEvent>, val:string): void =>
                  changeHandler(
                    "countryFlagOnBrackets",
                    val === "on"
                  )
                }
                fullWidth
              >
                <NoobToggleButton value="off">Off</NoobToggleButton>
                <NoobToggleButton value="on">On</NoobToggleButton>
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
                value={formik.values.registrationRegion}
                onChange={(e: React.MouseEvent<Element, MouseEvent>, val:string): void =>
                  changeHandler("registrationRegion", val)
                }
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
      <Box display="flex" justifyContent={"space-between"}>
        <Button
          variant="contained"
          onClick={onBack}
          startIcon={<img src="/icons/lessthan.svg" />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={formik.submitForm}
          endIcon={<img src="/icons/greater.svg" />}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default Settings;
