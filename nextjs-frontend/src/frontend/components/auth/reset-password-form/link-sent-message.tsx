import MessageContainer from '../../ui-components/message/messageContainer';
import { Button, Divider, Grid, Icon, Typography } from '@mui/material';
import { Fragment } from 'react';
import commonStyles from '../../../styles/common.module.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
    handleNext?: () => void
}

const ResetPasswordLinkSent = ({ handleNext }: Props) => {
    return (
        <MessageContainer>
            <Fragment>
                <Grid textAlign={"center"} container spacing={2}>
                    <Grid item xs={12} className={commonStyles.flexGroup} style={{ gap: "10px", justifyContent: "center" }}>
                        <Icon className={commonStyles.whiteText}>
                            <ErrorOutlineIcon />
                        </Icon>
                        <Typography variant="h3" color="default">
                            Check your email address for your new password.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider>
                            <Typography variant="h3" color="default">
                                OR
                            </Typography>
                        </Divider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={commonStyles.actionButton} variant={"contained"} onClick={handleNext}>
                            Set Password Manually
                        </Button>
                    </Grid>
                </Grid>
            </Fragment >
        </MessageContainer >
    )
}

export default ResetPasswordLinkSent