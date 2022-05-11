import { useTheme, Box } from "@mui/material";
import { useAppSelector } from "../../redux-store/redux-store";
import { isDeviceTypeSelector } from "../../redux-store/layout/layout-selectors";
import Head from "next/head";
import NoobHeader from "../header/noob-header";
import commonStyles from "../../styles/common.module.css";
import styles from "./noob-page.module.css";
import React from "react";
import { deviceTypes } from "../../redux-store/layout/device-types";
import NoobFooter from "../footer";

interface Props {
  title: string;
  metaData: { [key: string]: string };
  favIcon?: string;
  children: React.ReactElement;
}

export default function NoobPage(props: Props): JSX.Element {
  const { metaData, favIcon = "/noob-fav.ico", title, children } = props;
  const metaKeys = Object.keys(metaData);

  const theme = useTheme();
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  const backgroundColor = isDesktop
    ? theme.palette.background.default
    : theme.palette.background.paper;

  return (
    <div>
      <Head>
        <title>{title}</title>
        {metaKeys.map((key, index) => (
          <meta key={index} name={key} content={metaData[key]} />
        ))}
        <link rel="icon" href={favIcon} />
      </Head>
      <Box sx={{ display: 'flex' }}>
        <NoobHeader/>
          <Box
            component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            {children}
          </Box>
      </Box>
      <NoobFooter/>
    </div>
  );
}