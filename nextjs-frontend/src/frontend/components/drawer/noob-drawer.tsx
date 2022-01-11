import * as React from 'react';
import { useAppSelector } from '../../redux-store/redux-store';
import { isLoggedInSelector } from '../../redux-store/authentication/authentication-selectors';
import NoobLoggedOutDrawer from './noob-logged-out-drawer';
import NoobLoggedInDrawer from './noob-logged-in-drawer';

interface Props {
  show: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function NoobDrawer(props: Props) {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  if (!isLoggedIn) return <NoobLoggedOutDrawer {...props}/>
  return <NoobLoggedInDrawer {...props}/>
}
