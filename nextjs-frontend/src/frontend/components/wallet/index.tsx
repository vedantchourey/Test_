import {  Grid } from "@mui/material";
import React from "react";
import NoobPage from "../page/noob-page";
import WalletCard from "../ui-components/wallet-card";
import AddCredit from "./add-credit";
import Balance from "./balance";
import Success from "./success";
import Transactions from "./transactions";
import {useRouter} from "next/router";
import { ParsedUrlQuery } from "querystring";
import WalletInfo from './info';
import Noob404Page from "../../../../pages/404";

const Wallet = () => {
  const router = useRouter();
  const query:ParsedUrlQuery = router.query;

  const renderComponent = ():JSX.Element =>{
    let page;
    if(query.slug){
      if(Array.isArray(query.slug)){
        page = (query.slug || []).join("/");
      }else{
        page = query.slug;
      }
    }
    switch(page){
      case "info":
        return (<WalletInfo />)
      case "credit/add":
        return (<AddCredit/>)
      case "credit/success":
        return (<Success/>)
      default:
        return <Noob404Page/>;
    }
  }

  return (
    <NoobPage
      title="Wallet"
      metaData={{
        description: "Noob Storm wallet page",
      }}
    >
      {renderComponent()}
      {/* <React.Fragment>
        <WalletCard>
          <Grid container>
            <Grid item md={12}>
              <AddCredit />
            </Grid>
            <Grid item md={12}>
              <Success />
            </Grid>
          </Grid>
        </WalletCard>
      </React.Fragment> */}
    </NoobPage>
  );
};

export default Wallet;
