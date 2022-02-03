import MessageContainer from '../../ui-components/message/messageContainer';
import { Grid, Icon, Typography } from '@mui/material';
import { Fragment } from 'react';
import commonStyles from '../../../styles/common.module.css'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PasswordResetSuccessfully = () => {
    return (
        <MessageContainer>
            <Fragment>
                <Grid item xs={12} className={commonStyles.flexGroup} style={{ gap: "10px", justifyContent: "center" }}>
                    <Icon className={commonStyles.whiteText}>
                        <ErrorOutlineIcon />
                    </Icon>
                    <Typography variant="h3" color="default">
                        Password updated successfully.
                    </Typography>
                </Grid>
            </Fragment>
        </MessageContainer>
    )
}

export default PasswordResetSuccessfully