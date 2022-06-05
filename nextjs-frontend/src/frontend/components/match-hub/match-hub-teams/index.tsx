import React from "react";
// Third party packages
import { Grid, Box, Typography, IconButton, Select, MenuItem, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ResultTile from "../opponent-tile/result-tile/result-tile";
import Players, { PlayerData } from "../players";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { getAuthHeader } from "../../../utils/headers";
import { ReactComponent as FlagIcon } from "../../../../../public/icons/flagIcon.svg";
import CheckIcon from "@mui/icons-material/Check";
import { Match } from "..";
import { blobToFile } from "../../../../common/utils/utils";
import { uploadImage } from "../../../service-clients/image-service-client";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import { v4 } from "uuid";

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

interface Props {
  match: Match;
  onBack?: () => void;
}

const MatchHubTeams: React.FC<Props> = ({ match, onBack }) => {
  const [uploadResults, setUploadResults] = React.useState(false);
  const [resultStatus, setResultStatus] = React.useState(false);
  const [data, setData] = React.useState<PlayerData | undefined>();

  const opponent1Name = match.opponent1.user_id ? `${match.opponent1.firstName} ${match.opponent1.lastName}` : match.opponent1.name;
  const opponent2Name = match.opponent2.user_id ? `${match.opponent2.firstName} ${match.opponent2.lastName}` : match.opponent2.name;

  const validationSchema = yup.object({
    match_id: yup.string().required("Match id is required"),
    screenshot: yup.string().required("Screenshot is required"),
    winner: yup.string().when("draw", {
      is: "true",
      then: yup.string().required("Winner is required"),
      otherwise: yup.string(),
    }),
    draw: yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      match_id: match.match_id,
      screenshot: "",
      winner: "",
      draw: false,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      submitResult();
    },
  });

  const submitResult = async (): Promise<void> => {
    const headers = await getAuthHeader();
    let op1Result,
      op2Result,
      op1Score = 0,
      op2Score = 0;
    if (formik.values.draw) {
      op1Result = "draw";
      op2Result = "draw";
    } else if (formik.values.winner === match.opponent1.id) {
      op1Result = "win";
      op2Result = "lose";
      op1Score = 10;
    } else {
      op1Result = "lose";
      op2Result = "win";
      op2Score = 10;
    }

    const request = {
      ...formik.values,
      opponent1: {
        score: op1Score,
        result: op1Result,
      },
      opponent2: {
        score: op2Score,
        result: op2Result,
      },
      tournament_id: match.tournament_id,
    };

    delete (request as any).winner;
    delete (request as any).draw;

    axios
      .post("/api/tournaments/match-result", request, {
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

  const fetchPlayerData: any = async () => {
    const headers = await getAuthHeader();
    axios
      .get(`/api/tournaments/${match.tournament_id}/${match.match_id}`, {
        headers: headers,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        setData(undefined);
      });
  };

  const reportDispute = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios.post(
      `/api/match-dispute/add`,
      {
        tournamentId: match.tournament_id,
        matchId: match.match_id,
        status: "PENDING",
      },
      {
        headers: headers,
      }
    );
  };

  const checkInTournament = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .post(
        `/api/tournaments/checkIn`,
        {
          tournamentId: match.tournament_id,
        },
        {
          headers: headers,
        }
      )
      .catch();
  };

  React.useEffect(() => {
    if (!match.opponent1.user_id) {
      fetchPlayerData();
    }
  }, [match]);

  const onDrop = React.useCallback((acceptedFiles: File[]): void => {
    acceptedFiles.forEach(async (file: Blob): Promise<void> => {
      const fileName = `${v4()}.png`;
      const fileData = blobToFile(file, fileName);
      const { data, error } = await uploadImage("public-files", fileName, fileData);
      if (!error && data) {
        const fileUrl = frontendSupabase.storage.from("public-files").getPublicUrl(data.Key.split("/")[1]);
        formik.setFieldValue("screenshot", fileUrl.data?.publicURL || "");
      }
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
              opponent1Name={opponent1Name}
              opponent2Name={opponent2Name}
              child={
                <Box color="white">
                  <Typography variant="h3" component={"h1"}>
                    VS
                  </Typography>
                  <Typography>
                    Check start in: <Typography component={"span"}>00.00.12</Typography>
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Grid>
        {!match.opponent1.user_id && data ? (
          <Grid item xs={12}>
            <Players data={data} />
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <Box display={"flex"} justifyContent={"center"} marginTop="60px">
            <Button
              style={{
                color: "white",
                padding: "12px 38px",
                backgroundColor: "#08001C",
                border: "1px solid #6932F9",
              }}
              onClick={(): void => {
                if (onBack) {
                  onBack();
                }
              }}
            >
              Back
            </Button>
            <Button
              style={{
                color: "white",
                padding: "12px 38px",
                backgroundColor: "#08001C",
                border: "1px solid #6932F9",
                margin: "0px 0px 0px 16px",
              }}
              onClick={(): any => checkInTournament()}
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
              disabled={!opponent1Name || !opponent2Name}
              onClick={(): void => setUploadResults(true)}
            >
              Report Score
            </Button>
            <Button
              startIcon={<FlagIcon />}
              style={{
                padding: "12px 38px",
                background: "#830B0B",
                color: "white",
              }}
              onClick={(): void => {
                reportDispute();
              }}
            >
              Report Match Issue
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal open={resultStatus} onClose={(): void => setResultStatus(false)}>
        <Box sx={style}>
          <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="body1" color="white">
              Upload Result
            </Typography>
            <IconButton onClick={(): void => setResultStatus(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box marginY={2} display="flex" justifyContent={"flex-start"} alignItems="center">
            <CheckIcon sx={{ color: "white", marginRight: 1 }} />
            <Typography color="white" textAlign={"left"}>
              Result successfully send to opponent.
            </Typography>
          </Box>
        </Box>
      </Modal>
      <Modal open={uploadResults} onClose={(): void => setUploadResults(false)}>
        <Box sx={style}>
          <Box display="flex" justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="body1" color="white">
              Upload Result
            </Typography>
            <IconButton onClick={(): void => setUploadResults(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container rowSpacing={2}>
            <Grid item xs={12} sm={4} md={4}>
              <Select displayEmpty id="winner" disabled={formik.values.draw} name="winner" onChange={formik.handleChange} defaultValue={""}>
                <MenuItem value="">Select Winner</MenuItem>
                <MenuItem value={match.opponent1.id}>{opponent1Name}</MenuItem>
                <MenuItem value={match.opponent2.id}>{opponent2Name}</MenuItem>
              </Select>
              {formik.errors.winner ? <FormHelperText sx={{ color: "red" }}>Please select winner</FormHelperText> : null}
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Select displayEmpty defaultValue={""} disabled={formik.values.draw}>
                <MenuItem value="">Select Round</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControlLabel value="true" control={<Checkbox onChange={formik.handleChange} name="draw" id="draw" />} sx={{ color: "white" }} label="Mark as a draw" />
            </Grid>
            <Grid item xs={12}>
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }): JSX.Element => (
                  <Box sx={dropZone} component={"div"} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img src="/icons/folder.svg" alt="upload" />
                    <Typography textAlign={"center"} marginTop={2} variant="subtitle2" sx={{ color: "#6932F9" }}>
                      <Typography component={"span"}>Select </Typography> or Drag and Drop your files <br /> here
                    </Typography>
                  </Box>
                )}
              </Dropzone>
              <Typography color="white" variant="body2" marginTop={1}>
                Once you have identified a winner, we will send a request to the other user to accept it.
              </Typography>
              {formik.errors.screenshot && (
                <Typography color="white" variant="body2" marginTop={1}>
                  {formik.errors.screenshot}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} display="flex" justifyContent={"center"}>
              <Button
                sx={{
                  background: "linear-gradient(180deg, #EF507E 0%, #F09633 100%)",
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
