import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Select,
  OutlinedInput,
  MenuItem,
  TextField,
  Tooltip,
  Container
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import NoobPage from "../page/noob-page";
import NavTabs from "../ui-components/navtabs";
import Heading from "../ui-components/typography/heading";
import ViewCard from "../ui-components/view-card";
import Details from "./details";
import Participants from "./participants";
import Rules from "./rules";
import Bracket from "./brackets";
import Prizes from "./prizes";
import Image from "next/image";
import ActionButton, { ActionItem } from "../ui-components/action-button";
import { TournamentData } from "../tournament";
import axios from "axios";
import moment from "moment";
import { RoundStatusData } from "./brackets/BracketsInterface";
import ReactHtmlParser from "react-html-parser";
import { getAuthHeader } from "../../utils/headers";
import { useAppSelector } from "../../redux-store/redux-store";
import { userProfileSelector } from "../../redux-store/authentication/authentication-selectors";
import TeamSelection, { Team } from "./team-selection";
import Loader from "../ui-components/loader";
import { isDeviceTypeSelector } from "../../../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../../../src/frontend/redux-store/layout/device-types";
import { google } from "calendar-link";

interface JoinTeamType {
  tournamentId: string;
  userId: string;
  is_team_registration?: boolean;
  team_id?: string;
  user_list?: string[];
  gameUniqueId?: string[];
}

interface HeadSubSectionProps {
  time: string;
  name?: string;
}

