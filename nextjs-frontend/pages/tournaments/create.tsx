import Head from 'next/head';
import NoobHeader from '../../src/frontend/components/header/noob-header';
import homeModule from '../../styles/common.module.css';
import AuthGuard from '../../src/frontend/components/auth/auth-guard';
import { Card, useTheme } from '@mui/material';
import { NoobUserRole } from '../../src/backend/utils/api-middle-ware/noob-user-role';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { getAppHeaderHeightSelector } from '../../src/frontend/redux-store/layout/layout-selectors';

const requiredRoles: NoobUserRole[] = ['noob-admin'];

export default function Create() {

  const theme = useTheme();
  const appHeaderHeight = useAppSelector(getAppHeaderHeightSelector);

  return (
    <div style={{backgroundColor: theme.palette.background.default}}>
      <Head>
        <title>Create Tournament</title>
        <meta name="description" content="Noob storm home page"/>
        <link rel="icon" href="/noob-fav.ico"/>
      </Head>
      <NoobHeader/>
      <main className={homeModule.main}>
        <div style={{marginTop: appHeaderHeight}}>
          <Card>
            <AuthGuard requiredRoles={requiredRoles}
                       redirectToOnFailure="/404"
                       renderOnCheckSuccess={() => <div>Hello</div>}
                       renderOnCheckFailure={() => <div>Bye Bye</div>}/>
          </Card>
        </div>

      </main>
    </div>
  )


}
