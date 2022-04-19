import React from "react";
import Grid from "@mui/material/Grid";

import {
  OutlinedInput,
  Typography,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import FormLabel from "../../ui-components/formlabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import CardLayout from "../../ui-components/card-layout";
import AccordionAlt from "../../ui-components/accordion";
import NoobReachTextEditor from "../../ui-components/rte";
import { Box } from "@mui/system";
import Dropzone from "react-dropzone";
import { DatePicker, TimePicker } from "@mui/lab";
import * as yup from "yup";
import { useFormik } from "formik";
import GameDropDown from "../../drop-downs/game-drop-down";
// import { convertToRaw } from "draft-js";

const useStyles = makeStyles(() =>
  createStyles({
    inputBox: {
      borderRadius: "10px",
      marginBottom: "20px",
    },
    dropZone: {
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "10px",
      height: "178px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  }));

export interface BasicData {
  name: string;
  game: string;
  startDate: string | null;
  startTime: string | null;
  about: string;
  cloneTournament: boolean;
  createTemplateCode?: string;
  banner?: string;
}

interface BasicPorps {
  data?: BasicData;
  onSave?: (data: BasicData) => void;
  setPlatformIds?: any;
}

const Basic: React.FC<BasicPorps> = ({ onSave, data, setPlatformIds }) => {
  const style = useStyles();
  
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    game: yup.string().required("Game is required"),
    startDate: yup
      .date()
      .required("Start date is required")
      .nullable()
      .transform((v) => (v instanceof Date && !isNaN(v.getTime()) ? v : null)),
    startTime: yup
      .date()
      .required("Start time is required")
      .nullable()
      .transform((v) => (v instanceof Date && !isNaN(v.getTime()) ? v : null)),
    about: yup.string(),
    cloneTournament: yup.boolean(),
    createTemplateCode: yup.string().nullable()
.notRequired()
.when("cloneTournament", {
      is: true,
      then: yup.string().required("Tournament id is require to clone"),
    }),
    banner:yup.string().nullable()
.notRequired()
  });

  const formik = useFormik({
    initialValues: {
      game: data?.game || "",
      name: data?.name || "",
      startDate: data?.startDate || null,
      startTime: data?.startTime || null,
      about: data?.about || "",
      createTemplateCode: data?.createTemplateCode || "",
      cloneTournament: data?.cloneTournament || false,
      banner:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (onSave) {
        onSave({...values,banner:'Test Banner'});
      }
    },
  });

  React.useEffect(()=>{
    if(data){
      formik.setValues({...data,createTemplateCode:data.createTemplateCode?data.createTemplateCode:'',banner:data.banner?data.banner:''});
    }
  },[data]);

  const changeHandler = (
    property: string,
    value: string | boolean | Date | null
  ): void => {
    formik.setFieldValue(property, value, true);
  };

  return (
    <React.Fragment>
      <CardLayout title="Required Fields">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Name"></FormLabel>
              <OutlinedInput
                id="name"
                name="name"
                placeholder="FIFA22"
                onChange={formik.handleChange}
                value={formik.values.name}
                className={style.inputBox}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
              {formik.touched.name && Boolean(formik.errors.name) ? (
                <FormHelperText> {formik.errors.name} </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {" "}
            <FormControl fullWidth variant="standard">
              <FormLabel label="Select Game"></FormLabel>
              <GameDropDown
                label="Game"
                id="game"
                name="game"
                placeholder="Select Game"
                error={formik.touched.game && Boolean(formik.errors.game)}
                onChange={(id, selectedGame): void => {
                  setPlatformIds(selectedGame?.platformIds);
                  formik.handleChange({
                    target: {
                      name: "game",
                      value: id,
                    },
                  });
                }}
                value={formik.values.game}
              />
              {formik.touched.game && Boolean(formik.errors.game) ? (
                <FormHelperText> {formik.errors.game} </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Start Date(DD/MM/YYYY)"></FormLabel>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                onChange={(value): void => changeHandler("startDate", value)}
                value={formik.values.startDate}
                renderInput={(params): JSX.Element => (
                  <TextField
                    size="medium"
                    id="startDate"
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    onBlur={formik.handleBlur}
                    {...params}
                  />
                )}
              />
              {formik.touched.startDate && Boolean(formik.errors.startDate) ? (
                <FormHelperText> {formik.errors.startDate} </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Start Time"></FormLabel>
              <TimePicker
                inputFormat="HH:mm a"
                onChange={(value): void => changeHandler("startTime", value)}
                value={formik.values.startTime}
                renderInput={(params): JSX.Element => (
                  <TextField
                    id="startTime"
                    error={
                      formik.touched.startTime &&
                      Boolean(formik.errors.startTime)
                    }
                    onBlur={formik.handleBlur}
                    {...params}
                  />
                )}
              />

              {formik.touched.startTime && Boolean(formik.errors.startTime) ? (
                <FormHelperText> {formik.errors.startTime} </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>
      </CardLayout>

      <CardLayout title="Optional Fields">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl variant="standard">
              <FormLabel label="Select A Tournament To Clone From"></FormLabel>
              <Box>
                <Checkbox
                  id="cloneTournament"
                  name="cloneTournament"
                  onChange={formik.handleChange}
                  checked={formik.values.cloneTournament}
                />
              </Box>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {formik.values.cloneTournament ? (
              <FormControl fullWidth variant="standard">
                <FormLabel label={""}></FormLabel>
                <OutlinedInput
                  id="createTemplateCode"
                  name="createTemplateCode"
                  placeholder="Template code"
                  onChange={formik.handleChange}
                  value={formik.values.createTemplateCode}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.createTemplateCode &&
                    Boolean(formik.errors.createTemplateCode)
                  }
                />
                {formik.touched.createTemplateCode &&
                Boolean(formik.errors.createTemplateCode) ? (
                  <FormHelperText>
                    {" "}
                    {formik.errors.createTemplateCode}{" "}
                  </FormHelperText>
                ) : null}
              </FormControl>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <AccordionAlt title="About">
              <NoobReachTextEditor
                value={formik?.values?.about || ""}
                onChange={(): void => {
                  // let rteContent = convertToRaw(value.getCurrentContent())
                  changeHandler("about", "");
                }}
              />
            </AccordionAlt>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Header Banner"></FormLabel>
              <Dropzone>
                {({ getRootProps, getInputProps }): JSX.Element => (
                  <Box
                    className={style.dropZone}
                    component={"div"}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <img src="/icons/Upload.svg" alt="upload" />
                    <Typography marginTop={2} variant="subtitle2">
                      1029px - 600px
                    </Typography>
                    <Typography variant="subtitle2">
                      Click or drag and drop
                    </Typography>
                  </Box>
                )}
              </Dropzone>
            </FormControl>
          </Grid>
        </Grid>
      </CardLayout>
      <Box display="flex" justifyContent={"flex-end"}>
        <Button
          variant="contained"
          onClick={formik.submitForm}
          endIcon={<img src="/icons/greater.svg" />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Basic;
