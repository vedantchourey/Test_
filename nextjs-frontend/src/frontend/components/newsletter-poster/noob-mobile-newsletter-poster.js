import { Button, TextField, Typography } from "@mui/material"
import commonStyles from "../../styles/common.module.css"
import styles from "./noob-mobile-newsletter.module.css"

export default function NoobMobileNewsletterPoster() {
    return (
        <div className={styles.NewsletterContainer}>

            <div className={styles.innerContainer}>
                <Typography className={styles.headerText} marginBottom={2}>
                    subscribe to our newsletter
                </Typography>
                <Typography className={styles.bodyText} marginBottom={2}>
                    Receive news, stay updated and special offers
                </Typography>
                <div className={styles.emailInputContainer}>
                    <TextField
                        id="email"
                        placeholder="Your Email Address"
                        variant="filled"
                        // className={styles.inputRowItem}
                        // value={request.username}
                        // error={propsHasError(errors, 'username')}
                        // helperText={getErrorForProp(errors, 'username')}
                        // onChange={event => setRequest({ ...request, username: event.target.value })}
                        style={{ borderRadius: 0, flex: 1 }}
                        InputProps={{ disableUnderline: true, style: { borderTopRightRadius: 0, borderTopLeftRadius: 0 } }}
                    />
                    <Button className={styles.actionButton} onClick={() => { }}>
                        <Typography>Subscribe</Typography>
                    </Button>

                </div>
            </div>
        </div>
    )
}