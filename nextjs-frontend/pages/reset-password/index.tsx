import * as React from 'react'
import type { NextPage } from 'next'
import NoobPage from '../../src/frontend/components/page/noob-page'
import styles from './reset-password.module.css'
import { Container } from '@mui/material'
import MainBannerHeading from '../../src/frontend/components/ui-components/typography/mainBannerHeading'
import ResetPasswordForm from '../../src/frontend/components/auth/reset-password-form'
import Heading from '../../src/frontend/components/ui-components/typography/heading'

const NoobResetPasswordPage: NextPage = () => {
    return (
        <NoobPage
            title='Reset Password'
            metaData={{
                description: "Noob Storm reset password page"
            }}
        >
            <React.Fragment>
                <Heading
                    backgroundImage
                    backgroundImageUrl="/images/partner-with-us.png"
                />

                <MainBannerHeading heading={'RESET PASSWORD'} />

                <Container maxWidth="md" className={styles.registrationFormContainer} sx={{ my: 5 }}>
                    <ResetPasswordForm />
                </Container>

            </React.Fragment>
        </NoobPage>
    )
}

export default NoobResetPasswordPage