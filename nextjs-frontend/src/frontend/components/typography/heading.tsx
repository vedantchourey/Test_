import { Divider, Typography } from "@mui/material"
import React from "react"
import { getAppHeaderHeightSelector } from "../../redux-store/layout/layout-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import styles from "./heading.module.css";

interface Props {
    heading: string,
    divider: boolean
}

export default function Heading({ heading, divider }: Props) {
    const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);

    return (
        <>
            <div className={styles.mainBanner} style={{ marginTop: appHeaderHeight, marginBottom: 20 }}>
                <Typography className={styles.mainBannerText}>{heading}</Typography>
            </div>
            {divider && <Divider style={{ marginBottom: 20 }} />}
        </>
    )
}