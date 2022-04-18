import { useRouter } from "next/router";
import React from "react";
import { TournamentContext } from "../tournament";
import PublishTournament, { PublishTournamentData } from "./publish-tournament";

const Publish:React.FC = (): JSX.Element => {
  const router = useRouter();
  const { data, setData } = React.useContext(TournamentContext);

  const handleSave = (newData:PublishTournamentData):void=>{
    setData({...data,publishData:newData},()=>{
      router.push(`/tournament/[...slug]`,`/tournament/create/setup/basic`, {shallow:true})
    },true);
  }

  const goBack = ():void =>{
    router.push(`/tournament/[...slug]`,`/tournament/create/streams`, {shallow:true})
  }

  return <PublishTournament data={data.publishData} onSave={handleSave} onBack={goBack}/>;
};

export default Publish;
