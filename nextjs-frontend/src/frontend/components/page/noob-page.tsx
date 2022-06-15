import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import NoobFooter from "../footer";
import NoobHeader from "../header/noob-header";
import SideHeader from "../header/sideheader";

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
    <>
      <SideHeader/>
      <div style={{marginTop: 50}}>
        <Head>
          <title>{title}</title>
          {metaKeys.map((key, index) => (
            <meta key={index} name={key} content={metaData[key]} />
          ))}
          <link rel="icon" href={favIcon} />
        </Head>  
        <Box sx={{ display: 'flex' }} maxWidth={"100vw"}>
          <NoobHeader/>
            <Box
              style={{ minHeight: '1040px' }}
              component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
              {children}
            </Box>
        </Box>
        <NoobFooter/>
      </div>
    </>
  );
}