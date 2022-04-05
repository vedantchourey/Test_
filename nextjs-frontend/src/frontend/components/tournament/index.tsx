import { Grid } from "@mui/material";
import React from "react";
import Brackets from "../brackets";
import Setup from "../setup";
import { BasicData } from "../setup/basic";
import {InfoData} from '../setup/info';
import SideBar from "../ui-components/sidebar";
import axios from 'axios';
import { EliminateBracketData } from "../brackets/create/eliminate-bracket";
import { SettingData } from "../setup/settings";

export interface TournamentData{
  basic?:BasicData,
  info?:InfoData,
  setting?: SettingData,
  bracket?:EliminateBracketData
}

interface TournamentContextType {
  data:TournamentData
  setData:(data:TournamentData)=>void
}

export const TournamentContext = React.createContext<TournamentContextType>({data:{},setData:(data)=>{}});

const Tournament = () => {

  const [data,setData] = React.useState<TournamentData>({});

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

  const submitHandler = (submitData:TournamentData):void =>{
    axios.post("",submitData).then((res)=>{
      console.log(res);
    })
.catch((err)=>{
  console.error(err);
})
  }

  return (
    <Grid container spacing={1}>
      <Grid item md={3}>
        <SideBar nav={sideBarNav} />
      </Grid>
      <Grid item md={9}>
        <TournamentContext.Provider value={{data:data,setData:setData}}>
          <Setup/>
          <Brackets onSubmit={submitHandler}/>
        </TournamentContext.Provider>
        
      </Grid>
    </Grid>
  );
};

export default Tournament;
