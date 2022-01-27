import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import commonStyles from '../../../styles/common.module.css'
import { getErrorForProp, isThereAnyError, propsHasError, ValidationResult } from '../../../../common/utils/validation/validator';
import { useAppDispatch } from '../../../redux-store/redux-store';
import { NewPasswordRequest } from '../../../../backend/services/auth-service/reset-password/reset-password-contracts';
import { validateNewPasswordInputs } from './validator';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';

interface Props {
    onResetHandler: () => void
}

const SetNewPassword = ({ onResetHandler }: Props) => {

    const appDispatch = useAppDispatch();
    const [errors, setErrors] = useState<ValidationResult<NewPasswordRequest>>({});
    const [request, setRequest] = useState<Partial<NewPasswordRequest>>({
        email: '',
        code: '',
        new_password: ''
    });

    async function onClickResetPassword() {
        const validationResults = await validateNewPasswordInputs(request);
        setErrors(validationResults);
        console.log(validationResults)
        if (isThereAnyError(validationResults)) return;
        try {
            appDispatch(setIsLoading(true));
            // const response = await signUp(request as SignupRequest);
            const response = {
                isError: false,
                errors: {
                    email: ""
                }
            }
            if (!response.isError) {
                onResetHandler();
            } else {
                setErrors(response.errors);
            }
        } finally {
            appDispatch(setIsLoading(false));
        }
    }

    return (
        <Grid container spacing={3}>

            <Grid item xs={12}>
                <Typography align='left' variant={"h3"}>
                    Enter your new password below.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography align='left' mb={1} variant={"h3"}>
                    E-mail
                </Typography>
                <TextField
                    id="email"
                    size='small'
                    variant="filled"
                    value={request.email}
                    error={propsHasError(errors, 'email')}
                    helperText={getErrorForProp(errors, 'email')}
                    onChange={event => setRequest({ ...request, email: event.target.value })}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        style: {
                            padding: "12px !important"
                        }
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography align='left' mb={1} variant={"h3"}>
                    Code (sent to your e-mail)
                </Typography>
                <TextField
                    id="code"
                    variant="filled"
                    size='small'
                    value={request.code}
                    error={propsHasError(errors, 'code')}
                    helperText={getErrorForProp(errors, 'code')}
                    onChange={event => setRequest({ ...request, code: event.target.value })}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        style: {
                            padding: "12px !important"
                        }
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography align='left' mb={1} variant={"h3"}>
                    New password
                </Typography>
                <TextField
                    id="new_password"
                    type="password"
                    size='small'
                    variant="filled"
                    value={request.new_password}
                    error={propsHasError(errors, 'new_password')}
                    helperText={getErrorForProp(errors, 'new_password')}
                    onChange={event => setRequest({ ...request, new_password: event.target.value })}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    inputProps={{
                        style: {
                            padding: "12px !important"
                        }
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Button className={commonStyles.actionButton} variant="contained" onClick={onClickResetPassword}>
                    <Typography variant={"h3"}>
                        Reset Password
                    </Typography>
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Typography align='left' variant={"h3"}>
                    *The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^.
                </Typography>
            </Grid>

        </Grid>
    )
}

export default SetNewPassword