import * as React from 'react';
import NoobDesktopHeader from './noob-desktop-header';
import { useAppSelector } from '../../store/redux-store';
import { isDeviceTypeSelector } from '../../store/layout/layout-selectors';
import { deviceTypes } from '../../store/layout/device-types';

export default function NoobHeader() {
  const isDesktop = useAppSelector(x => isDeviceTypeSelector(x, deviceTypes.desktop));
  return (
    <nav>
      {isDesktop && <NoobDesktopHeader/>}
    </nav>
  );
}
