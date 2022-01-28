import * as React from 'react';
import { useAppSelector } from '../../redux-store/redux-store';
import { isDeviceTypeSelector } from '../../redux-store/layout/layout-selectors';
import { deviceTypes } from '../../redux-store/layout/device-types';
import NoobDesktopFooter from './noob-desktop-footer';
import NoobMobileFooter from './noob-mobile-footer';

export default function NoobFooter() {
    const isDesktop = useAppSelector(x => isDeviceTypeSelector(x, deviceTypes.desktop));
    return (
        <nav>
            {isDesktop && <NoobDesktopFooter />}
            {!isDesktop && <NoobMobileFooter />}
        </nav>
    );
}
