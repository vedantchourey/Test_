import React from "react";
// Third party packages
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ResultTile from "../opponent-tile/result-tile/result-tile";
import Players from "../players";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { getAuthHeader } from "../../../utils/headers";
import CheckIcon from '@mui/icons-material/Check';

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 500, md: 600 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const dropZone = {
  border: "1px dashed rgba(255, 255, 255, 0.3)",
  borderRadius: "10px",
  height: "178px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const MatchHubTeams: React.FC = () => {
  const [uploadResults, setUploadResults] = React.useState(false);
  const [resultStatus, setResultStatus] = React.useState(true);

  const validationSchema = yup.object({
    match_id: yup.string().required("Match id is required"),
    screenshot: yup.string().required("Screenshot is required"),
  });

  const formik = useFormik({
    initialValues: {
      match_id: "123",
      screenshot: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      submitResult();
    },
  });

  const submitResult = async ():Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .post("/api/tournaments/match-result", formik.values, {
        headers: headers,
      })
      .then(() => {
        setUploadResults(false);
        setResultStatus(true);
      })
      .catch((err) => {
        console.error(err);
        setResultStatus(false);
      });
  };

  const onDrop = React.useCallback((acceptedFiles: File[]): void => {
    acceptedFiles.forEach((file: Blob): void => {
      const reader = new FileReader();
      reader.onload = (): void => {
        const binaryStr = reader.result;
        formik.setFieldValue("screenshot", binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Box
            style={{
              backgroundColor: "#100626",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <ResultTile
              isWon={true}
              child={
                <Box color="white">
                  <Typography>VS</Typography>
                  <Typography>
                    Check start in:{" "}
                    <Typography component={"span"}>00.00.12</Typography>
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Players />
        </Grid>
        <Grid item xs={12}>
          <Box display={"flex"} justifyContent={"center"} marginTop="60px">
            <Button
              style={{
                color: "white",
                padding: "12px 38px",
                backgroundColor: "#08001C",
                border: "1px solid #6932F9",
              }}
            >
              Check In
            </Button>
            <Button
              style={{
                padding: "12px",
                background: "#6932F9",
                color: "white",
                margin: "0px 16px 0px 16px",
              }}
              onClick={(): void => setUploadResults(true)}
            >
              Report Score
            </Button>
            <Button
              style={{
                padding: "12px 38px",
                background: "#830B0B",
                color: "white",
              }}
            >
              Report Match Issue
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal open={resultStatus} onClose={(): void => setResultStatus(false)}>
        <Box sx={style}>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body1" color="white">
              Upload Result
            </Typography>
            <IconButton onClick={(): void => setResultStatus(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box marginY={2} display="flex" justifyContent={"flex-start"} alignItems="center">
            <CheckIcon sx={{color:"white", marginRight:1}}/>
              <Typography color="white" textAlign={"left"}>
                Result successfully send to opponent.
              </Typography>
          </Box>
        </Box>
      </Modal>
      <Modal open={uploadResults} onClose={(): void => setUploadResults(false)}>
        <Box sx={style}>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body1" color="white">
              Upload Result
            </Typography>
            <IconButton onClick={(): void => setUploadResults(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container rowSpacing={2}>
            <Grid item xs={12} sm={4} md={4}>
              <Select displayEmpty defaultValue={""}>
                <MenuItem value="">Select Winner</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Select displayEmpty defaultValue={""}>
                <MenuItem value="">Select Round</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControlLabel
                value="true"
                control={<Checkbox />}
                sx={{ color: "white" }}
                label="Mark as a draw"
              />
            </Grid>
            <Grid item xs={12}>
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }): JSX.Element => (
                  <Box sx={dropZone} component={"div"} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src="/icons/folder.svg" alt="upload" />
                    <Typography
                      textAlign={"center"}
                      marginTop={2}
                      variant="subtitle2"
                      sx={{ color: "#6932F9" }}
                    >
                      <Typography component={"span"}>Select </Typography> or
                      Drag and Drop your files <br /> here
                    </Typography>
                  </Box>
                )}
              </Dropzone>
              <Typography color="white" variant="body2" marginTop={1}>
                Once you have identified a winner, we will send a request to the
                other user to accept it.
              </Typography>
              {
                formik.errors.screenshot && (
                  <Typography color="white" variant="body2" marginTop={1}>
                {formik.errors.screenshot}
              </Typography>
                )
              }
            </Grid>
            <Grid item xs={12} display="flex" justifyContent={"center"}>
              <Button
                sx={{
                  background:
                    "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
                  borderRadius: 0,
                }}
                size="large"
                variant="contained"
                onClick={formik.submitForm}
              >
                Send Result
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default MatchHubTeams;
