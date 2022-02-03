import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import styles from "./noob-desktop-newsletter.module.css"

export default function NoobDesktopNewsletterPoster() {

  const [value, setValue] = useState('');
  return (
    <div className={styles.NewsletterContainer}>
      <div className={styles.innerContainer}>
        <Typography align="center" variant="h1">
          subscribe to our newsletter
        </Typography>
        <Typography align="center" variant="h3" >
          Receive news, stay updated and special offers
        </Typography>
        <div className={styles.emailInputContainer}>
          <TextField
            id="email"
            placeholder="Your Email Address"
            variant="filled"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={styles.textField}
            InputProps={{
              disableUnderline: true,
              className: styles.inputStyle
            }}
            inputProps={{
              className: styles.inputStyle
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