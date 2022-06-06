import { Box, Button, Grid, IconButton, InputBase, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import * as React from 'react';
import { isLoggedInSelector, userNameSelector } from '../../redux-store/authentication/authentication-selectors';
import { useAppSelector } from '../../redux-store/redux-store';
import { walletDetaislSelector } from '../../redux-store/wallet/wallet-selector';
import style from './desktop-sidebar.module.css';
import BasicPopover from './notification-popover';

export default function SideHeader(): JSX.Element {
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const username = useAppSelector(userNameSelector);
    const wallet = useAppSelector(walletDetaislSelector);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            {isLoggedIn && (
                <Grid container spacing={1}>
                    <Grid item md={8}></Grid>
                    <Grid item md={4} >
                        <BasicPopover val={anchorEl} />
                        <div className={style.container4}>
                            <Box style={{ border: "1px solid #6931F9" }} sx={{ borderRadius: '16px' }}>
                                <InputBase size="small" placeholder="Search anything..." sx={{ p: 1 }} />
                                <IconButton aria-label="search" onClick={handleClick}>
                                    <img src="/icons/search-icon.png" />
                                </IconButton>
                            </Box>
                            <img src="/icons/notification-icon.svg" style={{ marginLeft: 10 }} />
                            <img src="/images/16276393842661.png" className={style.img3} alt="logo" style={{ height: "50px", width: "50px", marginLeft: 10 }} />
                            <Box >
                                <Typography className={style.text1}>{username}</Typography>
                                <Button
                                    variant="text"
                                    size="small"
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