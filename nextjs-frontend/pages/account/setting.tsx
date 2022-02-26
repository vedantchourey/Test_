import React from "react";
import ProfileSettings from "../../src/frontend/components/account/settings/settings";
import NoobPage from "../../src/frontend/components/page/noob-page";
import { withProtected } from "../../src/frontend/components/auth-wrapper/auth-wrapper";

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
export default withProtected(Settings);