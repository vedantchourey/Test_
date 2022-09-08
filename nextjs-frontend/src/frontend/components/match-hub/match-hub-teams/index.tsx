import React, { SyntheticEvent, useEffect } from "react";
// Third party packages
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Avatar,
  Divider,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { SelectChangeEvent } from "@mui/material/Select";
import ResultTile from "../opponent-tile/result-tile/result-tile";
import Players, { PlayerData } from "../players";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { getAuthHeader } from "../../../utils/headers";
import CheckIcon from "@mui/icons-material/Check";
import { blobToFile } from "../../../../common/utils/utils";
import { uploadImage } from "../../../service-clients/image-service-client";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import { v4 } from "uuid";
import moment from "moment";
import { IMatchHubData } from "../../../../../pages/match-hub";
import { userProfileSelector } from "../../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";
import ChatBox from "../../chat/ChatBox";
import styles from "../../match-hub/match-hub.module.css";
import { useRouter } from "next/router";
import { getRoundName } from "../../../services/get-round-name";
import _ from "lodash";

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
  match: IMatchHubData;
  onBack?: () => void;
}

const calculateDuration = (
  eventTime: moment.Moment,
  now: moment.Moment = moment()
): moment.Duration => moment.duration(eventTime.diff(now), "milliseconds");

