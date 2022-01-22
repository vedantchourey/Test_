import { Container, Divider, Grid, Typography, useTheme } from "@mui/material";
import Head from 'next/head';
import NoobHeader from "../../src/frontend/components/header/noob-header";
import Heading from "../../src/frontend/components/ui-components/typography/heading";
import { deviceTypes } from "../../src/frontend/redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import commonStyles from "../../src/frontend/styles/common.module.css"
import PartnerWithUsForm from "../../src/frontend/components/forms/partner-with-us-form";
import styles from "./partner-with-us.module.css";
import NoobFooter from "../../src/frontend/components/footer";
import { useRouter } from "next/router";

export default function PartnerWithUs() {

    const router = useRouter()
    const theme = useTheme();
    const isDesktop = useAppSelector(x => isDeviceTypeSelector(x, deviceTypes.desktop));
    const backgroundColor = isDesktop ? theme.palette.background.default : theme.palette.background.paper;

    const onRegistrationSuccess = async () => {
        await router.push('/register-success');
    }

    return (
        <div style={{ backgroundColor }}>

            <Head>
                <title>Partner with us</title>
                <meta name="description" content="Partner with us noob storm" />
                <link rel="icon" href="/noob-fav.ico" />
            </Head>

            <div className={styles.heroContainer}>
                <NoobHeader />
                <div className={styles.heading}>
                    <Heading heading="Partner with us and let's do great things together." />
                </div>
            </div>

            <main className={commonStyles.main}>
                <Container maxWidth="lg" className={styles.partnerFormContainer}>
                    <Divider>
                        <Typography variant="h3" color="default">
                            PARTNER WITH US
                        </Typography>
                    </Divider>
                    <PartnerWithUsForm onRegistrationSuccess={onRegistrationSuccess} />
                </Container>
            </main>

            <NoobFooter />
        </div>
    )
}