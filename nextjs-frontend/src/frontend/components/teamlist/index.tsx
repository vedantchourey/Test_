import {
    Box
} from "@mui/material";
import React from "react";
import commonStyles from '../../styles/common.module.css';
import NoobPage from "../page/noob-page";
import TeamListCard from "../ui-components/teamlist";
import Heading from "../ui-components/typography/heading";
import TeamListData from "./list";
  
  
  const TeamList: React.FC = () => {
  
    return (
      <NoobPage
        title="Team List"
        metaData={{
          description: "Noob Storm Team List page",
        }}
      >
        <TeamListCard>
          <div className={commonStyles.container}>
            <Heading divider heading={"Team List"} />
          </div>
          <Box marginY={2}>
            <TeamListData /></Box>
        </TeamListCard>
      </NoobPage>
    );
  };
  
  export default TeamList;
  