import type { NextPage } from "next";
import NoobPage from "../../src/frontend/components/page/noob-page";
import UserDashboard from "../../src/frontend/components/user-dashboard";

const UserDashboardPage: NextPage = () => {
  return (
    <NoobPage
      title="Dashboard"
      metaData={{
        description: "Noob Storm home page",
      }}
    >
      <UserDashboard />
    </NoobPage>
  );
};

export default UserDashboardPage;
