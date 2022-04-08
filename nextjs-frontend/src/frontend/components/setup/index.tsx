import React from "react";
import NavTabs from "../ui-components/navtabs";
import Basic, { BasicData } from "./basic";
import Info, { InfoData } from "./info";
import Settings, { SettingData } from "./settings";
import { TournamentContext } from "../tournament";

interface SetupProps {
  onSubmit: (data: any) => void;
}

const Setup: React.FC<SetupProps> = ({ onSubmit }): JSX.Element => {
  const { data, setData } = React.useContext(TournamentContext);

  const tabs = ["Basic", "Info", "Settings"];
  const [current, setCurrent] = React.useState(0);

  const handleBasicSave = (basic: BasicData): void => {
    setData({ ...data, basic });
    setCurrent(1);
  };

  const handleInfoSave = (info: InfoData): void => {
    setData({ ...data, info });
    setCurrent(2);
  };

  const handleSettingSave = (settings: SettingData): void => {
    setData({ ...data, settings });
    onSubmit({
      status: "PUBLISHED",
      joinStatus: "PUBLIC",
      createTemplateCode: data?.basic?.tournamentCloneId,
      basic: {
        ...data.basic,
        banner: "test",
      },
      info: data.info,
      settings,
    });
  };

  const goBack = (): void => {
    setCurrent(current - 1);
  };

  const renderComponent = (newCurrent: number): JSX.Element | null => {
    switch (newCurrent) {
      case 0:
        return <Basic onSave={handleBasicSave} data={data.basic} />;
      case 1:
        return (
          <Info onSave={handleInfoSave} data={data.info} onBack={goBack} />
        );
      case 2:
        return <Settings onSave={handleSettingSave} onBack={goBack} />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <NavTabs items={tabs} current={current} onClick={setCurrent}></NavTabs>
      {renderComponent(current)}
    </React.Fragment>
  );
};

export default Setup;
