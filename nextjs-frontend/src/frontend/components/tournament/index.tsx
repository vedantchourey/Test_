import { Grid } from "@mui/material";
import React from "react";
import Brackets from "../brackets";
import Setup from "../setup";
import { BasicData } from "../setup/basic";
import { InfoData } from "../setup/info";
import SideBar from "../ui-components/sidebar";
import axios from "axios";
import { EliminateBracketData } from "../brackets/create/eliminate-bracket";
import { SettingData } from "../setup/settings";
import Publish from "../publish";

export interface TournamentData {
  id?: string;
  basic?: BasicData;
  info?: InfoData;
  settings?: SettingData;
  bracketsMetadata?: EliminateBracketData;
}

interface TournamentContextType {
  data: TournamentData;
  setData: (data: TournamentData) => void;
}

export const TournamentContext = React.createContext<TournamentContextType>({
  data: {},
  setData: (data) => {},
});

const Tournament: React.FC = ({ children }) => {
  const [data, setData] = React.useState<TournamentData>({});
  const [pageNo, setPageNo] = React.useState<number>(0);
  const [id, setId] = React.useState<string>("");
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
    if (id != "") submitData.id = id;

    axios
      .post("/api/tournaments/create", submitData)
      .then((res) => {
        if (!res?.data?.errors?.length) {
          setPageNo(1);
          setData({});
          setId(res.data.id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item md={3}>
        <SideBar nav={sideBarNav} />
      </Grid>
      <Grid item md={9}>
        <TournamentContext.Provider value={{ data: data, setData: setData }}>
          {/* {children} */}
          {pageNo == 0 && <Setup onSubmit={submitHandler} />}
          {pageNo === 1 && <Brackets onSubmit={submitHandler} />}
          {pageNo === 2 && <Publish />}
        </TournamentContext.Provider>
      </Grid>
    </Grid>
  );
};

export default Tournament;
