import { Grid } from "@mui/material";
import React from "react";
import Brackets from "./brackets";
import Setup from "./setup";
import { BasicData } from "../../src/frontend/components/setup/basic";
import { InfoData } from "../../src/frontend/components/setup/info";
import SideBar from "../../src/frontend/components/ui-components/sidebar";
import axios from "axios";
import { EliminateBracketData } from "../../src/frontend/components/brackets/create/eliminate-bracket";
import { SettingData } from "../../src/frontend/components/setup/settings";
import NoobPage from "../../src/frontend/components/page/noob-page";
// import Publish from "../publish";

export interface TournamentData {
  basic?: BasicData;
  info?: InfoData;
  setting?: SettingData;
  bracket?: EliminateBracketData;
}

interface TournamentContextType {
  data: TournamentData;
  setData: (data: TournamentData) => void;
}

export const TournamentContext = React.createContext<TournamentContextType>({
  data: {},
  setData: (data) => {},
});

const Tournament:React.FC = ({children}) => {
  const [data, setData] = React.useState<TournamentData>({});

  const sideBarNav = [
    {
      icon: <img src="/icons/Vector.svg" alt="icon" />,
      title: "Create",
      items: [
        {
          title: "Setup",
          url: "",
        },
        {
          title: "Brackets",
          url: "",
        },
        {
          title: "Streams",
          url: "",
        },
        {
          title: "Publish",
          url: "",
        },
      ],
    },
    {
      icon: <img src="/icons/share-alt.svg" alt="icon" />,
      title: "Share",
      items: [
        {
          title: "Facebook",
          url: "",
        },
        {
          title: "Whatsapp",
          url: "",
        },
        {
          title: "Twitter",
          url: "",
        },
      ],
    },
  ];

  const submitHandler = (submitData: TournamentData): void => {
    axios
      .post("", submitData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <NoobPage
      title="tournament"
      metaData={{
        description: "Noob Storm tournament page",
      }}
    >
      <Grid container spacing={1}>
        <Grid item md={3}>
          <SideBar nav={sideBarNav} />
        </Grid>
        <Grid item md={9}>
          <TournamentContext.Provider value={{ data: data, setData: setData }}>
            {/* <Setup />
          <Brackets onSubmit={submitHandler} />
          <Publish /> */}
          {children}
          </TournamentContext.Provider>
        </Grid>
      </Grid>
    </NoobPage>
  );
};

export default Tournament;
