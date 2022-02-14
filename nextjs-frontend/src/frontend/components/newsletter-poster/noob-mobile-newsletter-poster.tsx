import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import styles from "./noob-mobile-newsletter.module.css"

export default function NoobMobileNewsletterPoster(): JSX.Element {
  const [value, setValue] = useState('');

  return (
    <div className={styles.NewsletterContainer}>

      <div className={styles.innerContainer}>
        <Typography align="center" variant="h1" marginBottom={2}>
          subscribe to our newsletter
        </Typography>
        <Typography align="center" variant="h3" marginBottom={2}>
          Receive news, stay updated and special offers
        </Typography>
        <div className={styles.emailInputContainer}>
          <TextField
            id="email"
            placeholder="Your Email Address"
            variant="filled"
            value={value}
            onChange={(event): void => setValue(event.target.value)}
            className={styles.textField}
            InputProps={{
              disableUnderline: true,
              className: styles.inputStyle
            }}
            inputProps={{
              style: { padding: "0 !important" }
            }}
          />
          <Button className={styles.actionButton}>
            <Typography>Subscribe</Typography>
          </Button>

        </div>
      </div>
    </div>
  )
}
