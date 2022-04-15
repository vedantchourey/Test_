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
        style={{ marginTop: appHeaderHeight, marginBottom: 20 }}
      >
        <Typography variant="h1">{heading}</Typography>
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
        {heading && <div className={styles.heading}>{simpleHeading()}</div>}
        {children && <Box className={styles.childContainer}>{children}</Box>}
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
