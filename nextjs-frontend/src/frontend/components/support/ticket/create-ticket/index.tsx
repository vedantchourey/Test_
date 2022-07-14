import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import {
  getErrorForProp,
  propsHasError,
} from "../../../../../common/utils/validation/validator";
import commonStyles from "../../../../styles/common.module.css";
import { getAuthHeader } from "../../../../utils/headers";
import styles from "./create-ticket.module.css";
import { useRouter } from "next/router";

export default function CreateTicketForm(): JSX.Element {
  const router = useRouter();
  const [errors] = useState({});
  const [request, setRequest] = useState({
    subject: "",
    type: "default",
    message: "",
  });

  const TICKET_TYPES = [
    {
      value: "a",
      label: "A",
    },
    {
      value: "b",
      label: "B",
    },
    {
      value: "c",
      label: "C",
    },
  ];

  /**
   * @todo form validation && post api integration
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async function onClickCreateTicket(): Promise<void> {
    try {
      const endpoint = "/api/support/create";
      const headers = await getAuthHeader();
      axios
        .post(
          endpoint,
          request,
          {
            headers: headers,
          }
        ).then((): any => {
          router.push("/support/ticket/history")
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align="left" mb={1} variant={"h3"}>
            Subject
          </Typography>
          <TextField
            id="subject"
            required
            size="small"
            variant="filled"
            value={request.subject}
            error={propsHasError(errors, "subject")}
            helperText={getErrorForProp(errors, "subject")}
            onChange={(event): void =>
              setRequest({ ...request, subject: event.target.value })
            }
            fullWidth
            InputProps={{ disableUnderline: true }}
            inputProps={{
              style: {
                padding: 12,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography align="left" mb={1} variant={"h3"}>
            Ticket Type
          </Typography>
          <TextField
            id="type"
            size="small"
            required
            select
            variant="filled"
            value={request.type}
            error={propsHasError(errors, "type")}
            helperText={getErrorForProp(errors, "type")}
            onChange={(event): void =>
              setRequest({ ...request, type: event.target.value })
            }
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                textAlign: "left",
              },
            }}
            inputProps={{
              padding: 12,
            }}
          >
            <MenuItem value={"default"}>-- select type --</MenuItem>
            {TICKET_TYPES.map((_, i) => (
              <MenuItem key={i} value={_.value}>
                {_.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <Typography align="left" mb={1} variant={"h3"}>
            Message
          </Typography>
          <TextField
            id="message"
            size="small"
            multiline
            rows={10}
            variant="filled"
            value={request.message}
            error={propsHasError(errors, "message")}
            helperText={getErrorForProp(errors, "message")}
            onChange={(event): void =>
              setRequest({ ...request, message: event.target.value })
            }
            fullWidth
            InputProps={{ disableUnderline: true }}
            inputProps={{
              style: {
                padding: 12,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} textAlign={"center"}>
          <Button
            className={commonStyles.actionButton}
            onClick={onClickCreateTicket}
          >
            <Typography>Create Ticket</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
