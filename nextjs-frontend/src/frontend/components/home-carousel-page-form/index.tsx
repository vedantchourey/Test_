import { Button, Grid, OutlinedInput, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { createStyles, makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { v4 } from "uuid";
import * as yup from "yup";
import { blobToFile } from "../../../common/utils/utils";
import { uploadImage } from "../../service-clients/image-service-client";
import { frontendSupabase } from "../../services/supabase-frontend-service";
import NoobPage from "../page/noob-page";
import CardLayout from "../ui-components/card-layout";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import FormLabel from "../ui-components/formlabel";

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
  subtitle: string;
  navigation: string;
  image: string;
}

interface BasicPorps {
  data?: BasicData;
  onSave?: (data: BasicData) => void;
}

const HomeCarouselPageForm: React.FC<BasicPorps> = ({ onSave, data }) => {
  const style = useStyles();
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    subtitle: yup.string().required("Subtitle is required"),
    navigation: yup.string().required("Navigation is required"),
    image: yup.string().required("Image is requied."),
  });

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      subtitle: data?.subtitle || "",
      navigation: data?.navigation || "",
      image: data?.image || "",
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
        image: data?.image ? data?.image : "",
      });
    }
  }, [data]);

  const onDrop = useCallback((acceptedFiles: File[], field: string): void => {
    acceptedFiles.forEach(async (file: Blob): Promise<void> => {
      const fileName = `${v4()}.png`;
      const fileData = blobToFile(file, fileName);
      const { data, error } = await uploadImage(
        "public-files",
        fileName,
        fileData
      );
      if (!error && data) {
        const fileUrl = data.Key.split("/")[1] ? frontendSupabase.storage
          .from("public-files")
          .getPublicUrl(data.Key.split("/")[1]) : undefined;
        formik.setFieldValue(field, fileUrl?.data?.publicURL || "");
      }
    });
  }, []);
  return (
    <NoobPage
      title={"Home Carousel Page"}
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item md={3} lg={2}>
          <DashboardSideBar />
        </Grid>
        <Grid item md={9} lg={10} paddingRight={2}>
          <Grid container columnSpacing={2}>
            <Grid item md={12}>
              <CardLayout title="Required Fields">
                <Grid container rowSpacing={1} columnSpacing={5}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard">
                      <FormLabel label="Name"></FormLabel>
                      <OutlinedInput
                        id="name"
                        name="name"
                        placeholder="Name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className={style.inputBox}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                      />
                      {formik.touched.name && Boolean(formik.errors.name) ? (
                        <FormHelperText> {formik.errors.name} </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    {" "}
                    <FormControl fullWidth variant="standard">
                      <FormLabel label="SubTitle"></FormLabel>
                      <OutlinedInput
                        id="subtitle"
                        name="subtitle"
                        placeholder="SubTitle"
                        onChange={formik.handleChange}
                        value={formik.values.subtitle}
                        className={style.inputBox}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.subtitle &&
                          Boolean(formik.errors.subtitle)
                        }
                      />
                      {formik.touched.subtitle &&
                      Boolean(formik.errors.subtitle) ? (
                        <FormHelperText>
                          {" "}
                          {formik.errors.subtitle}{" "}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard">
                      <FormLabel label="Navigation"></FormLabel>
                      <OutlinedInput
                        id="navigation"
                        name="navigation"
                        placeholder="Navigation"
                        onChange={formik.handleChange}
                        value={formik.values.navigation}
                        className={style.inputBox}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.navigation && Boolean(formik.errors.navigation)
                        }
                      />
                      {formik.touched.navigation && Boolean(formik.errors.navigation) ? (
                        <FormHelperText> {formik.errors.navigation} </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardLayout>

              <CardLayout>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="standard">
                    <FormLabel label="Image"></FormLabel>
                    <Dropzone onDrop={(files): void => onDrop(files, "image")}>
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
                    {formik.touched.image && Boolean(formik.errors.image) ? (
                        <FormHelperText style={{ color: "red" }}> {formik.errors.image} </FormHelperText>
                      ) : null}
                    <Box display="flex" flexDirection={"column"}>
                      {formik?.values?.image && (
                        <>
                          <Typography
                            style={{ textAlign: "left", margin: "10px 0px" }}
                          >
                            Preview
                          </Typography>
                          <img src={formik.values.image} width="30%" />
                        </>
                      )}
                    </Box>
                  </FormControl>
                </Grid>
              </CardLayout>
              <Box display="flex" justifyContent={"flex-end"}>
                <Button variant="contained" onClick={() => formik.handleSubmit()}>
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NoobPage>
  );
};
export default HomeCarouselPageForm;
