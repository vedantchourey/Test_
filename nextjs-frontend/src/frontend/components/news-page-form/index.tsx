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
import AccordionAlt from "../ui-components/accordion";
import CardLayout from "../ui-components/card-layout";
import DashboardSideBar from "../ui-components/dashboard-sidebar";
import FormLabel from "../ui-components/formlabel";
import NoobReachTextEditor from "../ui-components/rte";

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
  title: string;
  subtitle: string;
  authorname: string;
  description: string;
  banner: string;
  label?: string;
}

// const atValues = [
//   { id: 1, value: "Fredrik Sundqvist" },
//   { id: 2, value: "Patrik Sjölin" },
// ];

interface BasicPorps {
  data?: BasicData;
  onSave?: (data: BasicData) => void;
}
const NewsPage: React.FC<BasicPorps> = ({ onSave, data }) => {
  const style = useStyles();
  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    subtitle: yup.string().required("Subtitle is required"),
    authorname: yup.string().required("Author Name is required"),
    description: yup.string(),
    banner: yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      subtitle: data?.subtitle || "",
      authorname: data?.authorname || "",
      label: data?.label || "",
      description: data?.description || "",
      banner: data?.banner || "",
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
        label: data?.banner,
        banner: data?.banner ? data?.banner : "",
      });
    }
  }, [data]);

  const changeHandler = (
    property: string,
    value: string | boolean | Date | null
  ): void => {
    formik.setFieldValue(property, value, true);
  };
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
        const fileUrl = frontendSupabase.storage
          .from("public-files")
          .getPublicUrl(data.Key.split("/")[1]);
        formik.setFieldValue(field, fileUrl.data?.publicURL || "");
      }
    });
  }, []);
  return (
    <NoobPage
      title={"News Page"}
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
                      <FormLabel label="Title"></FormLabel>
                      <OutlinedInput
                        id="title"
                        name="title"
                        placeholder="Title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        className={style.inputBox}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                      />
                      {formik.touched.title && Boolean(formik.errors.title) ? (
                        <FormHelperText> {formik.errors.title} </FormHelperText>
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
                      <FormLabel label="Label"></FormLabel>
                      <OutlinedInput
                        id="label"
                        name="label"
                        placeholder="label"
                        onChange={formik.handleChange}
                        value={formik.values.label}
                        className={style.inputBox}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.label && Boolean(formik.errors.label)
                        }
                      />
                      {formik.touched.label && Boolean(formik.errors.label) ? (
                        <FormHelperText> {formik.errors.label} </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="standard">
                      <FormLabel label="Author Name"></FormLabel>
                      <OutlinedInput
                        id="authorname"
                        name="authorname"
                        placeholder="Author Name"
                        onChange={formik.handleChange}
                        value={formik.values.authorname}
                        className={style.inputBox}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.authorname &&
                          Boolean(formik.errors.authorname)
                        }
                      />
                      {formik.touched.authorname &&
                      Boolean(formik.errors.authorname) ? (
                        <FormHelperText>
                          {" "}
                          {formik.errors.authorname}{" "}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardLayout>

              <CardLayout title="Optional Fields">
                <Grid container rowSpacing={1} columnSpacing={5}>
                  <Grid item xs={12}>
                    <AccordionAlt title="Discription">
                      <NoobReachTextEditor
                        // modules={{
                        //   toolbar: [
                        //     [{ header: [1, 2, false] }],
                        //     [
                        //       "bold",
                        //       "italic",
                        //       "underline",
                        //       "strike",
                        //       "blockquote",
                        //     ],
                        //     [{ list: "ordered" }, { list: "bullet" }],
                        //     ["link", "image"],
                        //   ],
                        //   mention: {
                        //     allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                        //     mentionDenotationChars: ["@", "#"],
                        //     source: function (
                        //       searchTerm: any,
                        //       renderItem: any,
                        //       mentionChar: any
                        //     ) {
                        //       let values: any;
                        //       if (mentionChar === "@" || mentionChar === "#") {
                        //         values = atValues;
                        //       }
                        //       if (searchTerm.length === 0) {
                        //         renderItem(values, searchTerm);
                        //       } else {
                        //         const matches = [];
                        //         for (let i = 0; i < values.length; i++)
                        //           if (
                        //             ~values[i].value
                        //               .toLowerCase()
                        //               .indexOf(searchTerm.toLowerCase())
                        //           )
                                  
                        //             matches.push(values[i]);
                        //             console.log('matches -> ', matches);
                        //         renderItem(matches, searchTerm);
                        //       }
                        //     },
                        //   },
                        // }}
                        value={formik.values.description}
                        onChange={(value: any): void => {
                          changeHandler("description", value);
                        }}
                      />
                    </AccordionAlt>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="standard">
                    <FormLabel label="Image"></FormLabel>
                    <Dropzone onDrop={(files): void => onDrop(files, "banner")}>
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
                    <Box display="flex" flexDirection={"column"}>
                      {formik?.values?.banner !== "" && (
                        <>
                          <Typography
                            style={{ textAlign: "left", margin: "10px 0px" }}
                          >
                            Preview
                          </Typography>
                          <img src={formik.values.banner} width="30%" />
                        </>
                      )}
                    </Box>
                  </FormControl>
                </Grid>
              </CardLayout>
              <Box display="flex" justifyContent={"flex-end"}>
                <Button variant="contained" onClick={formik.submitForm}>
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
export default NewsPage;
