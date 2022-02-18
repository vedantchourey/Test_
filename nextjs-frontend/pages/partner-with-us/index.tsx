import { Container, Divider, Typography } from "@mui/material";
import Heading from "../../src/frontend/components/ui-components/typography/heading";
import PartnerWithUsForm from "../../src/frontend/components/forms/partner-with-us-form";
import { Fragment } from "react";
import NoobPage from "../../src/frontend/components/page/noob-page";

export default function PartnerWithUs(): JSX.Element {
  return (
    <NoobPage
      title="Partner With Us"
      metaData={{
        description: "Partner with us noob storm"
      }}
    >
      <Fragment>

        <Heading
          backgroundImage
          backgroundImageUrl="/images/partner-with-us.png"
          heading="Partner with us and let's do great things together."
        />


        <Container maxWidth="md">

          <Divider sx={{ my: 5 }}>
            <Typography variant="h3" color="default">
              PARTNER WITH US
            </Typography>
          </Divider >

          <PartnerWithUsForm />
        </Container >



      </Fragment >
    </NoobPage >
  )
}
