import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import NoobPage from "../page/noob-page";
import NavTabs from "../ui-components/navtabs";
import Heading from "../ui-components/typography/heading";
import ViewCard from "../ui-components/view-card";
import Details from "./details";
import Participants from "./participants";
import Rules from "./rules";
import Bracket from "./brackets";
import { ReactComponent as RainbowIcon } from "../../../../public/icons/RainbowIcon.svg";
import Prizes from "./prizes";
import Image from "next/image";
import ActionButton from "../ui-components/action-button";
import { TournamentData } from "../tournament";
import axios from "axios";
import moment from "moment";
import { RoundStatusData } from "./brackets/BracketsInterface";

const HeadSubSection: React.FC = () => {
  return (
    <Grid container>
      <Grid item md={4} display="flex">
        <Typography color={"#F08743"}>10 Oct 2018 14:35 PM</Typography>
      </Grid>
      <Grid
        item
        md={8}
        display="flex"
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Box style={{ cursor: "pointer" }} display="flex" marginRight={2}>
          <Image src="/icons/CalenderIcon.svg" height="18px" width="18px" />
          <Typography color={"white"} marginLeft={1}>
            Add to calendar
          </Typography>
        </Box>
        <Box style={{ cursor: "pointer" }} display="flex" marginRight={2}>
          <Image src="/icons/ShareIcon.svg" height="18px" width="18px" />
          <Typography color={"white"} marginLeft={1}>
            Share Tournament
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const actionItem = [
  [
    {
      title: "Select Team",
    },
  ],
  [
    {
      title: "Fight Club",
    },
    {
      title: "Legend Club",
    },
  ],
  [
    {
      title: "Create Team",
    },
  ],
];

const calculateDuration = (
  eventTime: moment.Moment,
  now: moment.Moment = moment()
): moment.Duration => moment.duration(eventTime.diff(now), "milliseconds");

const ViewTournament: React.FC = () => {
  const [data, setData] = React.useState<TournamentData>({});
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;
  const tournamentBasePath = "/view-tournament";
  const timerRef = React.useRef(0);
  const [countDown, setCountDown] = React.useState("00:00:00");

  const timerCallback = React.useCallback(() => {
    if (data.basic) {
      const mDate = moment(data.basic.startDate);
      const mTime = moment(data.basic.startTime);
      mDate.set({
        hours: mTime.get("hours"),
        minutes: mTime.get("minutes"),
        seconds: mTime.get("seconds"),
      });
      const now = moment();
      let diff = mDate.diff(now);
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

  React.useEffect(() => {
    if (router.query.id && router.query.id) {
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
                startTime: moment(
                  tournamentData.startTime,
                  "hh:mm:ss"
                ).toDate(),
                banner: tournamentData.banner,
                createTemplateCode: tournamentData.createTemplateCode,
                cloneTournament:
                  tournamentData.createTemplateCode !== undefined,
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
    }
  }, [router.query.id]);

  React.useEffect(() => {
    if (data.basic) {
      timerRef.current = window.setInterval(timerCallback, 1000);
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
      data.bracketsMetadata.startDate === null ||
      !data.bracketsMetadata.startDate ||
      !data.bracketsMetadata.startTime ||
      data.bracketsMetadata.startTime === null
    ) {
      return [];
    }
    const startDate = data.bracketsMetadata.startDate;
    const startTime = data.bracketsMetadata.startTime;
    const now = moment();
    return (data.bracketsMetadata.rounds || []).map((round, index) => {
      let timing;
      if (parseInt(round.round) === 1) {
        timing = getMomentDate(startDate, startTime);
      } else {
        timing = getMomentDate(startDate, round.startTime || startTime);
      }
      return {
        type: "Fracture",
        isFinished: timing.date.isBefore(now),
        round: index + 1,
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
        return <Participants />;
      case "rules":
        return <Rules data={data} />;
      case "prizes":
        return <Prizes />;
      case "bracket":
        return (
          <Bracket
            rounds={getBracketProps()}
            brackets={data?.brackets}
            type={data?.bracketsMetadata?.type || ""}
          />
        );
      default:
        return <Typography color={"white"}>Not found</Typography>;
    }
  };

  const onTabClick = (tab: string): void => {
    if (!tab || tab === "") return;
    router.push(getUrl(), getAsURL(tab.toLowerCase()), { shallow: true });
  };
  return (
    <NoobPage
      title="ViewTournament"
      metaData={{
        description: "Noob Storm tournament page",
      }}
    >
      
      <React.Fragment>
        <Heading
          heading="EndPointGG Vs CEX Esports[2]"
          backgroundImage
          backgroundImageUrl={data?.basic?.banner||""}
        >
          
          <HeadSubSection />
        </Heading>
        <ViewCard>
          <Grid container>
            <Grid item md={6}>
              <RainbowIcon />
            </Grid>
            <Grid
              item
              md={6}
              display="flex"
              alignItems="center"
              justifyContent={"flex-end"}
            >
              <Box marginRight="16px">
                <Typography>
                  <span style={{ color: "#FF0000" }}> Round 1 begins in :</span>{" "}
                  {countDown}
                </Typography>
              </Box>
              
              <Box marginRight="16px">
                <Typography>
                  {" "}
                  Credits :
                  <span style={{ color: "rgba(105,50,249,1)", paddingLeft:"5px" }}>
                    ${data.settings?.entryFeeAmount || 0}
                  </span>
                </Typography>
              </Box>
              
              <ActionButton items={actionItem} id={"action-item"} />
            </Grid>
          </Grid>
        </ViewCard>
        <Box marginX={"70px"}>
          <NavTabs
            items={items.map((item) => item.title)}
            current={getCurrent()}
            onClick={onTabClick}
            altNav
          />
        </Box>
        {renderComponent()}
      </React.Fragment>
    </NoobPage>
  );
};

export default ViewTournament;
