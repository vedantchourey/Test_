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
} from "@mui/material";

import FormControl from "@mui/material/FormControl";
import NoobToggleButtonGroup, {
  NoobToggleButton,
} from "../../ui-components/toggle-button-group";

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
  scoreReporting: string;
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
    entryFeeAmount: yup.string().required("Fee amount is required"),
    checkInType: yup.string().required("check In type is required"),
    checkInStartTime: yup.string().required("Check in start time required"),
    scoreReporting: yup.string().required("Score reporting is required"),
    screenShots: yup.string().required("screenshots are required"),
    limitType: yup.string().required("limit type is required"),
    limit: yup.number().required("limit number is required"),
    countryFlagOnBrackets: yup.boolean().required("country flag is required"),
    registrationRegion: yup
      .string()
      .required("Registration Region is required"),
  });

  const formik = useFormik({
    initialValues: {
      server: data?.server || "",
      platform: data?.platform,
      tournamentFormat: data?.tournamentFormat,
      entryType: data?.entryType || "free",
      entryFeeAmount: data?.entryFeeAmount,
      checkInType: data?.checkInType || "disable",
      checkInStartTime: data?.checkInStartTime,
      scoreReporting: data?.scoreReporting || "admins-players",
      screenShots: data?.screenShots || "not-required",
      limitType: data?.limitType || "unlimited",
      limit: data?.limit,
      countryFlagOnBrackets: data?.countryFlagOnBrackets || "on",
      registrationRegion: data?.registrationRegion || "all",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
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
                onChange={(val: any): void => changeHandler("entryType", val.target.value)}
                fullWidth
              >
                <NoobToggleButton value="free">Free</NoobToggleButton>
                <NoobToggleButton value="credit">Credit</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} justifyContent={"space-between"}
            display={"flex"}
            alignItems="center">
            {formik.values.entryType === "credit" ? (
              <React.Fragment>
                <FormControl fullWidth>
                  <FormLabel label="Credits"></FormLabel>
                  <Select displayEmpty defaultValue={""}>
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
                onChange={(val:any): void => changeHandler("checkInType", val.target.value)}
                fullWidth
              >
                <NoobToggleButton value="disable">Disable</NoobToggleButton>
                <NoobToggleButton value="enable">Enabled</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} >
              {formik.values.checkInType === "enable" ? (
              <React.Fragment>
            <FormControl fullWidth>
              <FormLabel label="Check-in Start Time"></FormLabel>
              <Box display="flex" justifyContent={"flex-start"}>
                <OutlinedInput
                  id="checkInStartTime"
                  placeholder="PlayStation 5"
                  onChange={formik.handleChange}
                  value={formik.values.checkInStartTime}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.checkInStartTime &&
                    Boolean(formik.errors.checkInStartTime)
                  }
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
              ):null}
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Match Score Reporting"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={formik.values.scoreReporting}
                onChange={( val:any): void =>
                  changeHandler("ScoreReporting", val.target.value)
                }
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
                value={formik.values.screenShots}
                onChange={(e, val): void =>
                  changeHandler("requiredScreenShot", val)
                }
                fullWidth
              >
                <NoobToggleButton value="not-required">Not Required</NoobToggleButton>
                <NoobToggleButton value="required">
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
                onChange={(val:any): void =>
                  changeHandler("limitType", val.target.value)
                }
                fullWidth
              >
                <NoobToggleButton value="limited">Limited</NoobToggleButton>
                <NoobToggleButton value="unlimited">Unlimited</NoobToggleButton>
              </NoobToggleButtonGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          {formik.values.limitType === "limited" ? (

            <FormControl>
              <FormLabel label="Limit"></FormLabel>
              <OutlinedInput />
              
            </FormControl>
          ):null}
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel label="Country Flags on Brackets"></FormLabel>
              <NoobToggleButtonGroup
                exclusive
                value={formik.values.countryFlagOnBrackets}
                onChange={(val:any): void =>
                  changeHandler("countryFlagOnBrackets", val.target.value)
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
                onChange={( val:any): void =>
                  changeHandler("registrationRegion", val.target.value)
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
