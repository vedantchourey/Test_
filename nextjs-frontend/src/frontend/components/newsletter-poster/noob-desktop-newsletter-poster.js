import { Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import commonStyles from "../../styles/common.module.css"
import styles from "./noob-desktop-newsletter.module.css"

export default function NoobDesktopNewsletterPoster() {

    const [value, setValue] = useState('');
    return (
        <div className={styles.NewsletterContainer}>
            <div className={styles.innerContainer}>
                <Typography className={styles.headerText}>
                    subscribe to our newsletter
                </Typography>
                <Typography className={styles.bodyText}>
                    Receive news, stay updated and special offers
                </Typography>
                <div className={styles.emailInputContainer}>
                    <TextField
                        id="email"
                        placeholder="Your Email Address"
                        variant="filled"
                        // className={styles.inputRowItem}
                        value={value}
                        // error={propsHasError(errors, 'username')}
                        // helperText={getErrorForProp(errors, 'username')}
                        onChange={event => setValue(event.target.value)}
                        style={styles.textField}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                borderTopRightRadius: 0,
                                borderTopLeftRadius: 0
                            }
                        }}
                    />
                    <Button className={styles.actionButton} onClick={() => { }}>
                        <Typography>Subscribe</Typography>
                    </Button>

                </div>
            </div>
        </div>
    )
}