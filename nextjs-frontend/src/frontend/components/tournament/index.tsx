import { Grid } from "@mui/material";
import React from "react";
import { BasicData } from "../setup/basic";
import { InfoData } from "../setup/info";
import SideBar from "../ui-components/sidebar";
import axios from "axios";
import { EliminateBracketData } from "../brackets/create/eliminate-bracket";
import { SettingData } from "../setup/settings";
import { useRouter } from "next/router";
import NoobPage from "../page/noob-page";
import Create from "./create";
import { ParsedUrlQuery } from "querystring";
import { PublishTournamentData } from "../publish/publish-tournament";
import { StreamData } from "./create/streams";

export interface TournamentData {
  id?: string;
  status?:string
  joinStatus?:string
  createTemplateCode?:string
  basic?: BasicData;
  info?: InfoData;
  settings?: SettingData;
  bracketsMetadata?: EliminateBracketData;
  publishData?:PublishTournamentData;
  streams?:{
    data:StreamData[];
  }
}

interface TournamentContextType {
  data: TournamentData;
  setData: (data: TournamentData,callback?:()=>void,doClear?:boolean) => void;
  onSubmit: (data: TournamentData) => void;
}

export const TournamentContext = React.createContext<TournamentContextType>({
  data: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setData: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit:() => {}
});

const Tournament: React.FC = () => {
  const [data, setData] = React.useState<TournamentData>({});
  const [id, setId] = React.useState<string>("");
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const sideBarNav = [
    {
      icon: <img src="/icons/Vector.svg" alt="icon" />,
      title: "Create",
      isActive:(url:string):boolean=>{
        return url.indexOf("/tournament/create")>-1;
      },
      items: [
        {
          title: "Setup",
          url:"/tournament/[...slug]",
          as: "/tournament/create/setup/basic",
          isActive:(url:string):boolean=>{
            return url.indexOf("/tournament/create/setup")>-1
          }
        },
        {
          title: "Brackets",
          url:"/tournament/[...slug]",
          as: "/tournament/create/brackets/create",
          isActive:(url:string):boolean=>{
            return url.indexOf("/tournament/create/brackets")>-1
          }
        },
        {
          title: "Streams",
          url:"/tournament/[...slug]",
          as: "/tournament/create/streams",
          isActive:(url:string):boolean=>{
            return url.indexOf("/tournament/create/streams")>-1
          }
        },
        {
          title: "Publish",
          url:"/tournament/[...slug]",
          as: "/tournament/create/publish",
          isActive:(url:string):boolean=>{
            return url.indexOf("/tournament/create/publish")>-1
          }
        },
      ],
    },
    {
      icon: <img src="/icons/share-alt.svg" alt="icon" />,
      title: "Share",
      isActive:():boolean=>{
        return false;
      },
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

  const updateData = (newData:TournamentData, callback?:()=>void,doClear?:boolean):void=>{
    
    setData(newData);
    submitHandler(newData).then((res)=>{
      if(!res){return false}
      if(doClear){
        setData({});
      }
      if(callback){
        callback();
        setId("");
      }
    })

  }

  const submitHandler = (submitData: TournamentData): Promise<boolean> => {
    if (id !== "") submitData.id = id;

    const req = {
      ...submitData,
      status: "PUBLISHED",
      joinStatus: "PUBLIC",
      ...(submitData.basic || {})   
    }
    delete req.basic;

    return axios
      .post("/api/tournaments/create", req)
      .then((res) => {
        if (!res?.data?.errors?.length) {
          setId(res.data.id);
          return true;
        }
          return false
        
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  };

  const renderSection = ():JSX.Element|null => {
    if(!query.slug || query.slug.length<=0) return null;

    switch(query.slug[0]){
    case 'create':
      return <Create/>
    default :
      return null;
    }
  };

  return (
    <NoobPage
      title="Tournament"
      metaData={{
        description: "Noob Storm tournament page",
      }}
    >
      <Grid container spacing={1}>
        <Grid item md={3}>
          <SideBar key={"sidebar"} nav={sideBarNav}/>
        </Grid>
        <Grid item md={9}>
          <TournamentContext.Provider value={{ data: data, setData: updateData,onSubmit:submitHandler }}>
            {renderSection()}
          </TournamentContext.Provider>
        </Grid>
      </Grid>
    </NoobPage>
  );
};

export default Tournament;
