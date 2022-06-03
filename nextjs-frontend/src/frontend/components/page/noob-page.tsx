import { Box, Button } from "@mui/material";
import Head from "next/head";
import NoobHeader from "../header/noob-header";
import React from "react";
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

  return (
    <div style={{marginTop: 100}}>
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
            style={{ minHeight: '1240px' }}
            component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            {children}
          </Box>
      </Box>
      <NoobFooter/>
    </div>
  );
}