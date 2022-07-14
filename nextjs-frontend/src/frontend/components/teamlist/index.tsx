import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import commonStyles from "../../styles/common.module.css";
import NoobPage from "../page/noob-page";
import TeamListCard from "../ui-components/teamlist";
import Heading from "../ui-components/typography/heading";
import TeamListData from "./list";

const TeamList: React.FC = () => {
  const route = useRouter();
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
        <Box display={"flex"} justifyContent="center">
        <Button
          onClick={(): void => {
            route.push("/team/create");
          }}
          variant={"contained"}
        >
          Create Team
        </Button>
        </Box>
        
        <Box marginY={2}>
          <TeamListData />
        </Box>
      </TeamListCard>
    </NoobPage>
  );
};

export default TeamList;
