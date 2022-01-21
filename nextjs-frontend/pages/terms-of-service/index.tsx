import React from "react"
import { useEffect } from "react"
import Head from "next/head"
import NoobHeader from "../../src/frontend/components/header/noob-header"
import { Container, Typography, useTheme } from "@mui/material";
import homeModule from '../../src/frontend/styles/common.module.css';
import commonStyles from '../../src/frontend/styles/common.module.css';
import Heading from "../../src/frontend/components/typography/heading"

const TEXT = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`

export default function TermsOfServicePage() {
    const theme = useTheme();
    return (
        <div style={{ backgroundColor: theme.palette.background.default }}>
            <Head>
                <title>Terms of service</title>
                <meta name="description" content="Noob storm home page" />
                <link rel="icon" href="/noob-fav.ico" />
            </Head>
            <NoobHeader />
            <main className={homeModule.main}>
                <div className={commonStyles.container}>

                    <Heading divider heading={"TERMS OF SERVICE"} />

                    <Typography className={commonStyles.whiteText} marginBottom={2}>
                        {TEXT}
                    </Typography>

                    {new Array(4).fill(TEXT).map((text, i) => (
                        <Typography className={commonStyles.whiteText} marginBottom={2}>
                            {i + 1}. {text}
                        </Typography>
                    ))}

                </div>

            </main>
        </div>
    )
}

