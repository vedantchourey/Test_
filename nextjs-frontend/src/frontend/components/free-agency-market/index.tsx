import styled from "@emotion/styled";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Noob404Page from "../../../../pages/404";
import NoobPage from "../page/noob-page";
import FreeAgencyMarketCard from "../ui-components/free-agency-market";
import TeamMembers from "./members";
import MemberButton from "./members/member/index1";
import OfferReceieve from "./offerreceived";
import OfferTeamMembers from "./offersent";
import WatchTeamMembers from "./watchlist";

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

const FreeAgencyMarket: React.FC = (): JSX.Element => {
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

  const renderTabs = (): JSX.Element => {
    
    let page;
    if (query.slug) {
      if (Array.isArray(query.slug)) {
        page = (query.slug || []).join("/");
      } else {
        page = query.slug;
      }
    }
    
    if (isMobile) {
      return (
        <Select
          value={page}
          input={<OutlinedInput />}
          onChange={(e: any):void => changeTabByValue(e.target.value)}
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
      );
    }
    else if (getActiveTab() === 0 || query.slug === "members") {
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
        {isMobile && (getActiveTab() === 0 || query.slug === "members") ? (
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