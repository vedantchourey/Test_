import styled from "@emotion/styled";
import {
  Button,
  Chip,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { TournamentData } from "../..";
import { ReactComponent as CircleCloseIcon } from "../../../../../../public/icons/close.svg";
import { getRoundName } from "../../../../services/get-round-name";
import { getAuthHeader } from "../../../../utils/headers";
import AccordionAlt from "../../../ui-components/accordion";
import CardLayout from "../../../ui-components/card-layout";

export const HeadCell = styled(TableCell)(() => ({
  alignItems: "center",
  border: "none",
}));

export const NoobCell = styled(TableCell)(() => ({
  alignItems: "center",
  color: "rgba(229, 229, 229, 0.5)",
  border: "none",
}));

export const NoobRow = styled(TableRow)(() => ({
  align: "center",
}));

export interface Tournament {
  id: number;
  tournamentId: number;
  matchId: number;
  status: string;
  reason: string;
  reportedBy: TournamentReporter;
  createdAt: Date;
}

export interface TournamentReporter {
  stateId: string;
  lastName: string;
  username: string;
  countryId: string;
  firstName: string;
  agreeToTnc: boolean;
  dateOfBirth: Date;
}

export const calculateDiff = (createdAt: Date): string => {
  const today_date = new Date();
  const days = moment(today_date).diff(moment(createdAt), "days");
  return String(days);
};

const MatchDashboard: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const [tournamentdata, setData] = React.useState<Tournament[]>([]);
  const [resultReq, setResultReq] = React.useState<any[]>([]);
  const [popVisible, setPopupVisible] = React.useState<boolean>(false);
  const [matchData, setMatchData] = React.useState<any>(undefined);
  const [matchIssueModal, setMatchIssueModal] = React.useState<any>(null);
  const [image, setImage] = React.useState<string>("");
  const [winnerId, setWinnerId] = React.useState<any>(null);
  const [selectedRound, setSelectedRound] = React.useState<number | undefined>(
    undefined
  );
  const [tournamentDetails, setTournamentDetails] =
    React.useState<TournamentData | null>(null);

  const match: any[] = tournamentDetails?.brackets?.match || [];
  const round = tournamentDetails?.brackets?.round || [];
  const group = tournamentDetails?.brackets?.group || [];
  const type = tournamentDetails?.brackets.stage[0].type;

  const roundList = _.unionBy(
    match.map((i: any) => {
      return {
        name: getRoundName(group, match, round, i.id, type),
        id: i.round_id,
      };
    }),
    "id"
  );

  const handleRemoveNotCheckedInPlayers = async (): Promise<void> => {
    const findFirstRoundMatch: any[] = tournamentDetails?.brackets.match
      .map((m: any) => {
        const opponent1Player = tournamentDetails?.brackets.participant.find(
          (p: any) => m.opponent1.id === p.user_id || m.opponent1.id === p.id
        );
        const opponent2Player = tournamentDetails?.brackets.participant.find(
          (p: any) => m.opponent2.id === p.user_id || m.opponent2.id === p.id
        );
        return {
          ...m,
          opponent1: {
            ...m.opponent1,
            player: opponent1Player.user_id || opponent1Player.team_id,
            is_checked_in: opponent1Player.is_checked_in,
          },
          opponent2: {
            ...m.opponent2,
            player: opponent2Player.user_id || opponent2Player.team_id,
            is_checked_in: opponent2Player.is_checked_in,
          },
        };
      })
      .filter((m: any) => m.round_id === selectedRound)
      .filter(
        (m: any) =>
          (!m.opponent1.is_checked_in || !m.opponent2.is_checked_in)
          // &&
          // !m.opponent1.result &&
          // !m.opponent2.result
      );

    const setResult: any[] = findFirstRoundMatch.map((m) => {
      return {
        ...m,
        match_id: m.id,
        tournament_id: tournamentDetails?.id,
        status: "RESOLVED",
        forceUpdate: true,
        opponent1: {
          id: m.opponent1.id,
          position: m.opponent1.position,
          score: !m.opponent1.is_checked_in ? 0 : 1,
          result: !m.opponent1.is_checked_in ? "loss" : "win",
          user_id: m.opponent1.player,
          // forfeit: !m.opponent1.is_checked_in,
        },
        opponent2: {
          id: m.opponent2.id,
          position: m.opponent2.position,
          score: !m.opponent2.is_checked_in ? 0 : 1,
          result: !m.opponent2.is_checked_in ? "loss" : "win",
          user_id: m.opponent2.player,
          // forfeit: !m.opponent2.is_checked_in,
        },
      };
    });

    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();

    await Promise.any(
      setResult.map((match) =>
        axios
          .patch(
            endpoint,
            {
              ...match,
            },
            { headers: headers }
          )
          .catch((err) => console.warn(err)))
    );
    fetchAllDetails();
    alert("Auto seeding completed");
  };

  const autoSeedBrackets = async (): Promise<void> => {
    const findFirstRoundMatch: any[] = tournamentDetails?.brackets.match
      .map((m: any) => {
        const opponent1Player = tournamentDetails?.brackets.participant.find(
          (p: any) => m.opponent1.id === p.user_id || m.opponent1.id === p.id
        );
        const opponent2Player = tournamentDetails?.brackets.participant.find(
          (p: any) => m.opponent2.id === p.user_id || m.opponent2.id === p.id
        );
        return {
          ...m,
          opponent1: {
            ...m.opponent1,
            player: opponent1Player.user_id || opponent1Player.team_id,
          },
          opponent2: {
            ...m.opponent2,
            player: opponent2Player.user_id || opponent2Player.team_id,
          },
        };
      })
      .filter((m: any) => m.round_id === selectedRound)
      .filter(
        (m: any) =>
          !m.opponent2.id ||
          !m.opponent2.player ||
          !m.opponent1.id ||
          !m.opponent1.player
      );

    const setResult: any[] = findFirstRoundMatch.map((m) => {
      const noHavePlayers = !m.opponent2?.player && !m.opponent1?.player
      
      return {
        ...m,
        match_id: m.id,
        tournament_id: tournamentDetails?.id,
        status: "RESOLVED",
        forceUpdate: true,
        opponent1: {
          id: m.opponent1.id,
          position: m.opponent1.position,
          score: noHavePlayers ? 1 : !m.opponent1?.player ? 0 : 1,
          result: noHavePlayers ? "win" : !m.opponent1?.player ? "loss" : "win",
          user_id: m.opponent1.player,
          
        },
        opponent2: {
          id: m.opponent2.id,
          position: m.opponent2.position,
          score: noHavePlayers ? 0 : !m.opponent2?.player ? 0 : 1,
          result: noHavePlayers ? "loss" : !m.opponent2?.player ? "loss" : "win",
          user_id: m.opponent2.player,
        },
      };
    });

    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();

    await Promise.any(
      setResult.map((match) =>
        axios
          .patch(
            endpoint,
            {
              ...match,
            },
            { headers: headers }
          )
          .catch((err) => console.warn(err)))
    );
    fetchAllDetails();
    alert("Auto seeding completed");
  };

  const autoEliminateBrackets = async (): Promise<void> => {
    const findFirstRoundMatch: any[] = tournamentDetails?.brackets.match
      .map((m: any) => {
        const opponent1Player = tournamentDetails?.brackets.participant.find(
          (p: any) => m.opponent1.id === p.user_id || m.opponent1.id === p.id
        );
        const opponent2Player = tournamentDetails?.brackets.participant.find(
          (p: any) => m.opponent2.id === p.user_id || m.opponent2.id === p.id
        );
        return {
          ...m,
          opponent1: {
            ...m.opponent1,
            player: opponent1Player.user_id || opponent1Player.team_id,
          },
          opponent2: {
            ...m.opponent2,
            player: opponent2Player.user_id || opponent2Player.team_id,
          },
        };
      })
      .filter((m: any) => m.round_id !== selectedRound)
      .filter(
        (m: any) =>
          m.opponent1.player &&
          m.opponent2.player &&
          !m.opponent1.result &&
          !m.opponent2.result
      );

    const setResult: any[] = findFirstRoundMatch.map((m) => {
      return {
        ...m,
        match_id: m.id,
        tournament_id: tournamentDetails?.id,
        status: "RESOLVED",
        forceUpdate: true,
        opponent1: {
          id: m.opponent1.id,
          position: m.opponent1.position,
          score: 1,
          result: "draw",
          user_id: m.opponent1.player,
        },
        opponent2: {
          id: m.opponent2.id,
          position: m.opponent2.position,
          score: 0,
          result: "draw",
          user_id: m.opponent2.player,
        },
      };
    });

    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();

    await Promise.any(
      setResult.map((match) =>
        axios
          .patch(
            endpoint,
            {
              ...match,
            },
            { headers: headers }
          )
          .catch((err) => console.warn(err)))
    );
    fetchAllDetails();
    alert("Auto seeding completed");
  };

  const fetchAllDetails = (): void => {
    axios
      .get(`/api/tournaments/${router.query.id}/details`)
      .then((res) => {
        if (res.data.data) {
          const tournamentData = res.data.data;
          Object.keys(tournamentData).forEach((key) => {
            if (tournamentData[key] === null) {
              delete tournamentData[key];
            }
          });

          setTournamentDetails({
            ...tournamentData,
            basic: {
              name: tournamentData.name,
              about: tournamentData.about,
              game: tournamentData.game,
              startDate: tournamentData.startDate,
              startTime: moment(tournamentData.startTime, "hh:mm:ss").toDate(),
              banner: tournamentData.banner,
              sponsor: tournamentData.sponsor,
              createTemplateCode: tournamentData.createTemplateCode,
              cloneTournament: tournamentData.createTemplateCode !== undefined,
            },
            publishData: {
              society: tournamentData.joinStatus,
              registration: tournamentData.status,
            },
          } as TournamentData);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const tournamentList = async (): Promise<void> => {
    try {
      const endpoint = "/api/match-dispute/list";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { tournamentId: id }, headers: headers })
        .then((res) => {
          setData(res.data);
        });
    } catch (err) {
      alert(err);
    }
  };
  const fetchMatchResultReq = async (): Promise<void> => {
    try {
      const endpoint = "/api/tournaments/match-result";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { tournament_id: id }, headers: headers })
        .then((res) => {
          setResultReq(res.data);
        });
    } catch (err) {
      alert(err);
    }
  };
  React.useEffect(() => {
    tournamentList();
    fetchMatchResultReq();
    fetchAllDetails();
  }, []);

  const resolveDispute = async (id: any): Promise<void> => {
    const endpoint = "/api/match-dispute/update";
    const headers = await getAuthHeader();
    axios
      .patch(endpoint, { id, status: "RESOLVED" }, { headers: headers })
      .then(() => {
        tournamentList();
      });
  };

  const fetchMatch = async (item: any): Promise<void> => {
    try {
      const endpoint = `/api/tournaments/${item.tournamentId}/${item.matchId}`;
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { tournament_id: id }, headers: headers })
        .then((res) => {
          setMatchData(res.data);
          setMatchIssueModal(item);
          // setResultReq(res.data);
        });
    } catch (err) {
      alert(err);
    }
  };
  React.useEffect(() => {
    tournamentList();
    fetchMatchResultReq();
  }, []);

  const updateResult = async ({
    id,
    tournament_id,
    draw,
    opponent1_id,
    winnerId,
  }: any): Promise<void> => {
    let op1Result,
      op2Result,
      op1Score = 0,
      op2Score = 0;
    if (draw) {
      op1Result = "draw";
      op2Result = "draw";
    } else if (winnerId === opponent1_id) {
      op1Result = "win";
      op2Result = "lose";
      op1Score = 1;
    } else {
      op1Result = "lose";
      op2Result = "win";
      op2Score = 1;
    }

    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();
    axios
      .patch(
        endpoint,
        {
          id,
          match_id: id,
          status: "RESOLVED",
          tournament_id,
          forceUpdate: true,
          opponent1: {
            user_id: matchData?.opponent1?.[0]?.user_id,
            score: op1Score,
            result: op1Result,
          },
          opponent2: {
            user_id: matchData?.opponent2?.[0]?.user_id,
            score: op2Score,
            result: op2Result,
          },
        },
        { headers: headers }
      )
      .then(() => {
        fetchMatchResultReq();
        resolveDispute(matchIssueModal.id);
        tournamentList();
        fetchMatchResultReq();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setMatchIssueModal(null);
        setMatchData(null);
      });
  };

  const acceptResult = async ({
    id,
    tournament_id,
    opponent1,
    opponent2,
  }: any): Promise<void> => {
    const endpoint = "/api/tournaments/match-result";
    const headers = await getAuthHeader();
    axios
      .patch(
        endpoint,
        {
          id,
          status: "RESOLVED",
          tournament_id,
          opponent1Id: opponent1.player.id,
          opponent2Id: opponent2.player.id,
        },
        { headers: headers }
      )
      .then(() => {
        fetchMatchResultReq();
      });
  };

  const toggle = (data: string): void => {
    setImage(data);
    setPopupVisible(!popVisible);
  };
  return (
    <React.Fragment>
      <Box display={"flex"}>
        <FormControl
          size="small"
          margin="none"
          style={{ margin: 0, minWidth: 200, marginRight: 10 }}
        >
          <InputLabel id="round-select-label">Select Round</InputLabel>
          <Select
            margin="none"
            labelId="round-select-label"
            id="round-select"
            value={selectedRound}
            label="Select Round"
            onChange={(e): any =>
              setSelectedRound(parseInt(e.target.value as string))
            }
          >
            {roundList.map((m) => (
              <MenuItem value={m.id} key={m.id}>
                {m.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={(): any => autoSeedBrackets()}
          variant="outlined"
          size="small"
        >
          Auto Seed
        </Button>
        <Button
          onClick={(): any => autoEliminateBrackets()}
          variant="outlined"
          size="small"
          sx={{ ml: 1 }}
        >
          Eliminate player who not enter result
        </Button>
        <Button
          onClick={(): any => handleRemoveNotCheckedInPlayers()}
          variant="outlined"
          size="small"
          sx={{ ml: 1 }}
        >
          Eliminate not checked in player
        </Button>
      </Box>

      <AccordionAlt
        title="MATCH DISTIPUTES"
        icon={{ expanded: <CircleCloseIcon /> }}
      >
        <CardLayout title="Match Distiputes">
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <NoobRow>
                      <HeadCell>
                        <Typography align="left">Match</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Type of Report</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Reporter</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Status</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Assign</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Action</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Time Since Report</Typography>
                      </HeadCell>
                    </NoobRow>
                    {tournamentdata.map((item) => {
                      return (
                        <NoobRow key={item.id}>
                          <NoobCell>
                            <Typography>{item?.matchId}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>{item?.reason}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              {item?.reportedBy?.firstName}{" "}
                              {item?.reportedBy?.lastName}
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              <Chip
                                label={item.status}
                                color={
                                  item.status === "PENDING"
                                    ? "warning"
                                    : "success"
                                }
                              />
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>co-admin</Typography>
                          </NoobCell>
                          {/* {item.status === "PENDING" ? ( */}
                          <NoobCell>
                            <Typography>
                              <Button onClick={(): any => fetchMatch(item)}>
                                Resolve
                              </Button>
                            </Typography>
                          </NoobCell>
                          {/* ) : (
                            <>
                              <Typography></Typography>
                            </>
                          )} */}
                          <NoobCell>
                            <Typography>
                              {moment(item.createdAt).fromNow()}
                            </Typography>
                          </NoobCell>
                        </NoobRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardLayout>
      </AccordionAlt>
      <AccordionAlt
        title="MATCH RESULT REQUEST"
        icon={{ expanded: <CircleCloseIcon /> }}
      >
        <CardLayout title="Match Result Request">
          <Grid container rowSpacing={1} columnSpacing={5}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <NoobRow>
                      <HeadCell>
                        <Typography align="left">Match</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Opponent 1 Score</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Opponent 2 Score</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Status</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>Action</Typography>
                      </HeadCell>
                      <HeadCell>
                        <Typography>View Image</Typography>
                      </HeadCell>
                    </NoobRow>
                    {resultReq.map((item) => {
                      return (
                        <NoobRow key={item.id}>
                          <NoobCell>
                            <Typography>{item.match_id}</Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography
                              color={
                                item?.opponent1?.score === 0 ? "red" : "green"
                              }
                            >
                              {item?.opponent1?.player?.username ||
                                item?.opponent1?.player?.name}
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography
                              color={
                                item?.opponent2?.score === 0 ? "red" : "green"
                              }
                            >
                              {item?.opponent2?.player?.username ||
                                item?.opponent2?.player?.name}
                            </Typography>
                          </NoobCell>
                          <NoobCell>
                            <Typography>
                              <Chip
                                label={item.result_status}
                                color={
                                  item.result_status === "ACCEPTED"
                                    ? "success"
                                    : "warning"
                                }
                              />
                            </Typography>
                          </NoobCell>
                          {/* {item.result_status === "PENDING" ? ( */}
                            <NoobCell>
                              <Typography>
                                <Button onClick={(): any => acceptResult(item)}>
                                  Resolve
                                </Button>
                              </Typography>
                            </NoobCell>
                          {/* ) : (
                            <>
                              <Typography></Typography>
                            </>
                          )} */}
                          <NoobCell>
                            <Button
                              onClick={(): any => toggle(item.screenshot)}
                            >
                              View
                            </Button>
                          </NoobCell>
                        </NoobRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardLayout>
      </AccordionAlt>
      <Dialog open={Boolean(matchIssueModal)}>
        <Box minWidth={500} p={2}>
          <Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Winner
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={winnerId}
                  label="Select Winner"
                  onChange={(e): any => setWinnerId(e.target.value)}
                >
                  <MenuItem value={matchData?.opponent1?.[0]?.id || matchData?.opponent1?.id }>
                    {matchData?.opponent1?.[0]?.username ||
                      matchData?.opponent1?.[0]?.name ||
                      matchData?.opponent1?.team_name ||
                      "NA"}
                  </MenuItem>
                  <MenuItem value={matchData?.opponent2?.[0]?.id || matchData?.opponent2?.id}>
                    {matchData?.opponent2?.[0]?.username ||
                      matchData?.opponent2?.[0]?.name ||
                      matchData?.opponent2?.team_name ||
                      "NA"}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button onClick={(): any => setMatchIssueModal(null)}>Close</Button>
            <Button
              onClick={(): any => {
                updateResult({
                  id: matchIssueModal.matchId,
                  tournament_id: matchIssueModal.tournamentId,
                  draw: false,
                  opponent1_id: matchData?.opponent1?.[0]?.id,
                  winnerId: winnerId,
                });
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        open={popVisible}
        onClose={(): void => toggle("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <img height={"70%"} src={image} />
      </Dialog>
      <Box display="flex" justifyContent={"flex-end"}>
        <Button variant="contained"> Send </Button>
      </Box>
    </React.Fragment>
  );
};

export default MatchDashboard;
