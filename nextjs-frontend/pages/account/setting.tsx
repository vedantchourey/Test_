import React from "react";
import ProfileSettings from "../../src/frontend/components/account/settings/settings";
import NoobPage from "../../src/frontend/components/page/noob-page";

const Settings = (): JSX.Element => {
  return (
    <NoobPage
      title="Profile Settings"
      metaData={{
        description: "Noob Storm account page",
      }}
    >
      <ProfileSettings />
    </NoobPage>
  );
};
export default Settings;