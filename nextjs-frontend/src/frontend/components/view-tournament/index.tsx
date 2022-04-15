import {
  Grid,
  Typography,
} from "@mui/material";
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

const HeadSubSection:React.FC = () => {
  return (
    <Grid container >
      <Grid item md={4} display="flex">
        <Typography color={"#F08743"}>10 Oct 2018 14:35 PM</Typography>
      </Grid>
      <Grid item md={8} display="flex" justifyContent={"flex-end"} alignItems={"center"}>
        <Box style={{ cursor: "pointer" }} display="flex" marginRight={2}>
          <Image src="/icons/CalenderIcon.svg" height="18px" width="18px" />
          <Typography color={"white"} marginLeft={1}>Add to calendar</Typography>
        </Box>
        <Box style={{ cursor: "pointer" }} display="flex" marginRight={2}>
          <Image src="/icons/ShareIcon.svg" height="18px" width="18px" />
          <Typography color={"white"} marginLeft={1}>Share Tournament</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const actionItem = [[{
  title:"Select Team",
}],[{
  title:"Fight Club",
},{
  title:"Legend Club",
}],[{
  title:"Create Team",
}]]

const ViewTournament: React.FC = () => {
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;
  const tournamentBasePath = "/view-tournament";
  

  const getAsURL = (endPath: string): string => {
    if (
      query &&
      query.slug &&
      Array.isArray(query.slug) &&
      query.slug.length > 0
    ) {
      return `${tournamentBasePath}/${query.slug[0]}/${endPath}`;
    }
    return tournamentBasePath;
  };
  const getUrl = (): string => {
    return `${tournamentBasePath}/[...slug]`;
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
      query.slug.length > 1
    ) {
      return query.slug[1];
    }
    return "";
  };

  const renderComponent = (): JSX.Element => {
    const current = getCurrent();
    switch (current) {
      case "details":
        return <Details />;
      case "participants":
        return <Participants />;
      case "rules":
        return <Rules />;
      case "prizes":
        return <Prizes />;
      case "bracket":
        return <Bracket />;
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
          backgroundImageUrl="/images/view-tournament.svg"
        >
          <HeadSubSection/>
        </Heading>
        <ViewCard>
          <Grid container md={12}>
            <Grid item md={6}>
              <RainbowIcon />
            </Grid>
            <Grid item md={6} display="flex" alignItems="center" justifyContent={"flex-end"}>
              <Box marginRight="42px">
                <Typography>
                  <span style={{ color: "#FF0000" }}> Round 2 begins in :</span>{" "}
                  00.15.54
                </Typography>
              </Box>
              <Box marginRight="16px">
                <Typography>
                  {" "}
                  Entry Fee :
                  <span style={{ color: "rgba(105,50,249,1)" }}>
                    $ 450 USD{" "}
                  </span>
                </Typography>
              </Box>
              <ActionButton items={actionItem} id={"action-item"}/>
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
