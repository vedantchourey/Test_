import * as React from "react";
import type { NextPage } from "next";
import NoobPage from "../../src/frontend/components/page/noob-page";
import {
  Divider,
  Typography,
} from "@mui/material";
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../src/frontend/redux-store/layout/device-types";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";

const NoobAboutUsPage: NextPage = () => {
  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  return (
    <NoobPage
      title="AboutUs"
      metaData={{
        description: "Noob Storm about us page",
      }}
    >
      <React.Fragment>
        {!isDesktop && (
          <div>
            <Divider style={{ padding: 25 }}>
              <Typography variant="h3">ABOUT US</Typography>
            </Divider>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography variant="body2">Noobstorm is a community for gamers, by gamers. From cross-platform tournaments to active recruiting – we’re creating an opportunity for you to go pro. </Typography>
                <Typography variant="body2">Noobstorm was born out of devotion. Gaming gave us our best childhood memories – and we want to share that passion with you.</Typography>
                <Typography variant="body2">We designed Noobstorm to be the world’s #1 e-sports platform. More than just tournament hosting, we want to give you opportunities to grow, interact, and succeed. </Typography>
                <Typography variant="body2">And, of course, have some fun while you’re going pro.</Typography>
              </div>
            </div>
          </div>
        )}

        {isDesktop && (
          <div>
            <Divider style={{ padding: 35 }}>
              <Typography variant="h3">ABOUT US</Typography>
            </Divider>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography variant="body2">Noobstorm is a community for gamers, by gamers. From cross-platform tournaments to active recruiting – we’re creating an opportunity for you to go pro. </Typography>
                <Typography variant="body2">Noobstorm was born out of devotion. Gaming gave us our best childhood memories – and we want to share that passion with you.</Typography>
                <Typography variant="body2">We designed Noobstorm to be the world’s #1 e-sports platform. More than just tournament hosting, we want to give you opportunities to grow, interact, and succeed. </Typography>
                <Typography variant="body2">And, of course, have some fun while you’re going pro.</Typography>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    </NoobPage>
  );
};

export default NoobAboutUsPage;