const HeadSubSection = ({ time, name }: HeadSubSectionProps): any => {
  const [isCopied, setCopied] = React.useState(false);

  const copyLink = (): void => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Grid container>
      <Grid item md={4} display="flex">
        <Typography color={"#F08743"}>{time}</Typography>
      </Grid>
      <Grid
        item
        md={8}
        display="flex"
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Box
          style={{ cursor: "pointer" }}
          display="flex"
          marginRight={2}
          onClick={(): any => {
            const event: any = {
              title: `Noobstorm Game - ${name}`,
              description: "",
              start: moment(time, "DD/MM/YYYY hh:mm A").format(
                "YYYY-MM-DD hh:mm:ss +0530"
              ),
              duration: [1, "hour"],
            };
            window.open(google(event), "_blank");
          }}
        >
          <Image src="/icons/CalenderIcon.svg" height="18px" width="18px" />
          <Typography color={"white"} marginLeft={1}>
            Add to calendar
          </Typography>
        </Box>
        <Tooltip title={"Copied!"} open={isCopied}>
          <Box
            style={{ cursor: "pointer" }}
            display="flex"
            marginRight={2}
            onClick={copyLink}
          >
            <Image src="/icons/ShareIcon.svg" height="18px" width="18px" />
            <Typography color={"white"} marginLeft={1}>
              Share Tournamenta
            </Typography>
          </Box>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

const calculateDuration = (
  eventTime: moment.Moment,
  now: moment.Moment = moment()
): moment.Duration => moment.duration(eventTime.diff(now), "milliseconds");

const tabs: { title: string; url: string }[] = [
  { title: "Details", url: "Details" },
  { title: "Participants", url: "Participants" },
  { title: "Rules", url: "Rules" },
  { title: "Prizes", url: "Prizes" },
  { title: "Bracket", url: "Bracket" },
  { title: "Contact", url: "Contact" },
];

const ViewTournament: React.FC = () => {
  const user = useAppSelector(userProfileSelector);
  const [data, setData] = React.useState<TournamentData>({});
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;
  const tournamentBasePath = "/view-tournament";
  const timerRef = React.useRef(0);
  const [countDown, setCountDown] = React.useState("00:00:00");
  const [checkInCountDown, setCheckInCountDown] = React.useState("00:00:00");
  const [playerLimit, setPlayerLimit] = React.useState(0);
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [regError, setRegError] = React.useState();
  const [selectedTeam, setSelectedTeam] = React.useState<Team | undefined>();
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState("Details");
  const [gameId, setGameId] = useState("");
  const [gameIdModal, setGameIdModal] = useState(false);
  const [priviteGame, setPriviteGame] = useState(false);
  const [payload, setPayload] = useState<any>(undefined);
  const [joinCodeText, setJoinCodeText] = useState("");

  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  const fetchTeams = async (): Promise<void> => {
    const headers = await getAuthHeader();

    axios
      .get("/api/teams", {
        headers: { ...headers },
        params: { tournament_id: data.id },
      })
      .then((res) => {
        setTeams(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    setSelectedTeam(undefined);
  }, [openSuccessModal]);

  React.useEffect(() => {
    if (data.id) {
      fetchTeams();
    }
  }, [data]);

  const getActionItems = (): ActionItem[][] => {
    const select: ActionItem[] = [
      {
        title: "Select Team",
      },
    ];

    const create: ActionItem[] = [
      {
        title: "Create Team",
        onClick: (): void => {
          router.push("/team/create", `/team/create`, { shallow: true });
        },
      },
    ];

    const teamItems: ActionItem[] = teams.map((team) => {
      return {
        title: team.name,
        onClick: (): void => {
          setSelectedTeam(team);
        },
      };
    });

    const items: ActionItem[][] = [];
    items.push(select);
    if (teamItems.length > 0) {
      items.push(teamItems);
    } else {
      items.push(create);
    }

    return items;
  };

  const timerCallback = React.useCallback(() => {
    if (data.basic) {
      const mDate = moment(data.basic.startDate);
      const mTime = moment(data.basic.startTime);
      mDate
        .set({
          hours: mTime.get("hours"),
          minutes: mTime.get("minutes"),
          seconds: mTime.get("seconds"),
        });

      const checkingMDate = moment(mDate).subtract(
        (data?.bracketsMetadata?.checkInAmount || 0) > 0
          ? data?.bracketsMetadata?.checkInAmount
          : 0,
        "minutes"
      ); 
      const now = moment();

      let diff = mDate.diff(now);
      let checkingDiff = checkingMDate.diff(now);


      

      if (checkingDiff <= 0) {
        setCheckInCountDown("00:00:00");
      } else {
        checkingDiff = checkingMDate.diff(now, "hours");
        if (checkingDiff > 24) {
          checkingDiff = checkingMDate.diff(now, "days");
          setCheckInCountDown(`${checkingDiff} days`);
        } else {
          const matchTimer = calculateDuration(checkingMDate, now);
          setCheckInCountDown(
            `${matchTimer.hours()}:${matchTimer.minutes()}:${matchTimer.seconds()}`
          );
        }
      }

      if (diff <= 0) {
        setCountDown("00:00:00");
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

          setData({
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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  React.useEffect(() => {
    if (router.query.id && router.query.id) {
      setLoading(true);

      fetchAllDetails();
    }
  }, [router.query.id]);

  React.useEffect(() => {
    if (data.basic) {
      timerRef.current = window.setInterval(timerCallback, 1000);
    }

    if (data.settings && data.settings.tournamentFormat) {
      const tokens = data.settings.tournamentFormat.split("v");
      setPlayerLimit(parseInt(tokens[0]));
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [data]);

  const getAsURL = (endPath: string): string => {
    if (
      query &&
      query.slug &&
      Array.isArray(query.slug) &&
      query.slug.length > 0
    ) {
      return `${tournamentBasePath}/${router.query.id}/${endPath}`;
    }
    return tournamentBasePath;
  };
  const getUrl = (): string => {
    return `${tournamentBasePath}/[id]/[...slug]`;
  };
  const items = [
    {
      title: "Details",
      url: getUrl(),
      as: getAsURL("details"),
      isActive: (url: string): boolean => {
        return url.indexOf("/details") > -1;
      },
    },
    {
      title: "Participants",
      url: getUrl(),
      as: getAsURL("participants"),
      isActive: (url: string): boolean => {
        return url.indexOf("/participants") > -1;
      },
    },
    {
      title: "Rules",
      url: getUrl(),
      as: getAsURL("rules"),
      isActive: (url: string): boolean => {
        return url.indexOf("/rules") > -1;
      },
    },
    {
      title: "Prizes",
      url: getUrl(),
      as: getAsURL("prizes"),
      isActive: (url: string): boolean => {
        return url.indexOf("/prizes") > -1;
      },
    },
    {
      title: "Bracket",
      url: getUrl(),
      as: getAsURL("bracket"),
      isActive: (url: string): boolean => {
        return url.indexOf("/bracket") > -1;
      },
    },
    {
      title: "Contact",
      url: getUrl(),
      as: getAsURL("contact"),
      isActive: (url: string): boolean => {
        return url.indexOf("/contact") > -1;
      },
    },
  ];

  const getCurrent = (): string => {
    if (
      query &&
      query.slug &&
      Array.isArray(query.slug) &&
      query.slug.length > 0
    ) {
      return query.slug[0];
    }
    return "";
  };

  const getMomentDate = (
    date: string,
    time: string
  ): {
    dateStr: string;
    date: moment.Moment;
    startDate: string;
    startTime: string;
  } => {
    const mDate = moment(date).format("DD/MM/YYYY");
    const mTime = moment(time).format("hh:mm A");
    const dateStr = `${mDate} ${mTime}`;
    const mDateTime = moment(dateStr, "DD/MM/YYYY hh:mm: A");
    return {
      dateStr: dateStr,
      date: mDateTime,
      startDate: mDate,
      startTime: mTime,
    };
  };

  const getBracketProps = (): RoundStatusData[] => {
    if (
      !data.bracketsMetadata ||
      data.bracketsMetadata === null ||
      data?.basic?.startDate === null ||
      !data?.basic?.startDate ||
      !data.bracketsMetadata.startTime ||
      data.bracketsMetadata.startTime === null
    ) {
      // return [];
    }

    const startDate = data?.basic?.startDate || new Date().toISOString();
    const startTime = data.basic?.startTime || new Date().toISOString();
    const now = moment();
    return (data.bracketsMetadata?.rounds || []).map((round, index) => {
      let timing;
      if (parseInt(round.round) === 1) {
        timing = round.startTime
          ? getMomentDate(startDate, round.startTime || startTime)
          : getMomentDate(startDate, startTime);
      } else {
        timing = getMomentDate(startDate, round.startTime || startTime);
      }
      return {
        type: (round.map || []).length
          ? round.map.join(", ")
          : "No Map provieded",
        isFinished: timing.date.isBefore(now),
        round: index + 1,
        name: round.name,
        startDate: timing.startDate,
        startTime: timing.startTime,
      } as RoundStatusData;
    });
  };

  const renderComponent = (): JSX.Element => {
    const current = getCurrent();
    switch (current) {
      case "details":
        return <Details data={data} />;
      case "participants":
        return <Participants data={data} />;
      case "rules":
        return <Rules data={data} />;
      case "prizes":
        return <Prizes data={data} />;
      case "bracket":
        return (
          <Bracket
            rounds={getBracketProps()}
            brackets={data?.brackets}
            players={data?.playerList as any}
            type={data?.bracketsMetadata?.type || ""}
          />
        );
      default:
        return (
          <ViewCard title="Contact Details">
            <div style={{ fontFamily: "Inter", fontSize: !isDesktop ? 10 : 15 }}>
              {ReactHtmlParser(data.info?.contactDetails || "")}
            </div>
          </ViewCard>
        );
    }
  };

  const onTabClick = (tab: string): void => {
    if (!tab || tab === "") return;
    router.push(getUrl(), getAsURL(tab.toLowerCase()), { shallow: true });
  };

  const onJoinTeam = async (payload: JoinTeamType): Promise<void> => {
    if (!payload) {
      return;
    }
    setPayload(payload);
    setGameIdModal(true);
  };

  const onJoinTeamApi = async (payload: JoinTeamType): Promise<void> => {
    if (!payload) {
      return;
    }
    setGameIdModal(false);
    setGameId("");
    const headers = await getAuthHeader();
    axios
      .post(
        "/api/tournaments/register",
        { ...payload, gameUniqueId: gameId },
        { headers: { ...headers } }
      )
      .then(() => {
        fetchAllDetails();
        setOpenSuccessModal(true);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 500) {
          setRegError(err.response.data.errors[0]);
        }
      });
  };

  const onSinglePlayerJoin = (): void => {
    if (!user || !data.id) {
      return;
    }
    setGameIdModal(true);
    const payload: JoinTeamType = {
      tournamentId: data.id,
      userId: user.id,
      is_team_registration: undefined,
    };
    onJoinTeam(payload);
  };

  const onTeamJoin = (teamId: string, players: string[]): void => {
    if (!user || !data.id) {
      return;
    }
    const payload: JoinTeamType = {
      tournamentId: data.id,
      userId: user.id,
      is_team_registration: true,
      team_id: teamId,
      user_list: players,
    };
    onJoinTeam(payload);
  };

  useEffect(() => {
    const isSingleJoined = (
      data?.playerList?.filter((i: any) => i.id === user?.id) || []
    ).length;
    const isTeamJoined = (
      data?.playerList?.filter((i: any) => i.team_id === selectedTeam?.id) || []
    ).length;
    if (
      data.joinStatus === "private" &&
      !(isSingleJoined > 0 || isTeamJoined > 0)
    ) {
      setPriviteGame(true);
    } else {
      setPriviteGame(false);
    }
  }, [data]);

  const renderTeamSelection = (): JSX.Element | undefined => {
    return (
      selectedTeam && (
        <ViewCard
          contentProps={{ sx: { padding: 0, paddingBottom: "0!important" } }}
        >
          <TeamSelection
            onBack={(): void => {
              setSelectedTeam(undefined);
              setRegError(undefined);
            }}
            maxPlayer={playerLimit}
            team={selectedTeam}
            onJoin={onTeamJoin}
            error={regError}
            data={data}
            entryFees={parseInt(data.settings?.entryFeeAmount || "0") || 0}
          />
        </ViewCard>
      )
    );
  };

  const tournamentDetails = (): JSX.Element | undefined => {
    if (selectedTeam) {
      return renderTeamSelection();
    }
    return (
      <React.Fragment>
        <Loader loading={loading} />
        <ViewCard>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 0.3 }}>
              {data.basic?.sponsor && (
                <img src={data.basic?.sponsor} style={{ height: 40, width: 80 }} />
              )}
            </div>
            <div style={{ flex: 0.3, marginLeft: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {countDown !== "00:00:00" ? (
                    <Typography>
                      <span style={{ color: "#FF0000", fontSize: 8 }}>
                        Check In Ends In:
                      </span>{" "}
                    </Typography>
                  ) : (
                    <Typography>
                      <span style={{ color: "#FF0000", fontSize: 8 }}>
                        Check-In Ended
                      </span>
                    </Typography>
                  )}
                  {checkInCountDown && <span style={{ fontSize: 8 }}>{checkInCountDown}</span>}
                  {countDown !== "00:00:00" ? (
                    <Typography>
                      <span style={{ color: "#FF0000", fontSize: 8 }}>
                        Round 1 begins in :
                      </span>{" "}
                    </Typography>
                  ) : (
                    <Typography style={{ color: "#FF0000", fontSize: 8, textAlign: "center", lineHeight: 1, marginTop: 5, marginBottom: 5 }}>
                        Tournament already started
                    </Typography>
                  )}
                  {countDown && <span style={{ fontSize: 8 }}>{countDown}</span>}
              </div>
            </div>

            <div style={{ flex: 0.4, marginLeft: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography>
                  <span style={{ fontSize: 8 }}>Credits : </span>
                  <span style={{ color: "rgba(105,50,249,1)", fontSize: 8 }}>
                    {data?.settings?.entryType === "credit" ? data.settings?.entryFeeAmount : "Free"}
                  </span>
                </Typography>
                <Button style={{ fontSize: 8 }} variant="contained" onClick={(): any => router.push("/match-hub")}>
                  Match Hub
                </Button>
              </div>
            </div>
          </div>
        </ViewCard>
        {countDown !== "00:00:00" ? (
          <ActionButton
            data={data}
            error={regError}
            onClick={onSinglePlayerJoin}
            buttonOnly={playerLimit === 1}
            items={getActionItems()}
            id={"action-item"}
            userId={user?.id}
            disabled={countDown === "00:00:00"}
            style={{ width: "100%", fontSize: 8 }}
          />
        ) : null}
        {!isDesktop && (
          <Select
            value={page}
            input={<OutlinedInput />}
            onChange={(e: any): void => {
              onTabClick(e.target.value), setPage(e.target.value);
            }}
            fullWidth
            sx={{ m: 1, right: 8, fontSize: 10 }}
          >
            {tabs.map((tab) => {
              return (
                <MenuItem key={tab.url} value={tab.url} style={{ fontSize: 10 }}>
                  {tab.title}
                </MenuItem>
              );
            })}
          </Select>
        )}
        {renderComponent()}
      </React.Fragment>
    );
  }

  const renderTournament = (): JSX.Element | undefined => {
    if (selectedTeam) {
      return renderTeamSelection();
    }

    return (
      <React.Fragment>
        <Loader loading={loading} />

        <ViewCard>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item xs={6}>
              {data.basic?.sponsor && (
                <img
                  src={data.basic?.sponsor}
                  style={{ height: 80, width: 200 }}
                />
              )}
            </Grid>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"flex-end"}
            >
              <Box marginRight="16px">
                <Box textAlign={"right"}>
                  {countDown !== "00:00:00" ? (
                    <Typography>
                      <span style={{ color: "#FF0000" }}>
                        Check In Ends In:
                      </span>{" "}
                      {checkInCountDown}
                    </Typography>
                  ) : (
                    <Typography>
                      <span style={{ color: "#FF0000" }}>
                        Check-In Ended
                      </span>
                    </Typography>
                  )}
                </Box>
                <Box textAlign={"right"}>
                  {countDown !== "00:00:00" ? (
                    <Typography>
                      <span style={{ color: "#FF0000" }}>
                        Round 1 begins in :
                      </span>{" "}
                      {countDown}
                    </Typography>
                  ) : (
                    <Typography>
                      <span style={{ color: "#FF0000" }}>
                        Tournament already started
                      </span>
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box marginRight="16px">
                <Typography>
                  {" "}
                  Credits :
                  <span
                    style={{ color: "rgba(105,50,249,1)", paddingLeft: "5px" }}
                  >
                    {data?.settings?.entryType === "credit"
                      ? data.settings?.entryFeeAmount
                      : "Free"}
                  </span>
                </Typography>
              </Box>
              {/* CHECK HERE */}
              {countDown !== "00:00:00" ? (
                <ActionButton
                  data={data}
                  error={regError}
                  onClick={onSinglePlayerJoin}
                  buttonOnly={playerLimit === 1}
                  items={getActionItems()}
                  id={"action-item"}
                  userId={user?.id}
                  disabled={countDown === "00:00:00"}
                />
              ) : null}
              <Box>
                <Button
                  size="large"
                  variant="contained"
                  style={{ padding: 15, marginLeft: 10 }}
                  onClick={(): any => router.push("/match-hub")}
                >
                  Match Hub
                </Button>
              </Box>
            </Box>
          </Box>
        </ViewCard>
        <Box marginX={"70px"}>
          {isDesktop && (
            <NavTabs
              items={items.map((item) => item.title)}
              current={getCurrent()}
              onClick={onTabClick}
              altNav
            />
          )}
          {!isDesktop && (
            <Select
              value={page}
              input={<OutlinedInput />}
              onChange={(e: any): void => {
                onTabClick(e.target.value), setPage(e.target.value);
              }}
              fullWidth
              sx={{ m: 1 }}
            >
              {tabs.map((tab) => {
                return (
                  <MenuItem key={tab.url} value={tab.url}>
                    {tab.title}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </Box>
        {renderComponent()}
      </React.Fragment>
    );
  };

  return (
    <NoobPage
      title="View Tournament"
      metaData={{
        description: "Noob Storm tournament page",
      }}
    >
      <React.Fragment>
        {isDesktop && (
          <Heading
            heading={data.basic?.name}
            backgroundImage
            backgroundImageUrl={data?.basic?.banner || ""}
          >
            <HeadSubSection
              time={
                moment(data.basic?.startDate).format("DD/MM/YYYY") +
                " " +
                moment(data.basic?.startTime).format("hh:mm A")
              }
              name={data.basic?.name}
            />
          </Heading>
        )}
        {!isDesktop && (
          <Container maxWidth="sm">
            <img src={data?.basic?.banner} style={{ height: "auto", width: "100%", marginTop: 20 }} />
          </Container>
        )}
        {isDesktop && renderTournament()}
        {!isDesktop && tournamentDetails()}
        <Dialog open={priviteGame}>
          <DialogTitle>Enter Join Code</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              value={joinCodeText}
              onChange={(e): any => setJoinCodeText(e.target.value)}
              autoFocus
              margin="none"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(): void => {
                if (data.joinCode === joinCodeText) {
                  setPriviteGame(false);
                }
              }}
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={gameIdModal} onClose={(): void => setGameIdModal(false)}>
          <DialogTitle>
            Please enter your Account ID (PSN/XBOX/PC/Mobile) associated with
            relevant game/tournament
          </DialogTitle>
          <Box p={1} pr={2} pl={2}>
            <TextField
              variant="outlined"
              value={gameId}
              onChange={(e): any => setGameId(e.target.value)}
              autoFocus
              margin="none"
              fullWidth
            />
          </Box>
          <DialogActions>
            <Button
              onClick={(): Promise<void> => onJoinTeamApi(payload)}
              variant="contained"
            >
              Join
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openSuccessModal}
          onClose={(): void => setOpenSuccessModal(false)}
        >
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            {data.settings?.tournamentFormat === "1v1"
              ? "tournament successfully joined."
              : "The Invite has been successfully sent to your team members."}
          </DialogContent>
          <DialogActions>
            <Button onClick={(): void => setOpenSuccessModal(false)} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </NoobPage>
  );
};

export default ViewTournament;
