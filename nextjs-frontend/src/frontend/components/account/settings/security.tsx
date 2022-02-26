import { userProfileSelector } from '../../../redux-store/authentication/authentication-selectors';
import { setUserProfile } from '../../../redux-store/authentication/authentication-slice';
import { useAppSelector, useAppDispatch } from '../../../redux-store/redux-store';
import { FormLabel, Switch } from '@mui/material';
import { setPrivateAccount, setPublicAccount } from '../../../service-clients/profile-service-client';

const Security = (): JSX.Element => {
  const userData = useAppSelector(userProfileSelector);
  const dispatch = useAppDispatch();

  const handleProfilePrivacy = (): void => {
    if (!userData) return;
    if (!userData?.isPrivate) {
      setPrivateAccount();
      dispatch(setUserProfile({
        ...userData,
        isPrivate: true
      }));
      return;
    }
    setPublicAccount();
    dispatch(setUserProfile({
      ...userData,
      isPrivate: false
    }));
  }

  return (
    <>
      <FormLabel>
        Account Privacy {userData?.isPrivate ? '(Private) ' : '(Public) '}
      </FormLabel>
      <Switch defaultChecked={userData?.isPrivate} onChange={handleProfilePrivacy} />
    </>
  )
}

export default Security;