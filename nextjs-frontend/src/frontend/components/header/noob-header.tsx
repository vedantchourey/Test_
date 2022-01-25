import * as React from 'react';
import NoobDesktopHeader from './noob-desktop-header';
import { useAppSelector } from '../../redux-store/redux-store';
import { isDeviceTypeSelector } from '../../redux-store/layout/layout-selectors';
import { deviceTypes } from '../../redux-store/layout/device-types';
import NoobMobileHeader from './noob-mobile-header';

export default function NoobHeader() {
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  return (
    <nav>
      {isDesktop && <NoobDesktopHeader/>}
      {!isDesktop && <NoobMobileHeader/>}
    </nav>
  );
}
