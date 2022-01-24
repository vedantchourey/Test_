import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { getErrorForProp, propsHasError } from "../../../common/utils/validation/validator";
import commonStyles from "../../styles/common.module.css"
import styles from "./partner-with-us.module.css"

interface Props {
    onRegistrationSuccess: () => void
}

export default function PartnerWithUsForm(props: Props) {

    const [errors] = useState({});
    const [request, setRequest] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        message: '',
    });

    /**
     * @todo form validation && post api integration
     */
    function onClickCreateTeam() {
        console.log("form submitted: ", request)
    }

    return (
        <div className={styles.container}>

            <div className={styles.inputRow}>
                <TextField id="firstName"
                    label="First Name"
                    variant="filled"
                    className={styles.inputRowItem}
                    value={request.firstName}
                    error={propsHasError(errors, 'firstName')}
                    helperText={getErrorForProp(errors, 'firstName')}
                    onChange={event => setRequest({ ...request, firstName: event.target.value })}
                    fullWidth
                />
                <TextField id="lastName"
                    label="Last Name"
                    variant="filled"
                    className={styles.inputRowItem}
                    value={request.lastName}
                    error={propsHasError(errors, 'lastName')}
                    helperText={getErrorForProp(errors, 'lastName')}
                    onChange={event => setRequest({ ...request, lastName: event.target.value })}
                    fullWidth
                />
            </div>

            <div className={styles.inputRow}>
                <TextField id="email"
                    label="Email"
                    variant="filled"
                    className={styles.inputRowItem}
                    value={request.email}
                    error={propsHasError(errors, 'email')}
                    helperText={getErrorForProp(errors, 'email')}
                    onChange={event => setRequest({ ...request, email: event.target.value })}
                    fullWidth
                />
                <TextField id="mobile"
                    label="Mobile"
                    variant="filled"
                    className={styles.inputRowItem}
                    value={request.phone}
                    error={propsHasError(errors, 'phone')}
                    helperText={getErrorForProp(errors, 'phone')}
                    onChange={event => setRequest({ ...request, phone: event.target.value })}
                    fullWidth
                />
            </div>

            <div className={styles.inputRow}>
                <TextField
                    multiline
                    rows={10}
                    id="message"
                    label="Your Message"
                    variant="filled"
                    className={styles.inputRowItem}
                    value={request.message}
                    error={propsHasError(errors, 'message')}
                    helperText={getErrorForProp(errors, 'message')}
                    onChange={event => setRequest({ ...request, message: event.target.value })}
                    fullWidth
                />
            </div>

            <div className={styles.inputRow}>
                <Button className={commonStyles.actionButton} onClick={onClickCreateTeam}><Typography>Create Team</Typography></Button>
            </div>
        </div>
    )
}