const MatchHubTeams: React.FC<Props> = ({ match, onBack }) => {
  const user = useAppSelector(userProfileSelector);
  const router = useRouter();
  const [uploadResults, setUploadResults] = React.useState(false);
  const [resultStatus, setResultStatus] = React.useState(false);
  const [data, setData] = React.useState<PlayerData | undefined>();
  const [loading, setLoading] = React.useState(false);
  const [matchReportSubmited, setMatchReportSubmited] = React.useState(false);
  const [chatChannel, setChatChannel] = React.useState<any>(undefined);
  const [supportChatChannel, setSupportChatChannel] =
    React.useState<any>(undefined);
  const [tabValue, setTabValue] = React.useState<any>("1");
  const [isCheckedIn, setIsCheckedIn] = React.useState<boolean>(false);
  const [team, setTeam] = React.useState<any[]>([]);

  const fetchTeam = async (): Promise<void> => {
    const headers = await getAuthHeader();
    setLoading(true);
    axios
      .get("/api/teams", { headers: headers })
      .then((res) => {
        if (res.data.result && res.data.result.length > 0) {
          setTeam(res.data.result);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const name = getRoundName(
    match.tournament.brackets.group as any[],
    match.tournament.brackets.match as any[],
    match.tournament.brackets.round as any[],
    parseInt(match.match_id),
    match.tournament.brackets.stage[0].type
  );

  const matchData = match.tournament.bracketsMetadata.rounds.find(
    (r: any) => r.name === name
  );

  const isMyTeam =
    match.opponent1.team_id &&
    team.find(
      (t) =>
        t.id === match.opponent1.team_id || t.id === match.opponent2.team_id
    );

  const myPlayer = !match.opponent1.team_id
    ? match.opponent1.user_id === user?.id
      ? match.opponent1
      : match.opponent2
    : match.opponent1?.team_id === isMyTeam?.id
    ? match.opponent1
    : match.opponent2;

  const opponent_data: any = !match.opponent1.team_id
    ? match.opponent1.user_id !== user?.id
      ? match.opponent1
      : match.opponent2
    : match.opponent1?.team_id !== isMyTeam?.id
    ? match.opponent1
    : match.opponent2;

  const opponent1Name = match.opponent1.user_id
    ? `${match.opponent1.firstName} ${match.opponent1.lastName}`
    : match.opponent1.name;
  const opponent2Name = match.opponent2.user_id
    ? `${match.opponent2.firstName} ${match.opponent2.lastName}`
    : match.opponent2.name;

  const handleChange = (event: SyntheticEvent, newValue: string): void => {
    setTabValue(null);
    setTimeout(() => setTabValue(newValue), 500);
  };

  const createNewChat = async (isSupportChat?: boolean): Promise<any> => {
    const channel_id = isSupportChat
      ? `${match.match_id}_support`
      : match.match_id;
    const isTeamMatch = Boolean(match.opponent1.team_id);

    const chatUsers = [];
    if (isSupportChat) chatUsers.push({ id: "support", name: "Support" });
    if (
      (match.opponent1.user_id && match.opponent2.user_id) ||
      (match.opponent2.team_id && match.opponent2.team_id)
    ) {
      if (isTeamMatch) {
        (match.opponent1?.players || []).map((u) =>
          chatUsers.push({ id: u.id, name: u.username }));
        (match.opponent2?.players || []).map((u) =>
          chatUsers.push({ id: u.id, name: u.username }));
      } else {
        chatUsers.push({
          id: match.opponent1.user_id,
          name: `${match.opponent1.firstName} ${match.opponent1.lastName}`,
        });
        chatUsers.push({
          id: match.opponent2.user_id,
          name: `${match.opponent2.firstName} ${match.opponent2.lastName}`,
        });
      }
    } else {
      return;
    }
    await Promise.all(
      chatUsers.map((u) =>
        frontendSupabase.from("chat_users").insert({
          channel_id,
          user_id: u.id,
          user_name: u.name,
          other_user: channel_id,
          channel_name: `MATCH-${channel_id}`,
          channel_type: "match",
        }))
    );

    const chatChannel = await frontendSupabase
      .from("chat_users")
      .select()
      .eq("user_id", user?.id || "")
      .eq("other_user", match.match_id);
    if ((chatChannel.data || [])?.length > 0) {
      if (isSupportChat) setSupportChatChannel(chatChannel.data?.[0]);
      else setChatChannel(chatChannel.data?.[0]);
    }
  };

  const fetchChatChannel = async (): Promise<any> => {
    const chatChannel = await frontendSupabase
      .from("chat_users")
      .select()
      .eq("user_id", user?.id || "")
      .eq("other_user", match.match_id);

    const chatChannelWithSupport = await frontendSupabase
      .from("chat_users")
      .select()
      .eq("user_id", user?.id || "")
      .eq("other_user", `${match.match_id}_support`);

    if (chatChannelWithSupport.data?.length === 0) {
      createNewChat(true);
    } else {
      setSupportChatChannel(chatChannelWithSupport.data?.[0]);
    }

    if (chatChannel.data?.length === 0) {
      createNewChat();
    } else {
      setChatChannel(chatChannel.data?.[0]);
    }
  };

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
      op1Score = 1;
    } else {
      op1Result = "lose";
      op2Result = "win";
      op2Score = 1;
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

  const [reportIssue, setReportIssue] = React.useState("");

  const handleChangeissue = (event: SelectChangeEvent): any => {
    setReportIssue(event.target.value);
    reportDispute(event.target.value);
  };

  const reportDispute = async (resons: string): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .post(
        `/api/match-dispute/add`,
        {
          tournamentId: match.tournament_id,
          matchId: match.match_id,
          status: "PENDING",
          reason: resons,
        },
        {
          headers: headers,
        }
      )
      .then(() => {
        setMatchReportSubmited(true);
      });
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
      .then(() => {
        setIsCheckedIn(true);
      })
      .catch((err: any) => {
        console.error(err);
        alert("User already checked in");
      });
  };

  React.useEffect(() => {
    setLoading(false);
    const timerRef = window.setInterval(timerCallback, 1000);
    return () => {
      clearInterval(timerRef);
    };
  }, [data]);

  const [countDown, setCountDown] = React.useState("00:00:00");
  const timerCallback = React.useCallback(() => {
    if (match?.tournament) {
      const mDate = moment(match.tournament.startDate);
      const mTime = moment(
        matchData.startTime ||
          match.tournament.settings.checkInStartTime ||
          match.tournament.startTime,
        "hh:mm:SS"
      );
      mDate.set({
        hours: mTime.get("hours"),
        minutes: mTime.get("minutes"),
        seconds: mTime.get("seconds"),
      });
      const now = moment();
      let diff = mDate.diff(now);
      if (diff <= 0) {
        setCountDown("Started");
      } else {
        diff = mDate.diff(now, "hours");
        if (diff > 24) {
          diff = mDate.diff(now, "days");
          setCountDown(`${diff} days`);
        } else {
          const timer = calculateDuration(mDate, now);
          setCountDown(
            `${timer.hours()}:${timer.minutes()}:${timer.seconds()}`
          );
        }
      }
    }
  }, [data]);

  React.useEffect(() => {
    fetchChatChannel();
    if (!match.opponent1.user_id) {
      fetchPlayerData();
    }
  }, [match]);

  const onDrop = React.useCallback((acceptedFiles: File[]): void => {
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
              data={match}
              isWon={true}
              opponent1Name={opponent1Name}
              opponent2Name={opponent2Name}
              child={
                <Box color="white" style={{ textAlign: "center" }}>
                  <Typography variant="h3" component={"h1"}>
                    VS
                  </Typography>
                  <Typography>
                    Check start in:{" "}
                    <Typography component={"span"}>{countDown}</Typography>
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Grid>

        {match.opponent1.team_id && (
          <Grid
            container
            display={"flex"}
            style={{ justifyContent: "center", marginTop: "30px" }}
          >
            <Grid item xs={5.5}>
              <Typography className={styles.sub_heading}>My Teams</Typography>
              {Object.values(_.groupBy(myPlayer.players, "id"))?.map((u: any, idx: any) => {
                const avatarUrl = u[0].avatarUrl
                  ? (frontendSupabase.storage
                      .from("public-files")
                      .getPublicUrl(u[0].avatarUrl).publicURL as string)
                  : undefined;
                return (
                  <Box style={{ marginRight: 20 }} key={idx}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                      }}
                      key={idx}
                      onClick={(): void => {
                        router.push(`/account/${u[0].username}`);
                      }}
                    >
                      <Avatar src={avatarUrl} />
                      <Typography style={{ marginLeft: "10px" }}>
                        {u[0].username}
                      </Typography>
                    </Box>
                    <Divider light />
                  </Box>
                );
              })}
            </Grid>
            <Divider orientation="vertical" light />
            <Grid item xs={5.5}>
              <Typography className={styles.sub_heading}>
                Opponent Teams
              </Typography>
              {Object.values(_.groupBy(opponent_data.players, "id"))?.map((u: any, idx: any) => {
                const avatarUrl = u[0].avatarUrl
                  ? (frontendSupabase.storage
                      .from("public-files")
                      .getPublicUrl(u[0].avatarUrl).publicURL as string)
                  : undefined;

                return (
                  <Box style={{ marginLeft: 20 }} key={idx}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                      }}
                      key={idx}
                      onClick={(): void => {
                        router.push(`/account/${u[0].username}`);
                      }}
                    >
                      <Avatar src={avatarUrl} />
                      <Typography style={{ marginLeft: "10px" }}>
                        {u[0].username}
                      </Typography>
                    </Box>
                    <Divider light />
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        )}

        {!match.opponent1.user_id && data ? (
          <Grid item xs={12}>
            <Players data={data} />
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            marginTop="60px"
            alignItems={"center"}
          >
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
              disabled={match.is_checked_in || isCheckedIn}
              style={{
                color: "white",
                padding: "12px 38px",
                backgroundColor:
                  match.is_checked_in || isCheckedIn
                    ? "rgba(255,255,255,0.2)"
                    : "#08001C",
                border:
                  match.is_checked_in || isCheckedIn
                    ? undefined
                    : "1px solid #6932F9",
                margin: "0px 0px 0px 16px",
              }}
              onClick={(): any => checkInTournament()}
            >
              {match.is_checked_in || isCheckedIn ? "Checked in" : "Check In"}
            </Button>
            <Button
              style={{
                padding: "12px",
                background:
                  !opponent1Name || !opponent2Name
                    ? "rgba(255,255,255,0.2)"
                    : "#6932F9",
                color: "white",
                margin: "0px 16px 0px 16px",
              }}
              disabled={!opponent1Name || !opponent2Name}
              onClick={(): void => setUploadResults(true)}
            >
              Report Score
            </Button>
            {/* <Button
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
            </Button> */}
            {matchReportSubmited ? (
              "Match issue reported"
            ) : (
              <FormControl sx={{ m: 0, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Report Match Issue
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={reportIssue}
                  onChange={handleChangeissue}
                  autoWidth
                  label="Report Match Issue"
                  style={{
                    padding: "8px 38px",
                    background: "#830B0B",
                    color: "white",
                  }}
                >
                  <MenuItem value="The score in incorrect.">
                    The score in incorrect.
                  </MenuItem>
                  <MenuItem value="My opponent cheated.">
                    My opponent cheated.
                  </MenuItem>
                  <MenuItem value="Problem setting up the match">
                    Problem setting up the match
                  </MenuItem>
                  <MenuItem value="Ineligible roster">
                    Ineligible roster
                  </MenuItem>
                  <MenuItem value="Harassment">Harassment</MenuItem>
                  <MenuItem value="A player disconnected.">
                    A player disconnected.
                  </MenuItem>
                  <MenuItem value="Technical issue with Noobstorm">
                    Technical issue with Noobstorm
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </Grid>
      </Grid>
      {((chatChannel?.channel_id && !loading) ||
        (supportChatChannel?.channel_id && !loading)) && (
        <Grid style={{ marginTop: "20px" }}>
          <TabContext value={tabValue}>
            <TabList onChange={handleChange}>
              <Tab value="1" label={`${opponent1Name} vs ${opponent2Name}`} />
              <Tab value="2" label="Chat with Support" />
            </TabList>
            <TabPanel value="1">
              {chatChannel?.channel_id && !loading && (
                <Box
                  display={"flex"}
                  height={"500px"}
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  borderRadius={2}
                  mt={2}
                >
                  <ChatBox
                    channelId={chatChannel?.channel_id as string}
                    addMember={(): any => null}
                    channelName={
                      `${opponent1Name} vs ${opponent2Name}` as string
                    }
                    fetchChat={async (): Promise<any> => null}
                    onBack={(): any => null}
                    smallChat={true}
                    userId={user?.id as string}
                    user={user}
                    data={chatChannel?.channel_id}
                    key={1}
                    hideInfo={true}
                  />
                </Box>
              )}
            </TabPanel>
            <TabPanel value="2">
              {supportChatChannel?.channel_id && !loading && (
                <Box
                  display={"flex"}
                  height={"500px"}
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  borderRadius={2}
                  mt={2}
                >
                  <ChatBox
                    channelId={supportChatChannel?.channel_id as string}
                    addMember={(): any => null}
                    channelName={"Chat with Support"}
                    fetchChat={async (): Promise<any> => null}
                    onBack={(): any => null}
                    smallChat={true}
                    userId={user?.id as string}
                    user={user}
                    data={supportChatChannel?.channel_id}
                    key={1}
                    hideInfo={true}
                  />
                </Box>
              )}
            </TabPanel>
          </TabContext>
        </Grid>
      )}

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
          <Box
            marginY={2}
            display="flex"
            justifyContent={"flex-start"}
            alignItems="center"
          >
            <CheckIcon sx={{ color: "white", marginRight: 1 }} />
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
              <Select
                displayEmpty
                id="winner"
                disabled={formik.values.draw}
                name="winner"
                onChange={formik.handleChange}
                defaultValue={""}
              >
                <MenuItem value="">Select Winner</MenuItem>
                <MenuItem value={match.opponent1.id}>{opponent1Name}</MenuItem>
                <MenuItem value={match.opponent2.id}>{opponent2Name}</MenuItem>
              </Select>
              {formik.errors.winner ? (
                <FormHelperText sx={{ color: "red" }}>
                  Please select winner
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={4} md={4} display={"none"}>
              <Select
                displayEmpty
                defaultValue={""}
                disabled={formik.values.draw}
              >
                <MenuItem value="">Select Round</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} md={4} display={"none"}>
              <FormControlLabel
                value="true"
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    name="draw"
                    id="draw"
                  />
                }
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
              {formik.errors.screenshot ? (
                <Typography color="white" variant="body2" marginTop={1}>
                  {formik.errors.screenshot}
                </Typography>
              ) : (
                <Box display="flex" flexDirection={"column"}>
                  {formik?.values?.screenshot !== "" && (
                    <>
                      <Typography
                        style={{ textAlign: "left", margin: "10px 0px" }}
                      >
                        Preview
                      </Typography>
                      <img src={formik.values.screenshot} width="30%" />
                    </>
                  )}
                </Box>
              )}
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
