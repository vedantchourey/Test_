import * as React from 'react';
import { deviceTypes } from '../../redux-store/layout/device-types';
import { isDeviceTypeSelector } from '../../redux-store/layout/layout-selectors';
import { useAppSelector } from '../../redux-store/redux-store';
import DrawerLeft from '../header/desktop-header';
import MobileDrawer from '../header/mobile-header';

export default function NoobHeader(): JSX.Element {
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  return (
    <nav>
      {isDesktop && <DrawerLeft />}
      {!isDesktop && <MobileDrawer />}
    </nav>
  );
}
