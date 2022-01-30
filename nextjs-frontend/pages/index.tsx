import type { NextPage } from 'next'
import Head from 'next/head'
import { useTheme } from '@mui/material';
import NoobHeader from '../src/frontend/components/header/noob-header';
import {useCommonStyles} from '../src/frontend/styles/common-styles';


const Home: NextPage = () => {
  const theme = useTheme();
  const commonStyles = useCommonStyles();
  return (
    <div style={{backgroundColor: theme.palette.background.default}}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Noob storm home page"/>
        <link rel="icon" href="/noob-fav.ico"/>
      </Head>
      <NoobHeader/>
      <main className={commonStyles.main}>
        <div>
          Hello
        </div>
      </main>
    </div>
  )
}

export default Home
