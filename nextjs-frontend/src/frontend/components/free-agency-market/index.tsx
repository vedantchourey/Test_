import React from "react";
import NoobPage from "../page/noob-page";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Noob404Page from "../../../../pages/404";
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
  Button,
  Grid
} from "@mui/material";
import FreeAgencyMarketCard from "../ui-components/free-agency-market";
import Permissions from "./permissions";
import styled from "@emotion/styled";
import TeamMembers from "./members";
import OfferTeamMembers from "./offersent";
import WatchTeamMembers from "./watchlist";
import OfferReceieve from "./permissions";
import MemberButton from "./members/member/index1";
import { string } from "joi";

export const NoobTab = styled(Tab)(() => ({
  textTransform: "capitalize",
  border: "1px solid #31274A",
  "&.Mui-selected": {
    background: "#6932F9",
    color: "white",
    border: "0px",
  },
}));

export const NoobButton = styled(Button)(() => ({
  color: "white",
  borderRadius: 0,
  textTransform: "capitalize",
}));

const tabs: { title: string; url: string }[] = [
  { title: "View All", url: "members" },
  { title: "Watchlist", url: "watchlist" },
  { title: "Offer Sent", url: "offer/sent" },
  { title: "Offer Received", url: "offer/received" },
];



const getActive = (url: string): number => {
  return tabs.findIndex((tab) => tab.url === url);
};

const FreeAgencyMarket: React.FC = () => {
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
      case "members":
        return <><TeamMembers /></>;
      // return <><MemberButton/><TeamMembers /></>;
      case "watchlist":
        return <WatchTeamMembers />;
      case "offer/sent":
        return <OfferTeamMembers />;
      case "offer/received":
        return <OfferReceieve />;

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
    router.push("/free-agency-market/view/[...slug]", `/free-agency-market/view/${tab.url}`, { shallow: true });
  };


  const changeTabByValue = (tab: string): void => {
    router.push("/free-agency-market/view/[...slug]", `/free-agency-market/view/${tab}`, { shallow: true });
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
          <Select value={page} input={<OutlinedInput />} onChange={(e) => changeTabByValue(e.target.value)}
          fullWidth  sx={{ m: 1 }}>
            {tabs.map((tab) => {
              console.log(tab.url)
              return <MenuItem key={tab.url} value={tab.url}>{tab.title}</MenuItem>;
            })}
          </Select>
      );
    }

    const is_view_all_tab = (): Boolean => {
      if (getActiveTab() == 0 || query.slug == "members") {
        return true;
      }
      else
        return false;

    }

    const return_controls = (): JSX.Element | JSX.Element[] => {
      if (getActiveTab() == 0 || query.slug == "members") {
        return (
          <>
            <Grid>
              <Tabs
                value={getActiveTab()}
                onChange={(e, value): void => changeTab(value)}
              >
                {tabs.map(({ title }) => {
                  return <NoobTab label={title} key={title} />;
                })}
              </Tabs>
            </Grid>
            <Grid><MemberButton /></Grid>
          </>
        )

      }
      else {
        return (
          <>
            <Tabs
              value={getActiveTab()}
              onChange={(e, value): void => changeTab(value)}
            >
              {tabs.map(({ title }) => {
                return <NoobTab label={title} key={title} />;
              })}
            </Tabs>
          </>
        )
      }
    }

    return return_controls()
  };

  return (
    <NoobPage
      title="Free Agency Market"
      metaData={{
        description: "Noob Storm Free Agency Market page",
      }}
    >
      <FreeAgencyMarketCard>
        <Box display={"flex"} justifyContent="space-between">
          {renderTabs()}
        </Box>
        {isMobile && (getActiveTab() == 0 || query.slug == "members") ? (
          <MemberButton />
        ) :
          null
        }
        <Box marginY={2}>{renderComponent()}</Box>
      </FreeAgencyMarketCard>
    </NoobPage>
  );
};

export default FreeAgencyMarket;
