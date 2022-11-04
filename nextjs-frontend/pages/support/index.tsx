import * as React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import NoobPage from "../../src/frontend/components/page/noob-page";
import {
  Divider,
  Typography,
  Icon,
  Card,
  CardContent,
} from "@mui/material";
// import Heading from '../../src/frontend/components/ui-components/typography/heading'
//import NewsletterPoster from '../../src/frontend/components/newsletter-poster'
import HistoryIcon from "@mui/icons-material/History";
import styles from "./support.module.css";
// import LiveChatIcon from '../../src/frontend/components/icons/live-chat-icon'
// import TicketIcon from '../../src/frontend/components/icons/ticket-icon'
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../src/frontend/redux-store/layout/device-types";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";

const NoobSupportPage: NextPage = () => {
  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  const supportCards = [
    {
      to: "/support/ticket/create",
      icon: (
        <Icon className={styles.iconContainer} color="action">
          <HistoryIcon />
        </Icon>
      ),
      head: "Create Ticket",
      sub: `Need Assistance, Create a Ticket and we shall get back to you shortly`,
    },
    {
      to: "/support/ticket/history",
      icon: (
        <Icon className={styles.iconContainer} color="action">
          <HistoryIcon />
        </Icon>
      ),
      head: "Ticket History",
      sub: `View your Ticket History`,
    },
    {
      to: "/chat?user=support&name=Support",
      icon: (
        <Icon className={styles.iconContainer} color="action">
          <HistoryIcon />
        </Icon>
      ),
      head: "Live Chat",
      sub: `Start a Chat with the Support Team`,
    },
  ];

  return (
    <NoobPage
      title="Support"
      metaData={{
        description: "Noob Storm support page",
      }}
    >
      <React.Fragment>
        <div style={!isDesktop ? { marginTop: 30 } : {}}>
          <img src="/images/support-banner.jpg" width={"100%"} />
        </div>
        {/* <Heading
          // heading='For questions about your account,purchases, or general inquires.'
          backgroundImage
          backgroundImageUrl="/images/support-banner.jpg"
        /> */}

        {!isDesktop && (
          <div>
            <Divider style={{ padding: 25 }}>
              <Typography variant="h3">SUPPORT</Typography>
            </Divider>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {supportCards.map((item, key) => {
                return (
                  <div key={key} className={styles.gridContainer} style={{ marginTop: 20 }}>
                    <Link href={item.to}>
                      <a>
                        <Card className={styles.card} style={{ width: 300 }}>
                          <CardContent className={styles.cardContent}>
                            {item.icon}
                            <Typography variant="h3">{item.head}</Typography>
                            <Typography variant="body1" style={{ textAlign: "center" }}>
                              {item.sub}
                            </Typography>
                          </CardContent>
                        </Card>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}


        {isDesktop && (
          <div>
            <Divider style={{ padding: 35 }}>
              <Typography variant="h3">SUPPORT</Typography>
            </Divider>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {supportCards.map((item, key) => {
                return (
                  <div key={key} className={styles.gridContainer} style={{ marginLeft: 20 }}>
                    <Link href={item.to}>
                      <a>
                        <Card className={styles.card}>
                          <CardContent className={styles.cardContent}>
                            {item.icon}
                            <Typography variant="h3">{item.head}</Typography>
                            <Typography variant="body1" style={{ textAlign: "center" }}>
                              {item.sub}
                            </Typography>
                          </CardContent>
                        </Card>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </React.Fragment>
    </NoobPage>
  );
};

export default NoobSupportPage;
