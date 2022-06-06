import { Box, Button, Grid, InputBase, Popover, Typography } from "@mui/material";
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
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const message = [
        {
            image: '/icons/notification-data-image.svg',
            text: '"Andar" has chosen you as the Loser for the ENDPOINTGG VS CEX ESPORTS [2] tournament.'
        }
    ];

    function onAccept(): void { }
    function onDecline(): void { }

    return (
        <>
            {isLoggedIn && (
                <Grid container spacing={1}>
                    <Grid item md={7}></Grid>
                    <Grid item md={5} >
                        <div className={style.container4} style={{ justifyContent: 'flex-end' }}>
                            <Box style={{ border: "1px solid #6931F9" }} sx={{ borderRadius: '16px' }}>
                                <InputBase size="small" placeholder="Search anything..." sx={{ p: 1 }} />
                                <Button>
                                    <img src="/icons/search-icon.png" />
                                </Button>
                            </Box>
                            <Button onClick={handleClick}>
                                <img src="/icons/notification-icon.svg" />
                            </Button>
                            <img src="/images/16276393842661.png" className={style.img3} alt="logo" style={{ height: "50px", width: "50px", }} />
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
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <BasicPopover message={message} onAccept={onAccept} onDecline={onDecline} />
            </Popover>
        </>
    )
}