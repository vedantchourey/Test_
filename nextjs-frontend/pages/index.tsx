import type { NextPage } from 'next'
import Head from 'next/head'
import { useTheme } from '@mui/material';
import NoobHeader from '../src/frontend/components/header/noob-header';
import homeModule from '../styles/common.module.css';


const Home: NextPage = () => {
  const theme = useTheme();
  return (
    <div style={{backgroundColor: theme.palette.background.default}}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Noob storm home page"/>
        <link rel="icon" href="/noob-fav.ico"/>
      </Head>
      <NoobHeader/>
      <main className={homeModule.main}>
        <div>
          Hello
        </div>
      </main>
    </div>
  )
}

export default Home
