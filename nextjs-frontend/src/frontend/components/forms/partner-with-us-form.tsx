import { Button, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { getErrorForProp, propsHasError } from "../../../common/utils/validation/validator";
import commonStyles from "../../styles/common.module.css"
import styles from "./partner-with-us.module.css"

// interface Props {
//   onRegistrationSuccess: () => void
// }

export default function PartnerWithUsForm(): JSX.Element {

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function onClickCreateTeam(): void {
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={6}>
          <TextField
            id="firstName"
            label="First Name"
            variant="filled"
            value={request.firstName}
            error={propsHasError(errors, 'firstName')}
            helperText={getErrorForProp(errors, 'firstName')}
            onChange={(event): void => setRequest({ ...request, firstName: event.target.value })}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="lastName"
            label="Last Name"
            variant="filled"
            value={request.lastName}
            error={propsHasError(errors, 'lastName')}
            helperText={getErrorForProp(errors, 'lastName')}
            onChange={(event): void => setRequest({ ...request, lastName: event.target.value })}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            value={request.email}
            error={propsHasError(errors, 'email')}
            helperText={getErrorForProp(errors, 'email')}
            onChange={(event): void => setRequest({ ...request, email: event.target.value })}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>

          <TextField
            id="mobile"
            label="Mobile"
            variant="filled"
            value={request.phone}
            error={propsHasError(errors, 'phone')}
            helperText={getErrorForProp(errors, 'phone')}
            onChange={(event): void => setRequest({ ...request, phone: event.target.value })}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            multiline
            rows={10}
            id="message"
            label="Your Message"
            variant="filled"
            value={request.message}
            error={propsHasError(errors, 'message')}
            helperText={getErrorForProp(errors, 'message')}
            onChange={(event): void => setRequest({ ...request, message: event.target.value })}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} textAlign={"center"}>
          <Button className={commonStyles.actionButton} onClick={onClickCreateTeam}><Typography>Create Team</Typography></Button>
        </Grid>

      </Grid>
    </div>
  )
}
