import {
  Box,
  useTheme
} from "@mui/material";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import commonStyles from '../../styles/common.module.css';
import NoobPage from "../page/noob-page";
import LeaderBoardCard from "../ui-components/leaguetable";
import Heading from "../ui-components/typography/heading";
import LeagueTableData from "./league_table";


const LeaderBoard: React.FC = () => {
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const theme = useTheme();

  return (
    <NoobPage
      title="League Table"
      metaData={{
        description: "Noob Storm League Table page",
      }}
    >
      <LeaderBoardCard>
        <div className={commonStyles.container}>
          <Heading divider heading={"League Table"} />
        </div>
        <Box marginY={2}>
          <LeagueTableData /></Box>
      </LeaderBoardCard>
    </NoobPage>
  );
};

export default LeaderBoard;
