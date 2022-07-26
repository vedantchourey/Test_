import { Divider, Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { getAppHeaderHeightSelector } from "../../../redux-store/layout/layout-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";
import styles from "./heading.module.css";

interface Props {
  heading?: string;
  divider?: boolean;
  backgroundImage?: boolean;
  backgroundImageUrl?: string;
  children?:JSX.Element;
}

export default function Heading({
  heading,
  divider,
  backgroundImage,
  backgroundImageUrl,
  children
}: Props): JSX.Element {
  const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);

  const simpleHeading = (): JSX.Element => (
    <Fragment>
      <div
        className={styles.mainBanner}
        style={{ marginTop: appHeaderHeight -60, marginBottom: 20, maxWidth: "70vw", overflow: "hidden"}}
      >
        <Typography variant="h1" sx={{display: 'flex', justifyContent: 'center'}}>{heading}</Typography>
      </div>
      {divider && <Divider style={{ marginBottom: 20 }} />}
    </Fragment>
  );


  if (backgroundImage) {
    return (
      <div
        className={styles.heroContainer}
        style={{ background: `url(${backgroundImageUrl})` }}
      >
        <div style={{background: "rgba(0,0,0,0.5)", padding: 70, flex: 1, height: "100%"}}>
          {heading && <div className={styles.heading}>{simpleHeading()}</div>}
          {children && <Box className={styles.childContainer}>{children}</Box>}  
        </div>
        
      </div>
    );
  }

  return (
    <div>
      {simpleHeading()}
      {children && <Box className={styles.childContainer}>{children}</Box>}
    </div>
  );
}

Heading.defaultProps = {
  heading: "",
  divider: false,
  backgroundImage: false,
  backgroundUrl: "",
  children:null
};
