import React from "react";
import Grid from "@mui/material/Grid";

import {
  OutlinedInput,
  Typography,
  Theme,
  Checkbox,
  TextField,
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
import { DatePicker } from "@mui/lab";

const useStyles = makeStyles((theme: Theme) =>
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
  })
);

const Basic = () => {
  const style = useStyles();
  const [data, setData] = React.useState({ hasTournament: false, from:null, to:null});
  const changeHandler = (property: string, value: string | boolean | Date | null) => {
    setData({ ...data, [property]: value });
  };
  return (
    <React.Fragment>
      <CardLayout title="Required Fields">
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Select Game"></FormLabel>
              <OutlinedInput
                id="game"
                placeholder="FIFA22"
                className={style.inputBox}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Start Date(DD/MM/YYYY)"></FormLabel>
              <DatePicker onChange={(value)=>changeHandler("from",value)} value={data.from} renderInput={
                (params)=><TextField {...params}/>
              }/>
              <FormHelperText> Date Displayed in IST </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Start Time"></FormLabel>
              <DatePicker onChange={(value)=>changeHandler("from",value)} value={data.from} renderInput={
                (params)=><TextField {...params}/>
              }/>

              <FormHelperText> Time Displayed in IST </FormHelperText>
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
                  onChange={(e) =>
                    changeHandler("hasTournament", e.target.checked)
                  }
                />
              </Box>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {data.hasTournament ? (
              <FormControl fullWidth variant="standard">
                <FormLabel label={""}></FormLabel>
                <OutlinedInput
                  id="game"
                  placeholder="Template code"
                  className={style.inputBox}
                />
              </FormControl>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <AccordionAlt title="About">
              <NoobReachTextEditor />
            </AccordionAlt>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="standard">
              <FormLabel label="Header Banner"></FormLabel>
              <Dropzone>
                {({ getRootProps, getInputProps }) => (
                  <Box
                    className={style.dropZone}
                    component={"div"}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <img src="icons/Upload.svg"  alt="upload"/>
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
    </React.Fragment>
  );
};

export default Basic;
