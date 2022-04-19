import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { TournamentContext } from "../tournament";
import NavTabs from "../ui-components/navtabs";
import Create from "./create";

const Brackets: React.FC = (): JSX.Element => {
  const tabs = ["Create"];
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;
  const { type,id } = React.useContext(TournamentContext); 

  const renderComponent = (): JSX.Element | null => {
    if(!query.slug || query.slug.length<3) return null;
        
    switch(query.slug[2]){
    case 'create':
      return <Create/>;
    default:
      return null;
    }
  };

  const onTabClick = (tab:string):void=>{
    if(type==='new'){
      router.push(`/tournament/new/[...slug]`,`/tournament/new/create/brackets/${tab.toLowerCase()}`, {shallow:true})
    }else{
      router.push(`/tournament/update/[id]/[...slug]`,`/tournament/update/${id}/create/brackets/${tab.toLowerCase()}`, {shallow:true})
    }
  }
  

  const action = <Button variant="contained">Preview</Button>;

  return (
    <React.Fragment>
      <NavTabs
        items={tabs}
        action={action}
        current={query?.slug?.[2]}
        onClick={onTabClick}
      ></NavTabs>
      {renderComponent()}
    </React.Fragment>
  );
};

export default Brackets;
