import { useTheme } from '@mui/material';
import Head from 'next/head';
import NoobHeader from '../../src/frontend/components/header/noob-header';
import homeModule from '../src/frontend/styles/common.module.css';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { getAppHeaderHeightSelector } from '../../src/frontend/redux-store/layout/layout-selectors';
import styles from './404.module.css'
import NotFound from '../../src/frontend/components/not-found/not-found';

export default function Noob404Page() {
    const theme = useTheme();
    const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);

    return (
        <div style={{ backgroundColor: theme.palette.background.default }}>
            <Head>
                <title>Home</title>
                <meta name="description" content="Noob storm home page" />
                <link rel="icon" href="/noob-fav.ico" />
            </Head>
            <NoobHeader />
            <main className={homeModule.main}>
                <div style={{ marginTop: appHeaderHeight }} className={styles.mainContainer}>
                    <NotFound />
                </div>
            </main>
        </div>
    )
}
