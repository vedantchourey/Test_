import { Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import NoobHeader from '../../components/header/noob-header';
import styles from './register.module.css';
import commonStyles from '../../styles/common.module.css';

export default function Register() {
  const theme = useTheme();
  return (
    <div style={{backgroundColor: theme.palette.background.paper}}>
      <Head>
        <title>Register</title>
        <meta name="description" content="Sign up to noob storm"/>
        <link rel="icon" href="/noob-fav.ico"/>
      </Head>
      <NoobHeader/>
      <main className={commonStyles.main}>
        <div className={styles.mainBanner}>
          <Typography className={styles.mainBannerText}>REGISTRATION</Typography>
        </div>
      </main>
    </div>
  )
}
