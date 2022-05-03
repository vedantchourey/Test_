import React from "react";
import NoobPage from "../page/noob-page";
import AddCredit from "./add-credit";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import WalletInfo from "./info";
import Noob404Page from "../../../../pages/404";
import Success from "./success";
import Failed from "./failed";

const Wallet:React.FC = () => {
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;

  const renderComponent = (): JSX.Element => {
    let page;
    if (query.slug) {
      if (Array.isArray(query.slug)) {
        page = (query.slug || []).join("/");
      } else {
        page = query.slug;
      }
    }
    switch (page) {
      case "info":
        return <WalletInfo />;
      case "credit/add":
        return <AddCredit />;
      case "credit/success":
        return <Success />;
      case "credit/failed":
        return <Failed />;

      default:
        return <Noob404Page />;
    }
  };

  return (
    <NoobPage
      title="Wallet"
      metaData={{
        description: "Noob Storm wallet page",
      }}
    >
      {renderComponent()}
    </NoobPage>
  );
};

export default Wallet;
