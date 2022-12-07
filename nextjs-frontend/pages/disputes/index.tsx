import * as React from 'react'
import type { NextPage } from 'next'
import NoobPage from '../../src/frontend/components/page/noob-page'
import { Typography, Divider } from '@mui/material'
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../src/frontend/redux-store/layout/device-types';

const Disputes: NextPage = () => {

    const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

    return (
        <NoobPage title='Disputes' metaData={{ description: "Noob Storm disputes page" }}>
            <React.Fragment>

                {isDesktop &&
                    <div>
                        <Divider style={{ padding: 35 }}>
                            <Typography variant="h5">Disputes and Code of Conduct</Typography>
                        </Divider>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginLeft: "40px" }}>
                            <Typography variant='body2'>Providing inaccurate information to your opponent in an attempt to mislead them or gain a competitive advantage you would not have otherwise had will result in an unfavourable decision. </Typography>
                            <Typography variant='body2'>Providing inaccurate information and/or evidence in an attempt to mislead Noobstorm staff in a review will result in an automatic forfeit. Additionally, a suspension or ban may follow.</Typography>
                            <Typography variant='body2'>Absolutely No Cheating!!!</Typography>
                            <Typography variant='body2'>For Single and Multiplayer tournaments, a violation of an in-game rule will result in a forfeit.</Typography>
                            <Typography variant='body2'>If you claim a win in a game you are losing or lost and provide nothing that would give you grounds to do so it will result in an automatic forfeit.</Typography>
                            <Typography variant='body2'>Any attempt to artificially give someone wins or losses is prohibited.</Typography>
                            <Typography variant='body2'>Impersonating or attempting to impersonate another player in any way is prohibited.</Typography>
                            <Typography variant='body2'>Accessing or playing games on another players account is prohibited. Anyone found to have accessed another player’s account or allowed another player to access their own will be suspended and their accounts will be placed under review. </Typography>
                            <Typography variant='body2'>If you are cited for intentional lagging, your account will be closed.</Typography>
                            <Typography variant='body2'>If you are cited for providing evidence that is not from the match in question, your account will be closed.</Typography>
                            <Typography variant='body2'>Anything deemed to be racist in nature will result in your account being closed.</Typography>
                            <Typography variant='body2'>Claiming wins in Unplayed 1v1 or team games is prohibited. </Typography>
                            <Typography variant='body2'>The first instance in which inaccurate information is provided in an attempt to mislead Noobstorm staff in a review will result in your account being suspended. The second instance will result in your account being closed.</Typography>
                            <Typography variant='body2'>All decisions rendered by the Noobstorm staff are final and binding,</Typography>
                        </div>
                    </div>
                }

                {!isDesktop &&
                    <div>
                        <Divider style={{ padding: 25 }}>
                            <Typography variant="h3">Disputes and Code of Conduct</Typography>
                        </Divider>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "space-around", color: "white" }}>
                            <Typography variant='body2'>Providing inaccurate information to your opponent in an attempt to mislead them or gain a competitive advantage you would not have otherwise had will result in an unfavourable decision. </Typography>
                            <Typography variant='body2'>Providing inaccurate information and/or evidence in an attempt to mislead Noobstorm staff in a review will result in an automatic forfeit. Additionally, a suspension or ban may follow.</Typography>
                            <Typography variant='body2'>Absolutely No Cheating!!!</Typography>
                            <Typography variant='body2'>For Single and Multiplayer tournaments, a violation of an in-game rule will result in a forfeit.</Typography>
                            <Typography variant='body2'>If you claim a win in a game you are losing or lost and provide nothing that would give you grounds to do so it will result in an automatic forfeit.</Typography>
                            <Typography variant='body2'>Any attempt to artificially give someone wins or losses is prohibited.</Typography>
                            <Typography variant='body2'>Impersonating or attempting to impersonate another player in any way is prohibited.</Typography>
                            <Typography variant='body2'>Accessing or playing games on another players account is prohibited. Anyone found to have accessed another player’s account or allowed another player to access their own will be suspended and their accounts will be placed under review. </Typography>
                            <Typography variant='body2'>If you are cited for intentional lagging, your account will be closed.</Typography>
                            <Typography variant='body2'>If you are cited for providing evidence that is not from the match in question, your account will be closed.</Typography>
                            <Typography variant='body2'>Anything deemed to be racist in nature will result in your account being closed.</Typography>
                            <Typography variant='body2'>Claiming wins in Unplayed 1v1 or team games is prohibited. </Typography>
                            <Typography variant='body2'>The first instance in which inaccurate information is provided in an attempt to mislead Noobstorm staff in a review will result in your account being suspended. The second instance will result in your account being closed.</Typography>
                            <Typography variant='body2'>All decisions rendered by the Noobstorm staff are final and binding,</Typography>
                        </div>

                    </div>}
            </React.Fragment>
        </NoobPage>
    )
}

export default Disputes