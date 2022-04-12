import React from "react";
import NavTabs from "../ui-components/navtabs";
import Basic, { BasicData } from "./basic";
import Info, { InfoData } from "./info";
import Settings, { SettingData } from "./settings";
import { TournamentContext } from "../tournament";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";


const Setup: React.FC = (): JSX.Element => {
  const { data, setData } = React.useContext(TournamentContext);

  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const tabs = ["Basic", "Info", "Settings"];

  const handleBasicSave = (basic: BasicData): void => {
    setData({ ...data, basic });
    onTabClick("info")
  };

  const handleInfoSave = (info: InfoData): void => {
    setData({ ...data, info });
    onTabClick("settings")
  };

  const onTabClick = (tab:string):void=>{
    router.push(`/tournament/[...slug]`,`/tournament/create/setup/${tab.toLowerCase()}`, {shallow:true})
  }

  const handleSettingSave = (settings: SettingData): void => {
    setData({ ...data, settings });
    // onSubmit({
    //   status: "PUBLISHED",
    //   joinStatus: "PUBLIC",
    //   // createTemplateCode: data?.basic?.tournamentCloneId,
    //   basic: data.basic && {
    //     ...data.basic,
    //     banner: "test",
    //   },
    //   info: data.info,
    //   settings,
    // });
    router.push(`/tournament/[...slug]`,`/tournament/create/brackets/create`, {shallow:true})
  };

  const goBack = (): void => {
    if(!query.slug)return;

    const index = tabs.map((tab)=>tab.toLowerCase()).indexOf(query.slug[2]);
    if(index<1){
      return;
    }
    onTabClick(tabs[index-1].toLowerCase());
  };

  const renderComponent = (): JSX.Element | null => {
    if(!query.slug || query.slug.length<3) return null;
        
    switch(query.slug[2]){
    case 'basic':
      return <Basic onSave={handleBasicSave} data={data.basic} />;
    case 'info':
      return (
        <Info onSave={handleInfoSave} data={data.info} onBack={goBack} />
      );
    case 'settings':
      return <Settings onSave={handleSettingSave} onBack={goBack} />;
    default:
      return null;
    }
  };

  return (
    <React.Fragment>
      <NavTabs items={tabs} current={(query.slug || [])[2]} onClick={onTabClick}></NavTabs>
      {renderComponent()}
    </React.Fragment>
  );
};

export default Setup;
