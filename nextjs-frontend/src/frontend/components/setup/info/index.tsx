import React from "react";
import AccordionAlt from "../../ui-components/accordion";
import CardLayout from "../../ui-components/card-layout";
import * as yup from "yup";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import { EditorState } from "draft-js";
import NoobReachTextEditor from "../../ui-components/rte";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

interface InfoProps {
  onBack?: () => void;
  data?: InfoData;
  onSave?: (data: InfoData) => void;
}

export interface InfoData {
  contactOption: string;
  contactUrl: string;
  contactDetails: string;
  rules: string;
  prizes: string;
  schedule?: string;
}

const Info: React.FC<InfoProps> = ({ onBack, onSave, data }) => {
  const validationSchema = yup.object({
    contactOption: yup.string().required("Please select contact option"),
    contactDetails: yup.string().required("Contact Detail is required"),
    rules: yup.string().required("Rules are required"),
    prizes: yup.string().required("Prizes are required"),
    schedule: yup.string().required("Schedule is required"),
    contactUrl: yup.string().when("contactOption", {
      is: (option: string) => {
        return option !== undefined;
      },
      then: yup.string().required("Contact Url is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      contactOption: data?.contactOption || "",
      contactDetails: data?.contactDetails || "",
      rules: data?.rules || "",
      schedule: data?.schedule || "",
      prizes: data?.prizes || "",
      contactUrl: data?.contactUrl || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (onSave) {
        onSave(values);
      }
    },
  });

  const changeHandler = (key: string, value: string): void => {
    formik.setFieldValue(key, value, true);
  };

  return (
    <React.Fragment>
      <CardLayout title="How Will Your Players Contact You">
        <Grid container columnSpacing={5}>
          <Grid item sm={formik.values.contactOption !== "" ? 6 : 12}>
            <FormControl style={{ width: "100%" }}>
              <Select
                displayEmpty
                defaultValue={""}
                onChange={(e): void =>
                  changeHandler("contactOption", e.target.value)
                }
              >
                <MenuItem value="">Select Contact Option</MenuItem>
                <MenuItem value="FaceBook">FaceBook</MenuItem>
                <MenuItem value="Google">Google</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formik.values.contactOption !== "" ? (
            <Grid item sm={6}>
              <FormControl fullWidth variant="standard">
                <OutlinedInput
                  id="contactUrl"
                  placeholder="Enter your url"
                  onChange={formik.handleChange}
                  value={formik.values.contactUrl}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.contactUrl &&
                    Boolean(formik.errors.contactUrl)
                  }
                />
                {formik.touched.contactUrl &&
                Boolean(formik.errors.contactUrl) ? (
                  <FormHelperText> {formik.errors.contactUrl} </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
          ) : null}
        </Grid>

        <AccordionAlt title="Contact Details" >
          <NoobReachTextEditor
            id="contactDetails"
            onChange={(value: any): void => {
              changeHandler("contactDetails", value);
            }}
            error={
              formik.touched.contactDetails &&
              Boolean(formik.errors.contactDetails)
            }
          />
          {formik.touched.contactDetails &&
          Boolean(formik.errors.contactDetails) ? (
            <FormHelperText> {formik.errors.contactDetails} </FormHelperText>
          ) : null}
        </AccordionAlt>
        <AccordionAlt title="Rules">
          <NoobReachTextEditor
            id="rules"
            onChange={(value: any): void => changeHandler("rules", value)}
            error={formik.touched.rules && Boolean(formik.errors.rules)}
          />
          {formik.touched.rules && Boolean(formik.errors.rules) ? (
            <FormHelperText> {formik.errors.rules} </FormHelperText>
          ) : null}
        </AccordionAlt>
        <AccordionAlt title="Prizes">
          <NoobReachTextEditor
            id="prizes"
            onChange={(value: any): void => changeHandler("prizes", value)}
            error={formik.touched.prizes && Boolean(formik.errors.prizes)}
          />
          {formik.touched.prizes && Boolean(formik.errors.prizes) ? (
            <FormHelperText> {formik.errors.prizes} </FormHelperText>
          ) : null}
        </AccordionAlt>
        <AccordionAlt title="Schedule">
          <NoobReachTextEditor
            id="schedule"
            onChange={(value: any): void => changeHandler("schedule", value)}
            error={formik.touched.schedule && Boolean(formik.errors.schedule)}
          />
          {formik.touched.schedule && Boolean(formik.errors.schedule) ? (
            <FormHelperText> {formik.errors.schedule} </FormHelperText>
          ) : null}
        </AccordionAlt>
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
    </React.Fragment>
  );
};

export default Info;
