import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Noob404Page from "../../../../pages/404";
import NoobPage from "../page/noob-page";
import TeamCard from "../ui-components/team-card";
import Permissions from "./permissions";
import styled from "@emotion/styled";
import TeamMembers, { Player } from "./members";
import axios from "axios";
import { getAuthHeader } from "../../utils/headers";
import Loader from "../ui-components/loader";
import MatchHistory from "./match-history";
import { IMatchHubData } from "../../../../pages/match-hub";
import { userProfileSelector } from "../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../redux-store/redux-store";

export const NoobTab = styled(Tab)(() => ({
  textTransform: "capitalize",
  //border: "1px solid #31274A",
  "&.Mui-selected": {
    //background: "#6932F9",
    color: "#6932F9",
    border: "0px",
  },
}));

const tabs: { title: string; url: string }[] = [
  { title: "Members", url: "members" },
  { title: "Match History", url: "match/history" },
  { title: "Permissions", url: "permissions" },
];

const readOnlyTabs: { title: string; url: string }[] = [
  { title: "Members", url: "members" },
  { title: "Match History", url: "match/history" },
];

const getActive = (url: string): number => {
  return tabs.findIndex((tab) => tab.url === url);
};

interface TeamType {
  id: string;
  name: string;
  created_by: string;
  team_elo_rating: string;
  players: Player[];
}

const Team: React.FC = () => {
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;
  const user = useAppSelector(userProfileSelector);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [team, setTeam] = React.useState<TeamType | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<IMatchHubData[]>([]);
  const [hasAccess, setHasAccess] = React.useState<boolean>(false);

  const matchHistory = data.filter(
    (i) => i.opponent1.team_id === query.id || i.opponent2.team_id === query.id
  );

  const fetchTeam = async (): Promise<void> => {
    if (query.id) {
      const headers = await getAuthHeader();
      setLoading(true);

      axios
        .get("/api/teams", {
          params: { id: query.id, user_id: query.user_id },
          headers: headers,
        })
        .then((res) => {
          if (res.data.result && res.data.result.length > 0) {
            setTeam(res.data.result[0]);
            const checkAccess = res.data.result[0].players.find(
              (i: any) => i.user_id === user?.id
            );
            if (checkAccess) setHasAccess(true);
            else setHasAccess(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    }
  };

  const fetchData = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/tournaments/user-matchs", { headers: headers })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    fetchTeam();
    fetchData();
  }, [query.id]);

  const renderComponent = (): JSX.Element => {
    let page;
    if (query.slug) {
      if (Array.isArray(query.slug)) {
        page = (query.slug || []).join("/");
      } else {
        page = query.slug;
      }
    }
    switch (page) {
      case "match/history":
        return <MatchHistory data={matchHistory} teamId={query.id as string} />;
      case "permissions":
        return <Permissions team={team} players={team?.players || []} />;
      case "members":
        return (
          <TeamMembers
            players={team?.players || []}
            teamId={query.id as string}
            team={team}
            hasAccess={hasAccess}
          />
        );

      default:
        return <Noob404Page />;
    }
  };

  const getActiveTab = (): number => {
    let page;
    if (query.slug) {
      if (Array.isArray(query.slug)) {
        page = (query.slug || []).join("/");
      } else {
        page = query.slug;
      }
    }
    if (page) {
      return getActive(page);
    }
    return -1;
  };

  const changeTab = (current: number): void => {
    const tab = tabs[current];
    if (!tab) {
      return;
    }
    router.push(
      "/team/view/[id]/[...slug]",
      `/team/view/${query.id}/${tab.url}`,
      { shallow: true }
    );
  };

  const changeTabByValue = (tab: string): void => {
    router.push("/team/view/[id]/[...slug]", `/team/view/${query.id}/${tab}`, { shallow: true });
  };

  const renderTabs = (): JSX.Element | JSX.Element[] => {
    if (isMobile) {
      let page;
      if (query.slug) {
        if (Array.isArray(query.slug)) {
          page = (query.slug || []).join("/");
        } else {
          page = query.slug;
        }
      }
      return (
        <FormControl sx={{ minWidth: "100%" }}>
          <Select
            value={page}
            input={<OutlinedInput />}
            onChange={(e): void => changeTabByValue(e.target.value)}
          >
            {(hasAccess ? tabs : readOnlyTabs).map((tab) => {
              return (
                <MenuItem key={tab.url} value={tab.url}>
                  {tab.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }

    return (
      <Tabs
        value={getActiveTab()}
        onChange={(e, value): void => changeTab(value)}
      >
        {(hasAccess ? tabs : readOnlyTabs).map(({ title }) => {
          return <NoobTab label={title} key={title} />;
        })}
      </Tabs>
    );
  };

  return (
    <React.Fragment>
      <Loader loading={loading} />

      <NoobPage
        title="Team"
        metaData={{
          description: "Noob Storm team page",
        }}
      >
        <TeamCard
          name={team?.name}
          team={team}
          refresh={fetchTeam}
          hasAccess={hasAccess}
          elo={team?.team_elo_rating}
        >
          {isMobile && (
            <Box
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "#08001C",
                display: "flex",
                width: "270px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            </Box>
          )}
          <Box display={"flex"} justifyContent="space-between">
            {renderTabs()}
            {!isMobile ? (
              <Box
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "#08001C",
                  display: "flex",
                  width: "270px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography color={"white"}>
                  Team Elo Rating:
                  <span style={{ color: "#F09633", marginLeft: "30px" }}>
                    {team?.team_elo_rating}
                  </span>
                </Typography>
              </Box>
            ) : null}
          </Box>

          <Box marginY={2}>{renderComponent()}</Box>
        </TeamCard>
      </NoobPage>
    </React.Fragment>
  );
};

export default Team;
