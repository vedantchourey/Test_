import { Fragment } from "react";
import { Container, Grid } from "@mui/material";
import Heading from "../../src/frontend/components/ui-components/typography/heading";
import NoobPage from "../../src/frontend/components/page/noob-page";
import ShoppingCart from "./shopping-cart";

const Checkout = (): JSX.Element => {
  return (
    <NoobPage
      title="Checkout"
      metaData={{ description: "Noob Storm checkout page" }}
    >
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"Checkout"} />
          <Grid container spacing={2}>
            <ShoppingCart />
          </Grid>
        </Container>
      </Fragment>
    </NoobPage>
  );
};

export default Checkout;
