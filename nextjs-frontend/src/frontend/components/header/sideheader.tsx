import { Box, Button, Grid, IconButton, InputBase, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { isLoggedInSelector, userNameSelector } from '../../redux-store/authentication/authentication-selectors';
import { useAppSelector } from '../../redux-store/redux-store';
import { walletDetaislSelector } from '../../redux-store/wallet/wallet-selector';
import style from './desktop-sidebar.module.css';

export default function SideHeader(): JSX.Element {
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const username = useAppSelector(userNameSelector);
    const wallet = useAppSelector(walletDetaislSelector);
    const router = useRouter();

    return (
        <>
            {isLoggedIn && (
                <Grid container spacing={2}>
                    <Grid item md={7}></Grid>
                    <Grid item md={3}>
                    <Box style={{ border: "1px soloid #6931F9" }}>  <Box style={{ marginTop: 42 }}>
                           <InputBase placeholder="Search anything..." inputProps={{ 'aria-label': 'search google maps' }}/>
                            <IconButton aria-label="search">
                                <img src="/icons/search-icon.png"/>
                            </IconButton></Box>
                        </Box>
                    </Grid>
                    <Grid item md={2}>
                        <div className={style.container4}>
                            <img src="/icons/notification-icon.svg" />
                            <img src="/images/16276393842661.png" className={style.img3} alt="logo" />
                            <Box>
                                <Typography className={style.text1}>{username}</Typography>
                                <Button
                                    variant="text"
                                    className={style.button4}
                                    onClick={(): any => router.push("/wallet/info")}
                                    startIcon={<img src="/icons/Vector-Wallet.png" />}
                                >
                                    {wallet?.balance}
                                </Button>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            )}
        </>
    )
}