import React from "react";
import NoobPage from "../page/noob-page";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Noob404Page from "../../../../pages/404";
import MatchHistory from "./match-history";
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
import TeamCard from "../ui-components/team-card";
import Permissions from "./permissions";
import styled from "@emotion/styled";
import TeamMembers from "./members";

export const NoobTab = styled(Tab)(() => ({
  textTransform: "capitalize",
  border: "1px solid #31274A",
  "&.Mui-selected": {
    background: "#6932F9",
    color: "white",
    border: "0px",
  },
}));

const tabs: { title: string; url: string }[] = [
  { title: "Members", url: "members" },
  { title: "Match History", url: "match/history" },
  { title: "Permissions", url: "permissions" },
];

const getActive = (url: string): number => {
  return tabs.findIndex((tab) => tab.url === url);
};

const Team: React.FC = () => {
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        return <MatchHistory />;
      case "permissions":
        return <Permissions />;
      case "members":
        return <TeamMembers />;

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
    router.push("/team/view/[...slug]", `/team/view/${tab.url}`, { shallow: true });
  };

  const changeTabByValue = (tab:string):void=>{
    router.push("/team/view/[...slug]", `/team/view/${tab}`, { shallow: true });
  }

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
        <FormControl fullWidth  >
          <Select value={page} input={<OutlinedInput />} onChange={(e)=>changeTabByValue(e.target.value)}>
            {tabs.map((tab) => {
              console.log(tab.url)
              return <MenuItem key={tab.url} value={tab.url}>{tab.title}</MenuItem>;
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
        {tabs.map(({ title }) => {
          return <NoobTab label={title} key={title} />;
        })}
      </Tabs>
    );
  };

  return (
    <NoobPage
      title="Team"
      metaData={{
        description: "Noob Storm team page",
      }}
    >
      <TeamCard>
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
                  {" "}
                  356{" "}
                </span>{" "}
              </Typography>
            </Box>
          ) : null}
        </Box>

        <Box marginY={2}>{renderComponent()}</Box>
      </TeamCard>
    </NoobPage>
  );
};

export default Team;
