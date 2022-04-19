import { useRouter } from "next/router";
import React from "react";
import { TournamentContext } from "../tournament";
import PublishTournament, { PublishTournamentData } from "./publish-tournament";

const Publish:React.FC = (): JSX.Element => {
  const router = useRouter();
  const { data, setData, id, type } = React.useContext(TournamentContext);

  const handleSave = (newData:PublishTournamentData):void=>{
    setData({...data,publishData:newData},()=>{
      if(type==='new'){
        router.push(`/tournament/new/[...slug]`,`/tournament/new/create/setup/basic`, {shallow:true})
      }else{
        router.push(`/tournament/update/[id]/[...slug]`,`/tournament/update/${id}/create/setup/basic`, {shallow:true})
      }
    },type==="new");
  }

  const goBack = ():void =>{
    if(type==='new'){
      router.push(`/tournament/new/[...slug]`,`/tournament/new/create/streams`, {shallow:true})
    }else{
      router.push(`/tournament/update/[id]/[...slug]`,`/tournament/update/${id}/create/streams`, {shallow:true})
    }
  }

  return <PublishTournament data={data.publishData} onSave={handleSave} onBack={goBack}/>;
};

export default Publish;
