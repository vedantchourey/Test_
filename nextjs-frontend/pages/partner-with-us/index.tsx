import { Container, Divider, Typography } from "@mui/material";
import Heading from "../../src/frontend/components/ui-components/typography/heading";
import PartnerWithUsForm from "../../src/frontend/components/forms/partner-with-us-form";
import styles from "./partner-with-us.module.css";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NoobPage from "../../src/frontend/components/page/noob-page";

export default function PartnerWithUs() {

    const router = useRouter()

    const onRegistrationSuccess = async () => {
        await router.push('/register-success');
    }

    return (
        <NoobPage
            title="Partner With Us"
            metaData={{
                description: "Partner with us noob storm"
            }}
        >
            <Fragment>
                <div className={styles.heroContainer}>

                    <div className={styles.heading}>
                        <Heading heading="Partner with us and let's do great things together." />
                    </div>
                </div>

                <Container maxWidth="lg">
                    <Divider sx={{ my: 5 }}>
                        <Typography variant="h3" color="default">
                            PARTNER WITH US
                        </Typography>
                    </Divider>
                </Container>

                <PartnerWithUsForm onRegistrationSuccess={onRegistrationSuccess} />

            </Fragment>
        </NoobPage>
    )
}