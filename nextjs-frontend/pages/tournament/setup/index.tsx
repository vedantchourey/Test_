import React from "react";
import NavTabs from "../../../src/frontend/components/ui-components/navtabs";
import Basic, { BasicData } from "../../../src/frontend/components/setup/basic";
import Info, { InfoData } from "../../../src/frontend/components/setup/info";
import Settings, {SettingData} from "../../../src/frontend/components/setup/settings";
import Tournament, {TournamentContext} from '../../../src/frontend/components/tournament';
import NoobPage from "../../../src/frontend/components/page/noob-page";

interface SetupProps {}

const Setup:React.FC<SetupProps> = ():JSX.Element => {

  const {data, setData} = React.useContext<any>(TournamentContext);

  const tabs = ["Basic","Info","Settings"];
  const [current, setCurrent] = React.useState(0);

  const handleBasicSave = (basic:BasicData):void =>{
    setData({...data,basic})
    setCurrent(1);
  }

  const handleInfoSave = (info: InfoData):void =>{
    setData({...data,info})
    setCurrent(2);
  }

  const handleSettingSave = (setting: SettingData):void =>{
    setData({...data, setting})
  }

  const goBack = ():void =>{
    setCurrent(current-1)
  }

  const renderComponent = (newCurrent:number):JSX.Element| null =>{
    switch(newCurrent){
    case 0:
      return <Basic onSave={handleBasicSave} data={data.basic} />
    case 1:
      return <Info onSave={handleInfoSave} data={data.info} onBack={goBack}/>
    case 2:
      return <Settings onSave={handleSettingSave} onBack={goBack} />
    default:
      return null;
    } 
  }

  return (
    <NoobPage
      title="setup"
      metaData={{
        description: "Noob Storm setup page",
      }}
    >
      <Tournament>
      <NavTabs items={tabs} current={current} onClick={setCurrent}></NavTabs>
      {renderComponent(current)}
      </Tournament>
      </NoobPage>
  );
};

export default Setup;
