import React from "react";
import AccordionAlt from "../../ui-components/accordion";
import CardLayout from "../../ui-components/card-layout";
import * as yup from "yup";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
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
  contactUrl?: string;
  contactDetails: string;
  rules: string;
  prizes: string;
  schedule: string;
}

const Info: React.FC<InfoProps> = ({ onBack, onSave, data }) => {
  const validationSchema = yup.object({
    contactOption: yup.string().required("Please select contact option"),
    contactDetails: yup.string().required("Contact Detail is required"),
    rules: yup.string().required("Rules are required"),
    prizes: yup.string().required("Prizes are required"),
    schedule: yup.string().required("Schedule is required"),
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

  React.useEffect(() => {
    if (data) {
      formik.setValues({
        ...data,
        contactUrl: data.contactUrl ? data.contactUrl : "",
      });
    }
  }, [data]);

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
                value={formik.values.contactOption}
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

        <AccordionAlt title="Contact Details">
          <NoobReachTextEditor
            id="contactDetails"
            // value={formik?.values?.contactDetails || undefined}
            onChange={(value): void => {
              // const rteContent = JSON.stringify(
              //   convertToRaw(value.getCurrentContent())
              // );
              changeHandler("contactDetails", value.getCurrentContent().getPlainText());
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
            error={formik.touched.rules && Boolean(formik.errors.rules)}
            // value={formik?.values?.rules || undefined}
            onChange={(value): void => {
              // const rteContent = JSON.stringify(
              //   convertToRaw(value.getCurrentContent())
              // );
              changeHandler("rules", value.getCurrentContent().getPlainText());
            }}
          />
          {formik.touched.rules && Boolean(formik.errors.rules) ? (
            <FormHelperText> {formik.errors.rules} </FormHelperText>
          ) : null}
        </AccordionAlt>
        <AccordionAlt title="Prizes">
          <NoobReachTextEditor
            id="prizes"
            error={formik.touched.prizes && Boolean(formik.errors.prizes)}
            // value={formik?.values?.prizes || undefined}
            onChange={(value): void => {
              // const rteContent = JSON.stringify(
              //   convertToRaw(value.getCurrentContent())
              // );
              changeHandler("prizes", value.getCurrentContent().getPlainText());
            }}
          />
          {formik.touched.prizes && Boolean(formik.errors.prizes) ? (
            <FormHelperText> {formik.errors.prizes} </FormHelperText>
          ) : null}
        </AccordionAlt>
        <AccordionAlt title="Schedule">
          <NoobReachTextEditor
            id="schedule"
            error={formik.touched.schedule && Boolean(formik.errors.schedule)}
            // value={formik?.values?.schedule || undefined}
            onChange={(value): void => {
              // const rteContent = JSON.stringify(
              //   convertToRaw(value.getCurrentContent())
              // );
              changeHandler("schedule", value.getCurrentContent().getPlainText());
            }}
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
