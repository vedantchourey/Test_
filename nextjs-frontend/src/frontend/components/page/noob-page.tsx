import { useTheme } from '@mui/material';
import { useAppSelector } from '../../redux-store/redux-store';
import { getAppHeaderHeightSelector } from '../../redux-store/layout/layout-selectors';
import Head from 'next/head';
import NoobHeader from '../header/noob-header';
import commonStyles from '../../../../styles/common.module.css';
import styles from './noob-page.module.css';
import React from 'react';

interface Props {
  title: string;
  metaData: { [key: string]: string };
  favIcon?: string;
  children: React.ReactElement
}

export function NoobPage(props: Props) {
  const {
    metaData,
    favIcon = '/noob-fav.ico',
    title,
    children
  } = props;
  const metaKeys = Object.keys(metaData);

  const theme = useTheme();
  const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);
  return (
    <div style={{backgroundColor: theme.palette.background.default}}>
      <Head>
        <title>{title}</title>
        {metaKeys.map((key, index) => <meta key={index} name={key} content={metaData[key]}/>)}
        <link rel="icon" href={favIcon}/>
      </Head>
      <NoobHeader/>
      <main className={commonStyles.main}>
        <div className={styles.container} style={{marginTop: appHeaderHeight}}>
          {children}
        </div>
      </main>
    </div>
  )
}
