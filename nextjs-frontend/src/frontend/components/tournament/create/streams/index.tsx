import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { ReactComponent as CircleCloseIcon } from "../../../../../../public/icons/close.svg";
import AccordionAlt from "../../../ui-components/accordion";
import { createStyles, makeStyles } from "@mui/styles";
import * as yup from "yup";
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikProvider,
  useFormik,
} from "formik";
import { useRouter } from "next/router";
import { TournamentContext } from "../..";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      borderRadius: "50%",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    button: {
      border: "1px solid rgba(196, 196, 196, 1)",
      borderRadius: "5px",
      height: "35px",
      width: "110px",
      color: "#E5E5E5",
      marginTop: "20px",
    },
    addButton: {
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "10px",
      height: "41px",
      width: "200px",
      color: "#E5E5E5",
      background: "rgba(229, 229, 229, 0.3)",
    },
  }));

export interface StreamData {
  provider: string;
  url: string;
}

const Streams: React.FC = (): JSX.Element => {
  const classes = useStyles();

  const router = useRouter();
  const { data, setData, id, type } = React.useContext(TournamentContext);

  const validationSchema = yup.object({
    streams: yup.array().of(
      yup.object().shape({
        provider: yup.string().required("Please select provider"),
        url: yup.string().required("URL is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      streams: [...(data.streams?.data || [])],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setData({ ...data, streams: {data:values.streams} },()=>{
        if(type==='new'){
          router.push(`/tournament/new/[...slug]`,`/tournament/new/create/publish`, {shallow:true})
        }else{
          router.push(`/tournament/update/[id]/[...slug]`,`/tournament/update/${id}/create/publish`, {shallow:true})
        }
      });
    },
  });

  const onBack = ():void => {
    if(type==='new'){
      router.push(`/tournament/new/[...slug]`,`/tournament/new/create/brackets/create`, {shallow:true})
    }else{
      router.push(`/tournament/update/[id]/[...slug]`,`/tournament/update/${id}/create/brackets/create`, {shallow:true})
    }
  };

  const addStreamHandler = (helper: FieldArrayRenderProps):void => {
    helper.push({ provider: "", channelName: "" });
  };

  const renderStreams = (helper: FieldArrayRenderProps): JSX.Element[] => {
    return formik.values.streams.map((stream, index) => {
      return (
        <Box paddingX={"32px"} paddingY={"18px"} key={`${stream.provider}-${stream.url}`}>
          <Typography align="left" gutterBottom>
            New Stream
          </Typography>
          <Grid container columnSpacing={2}>
            <Grid item md={6}>
              <FormControl style={{ width: "100%" }}>
                <Select
                  displayEmpty
                  id={`streams.${index}.provider`}
                  name={`streams.${index}.provider`}
                  defaultValue={stream.provider}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.streams && formik.touched.streams[index].provider && formik.errors.streams !== undefined &&
                    Boolean((formik.errors.streams[index] as StreamData).provider)
                  }
                >
                  <MenuItem value="">Select Provider</MenuItem>
                  <MenuItem value="youtube">Youtube</MenuItem>
                  
                </Select>
                {formik.touched.streams && formik.touched.streams[index].provider && formik.errors.streams !== undefined &&
                    Boolean((formik.errors.streams[index] as StreamData).provider) ? (
                  <FormHelperText> {(formik.errors.streams[index] as StreamData).provider} </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth variant="standard">
                <OutlinedInput
                  id={`streams.${index}.url`}
                  name={`streams.${index}.url`}
                  placeholder="Enter your url"
                  onChange={formik.handleChange}
                  value={stream.url}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.streams && formik.touched.streams[index].url && formik.errors.streams !== undefined &&
                    Boolean((formik.errors.streams[index] as StreamData).url)
                  }
                />
                {formik.touched.streams && formik.touched.streams[index].url && formik.errors.streams !== undefined &&
                    Boolean((formik.errors.streams[index] as StreamData).url) ? (
                  <FormHelperText> {(formik.errors.streams[index] as StreamData).url} </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item md={12} display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                className={classes.button}
                onClick={():void => helper.remove(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
          <Box></Box>
        </Box>
      );
    });
  };

  return (
    <React.Fragment>
      <AccordionAlt
        title="Streams (Optional)"
        icon={{ expanded: <CircleCloseIcon /> }}
      >
        <FormikProvider value={formik}>
          <FieldArray
            name="streams"
            render={(helper):JSX.Element => {
              return (
                <React.Fragment>
                  {renderStreams(helper)}
                  <Box>
                    <Button
                      variant="outlined"
                      className={classes.addButton}
                      onClick={():void => addStreamHandler(helper)}
                    >
                      Add New Stream
                    </Button>
                  </Box>
                </React.Fragment>
              );
            }}
          />
        </FormikProvider>
      </AccordionAlt>
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

export default Streams;
