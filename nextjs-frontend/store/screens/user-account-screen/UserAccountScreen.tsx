import React, { ComponentProps } from 'react';
import { NavProp, NavState } from '../../../navigation/screen-params/NavParamsList';
import { View } from 'react-native';
import { bodyMarginBelowHeader, mobileScreenBodyHorizontalPadding } from '../../layout/LayoutConstants';
import { useAppSelector } from '../../Store';
import { isDeviceTypeSelector } from '../../layout/LayoutSelectors';
import { deviceTypes } from '../../layout/DeviceTypes';
import NoobHeader from '../../../components/common/header/NoobHeader';
import RefDatFetcher from '../../../components/common/ref-data-fetcher/RefDatFetcher';
import AuthCheckOnLoad from '../../../components/common/authentication/AuthCheckOnLoad';
import { IRouteProp } from '../../../navigation/IRouteProp';

interface Props extends ComponentProps<any> {
  navigation: NavProp;
  route: IRouteProp<any>;
}

function UserAccountScreen(props: Props) {
  const {navigation, route} = props;
  const isDesktop = useAppSelector(x => isDeviceTypeSelector(x, deviceTypes.desktop));
  const paddingHorizontal = isDesktop ? mobileScreenBodyHorizontalPadding : mobileScreenBodyHorizontalPadding;

  return (
    <View>
      <NoobHeader navigation={navigation} route={route}/>
      <View style={{
        paddingHorizontal: paddingHorizontal,
        marginTop: bodyMarginBelowHeader
      }}>
      </View>
    </View>
  )
}

export default function SafeAccountScreen(props: Props) {
  return (
    <AuthCheckOnLoad navigation={props.navigation}
                     route={props.route}
                     isAuthRequired={true}>
      <RefDatFetcher>
        <UserAccountScreen {...props}/>
      </RefDatFetcher>
    </AuthCheckOnLoad>
  );
}

