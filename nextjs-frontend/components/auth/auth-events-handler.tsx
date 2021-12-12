import { authCheckStatusSelector } from '../../store/authentication/authentication-selectors';
import { useAppDispatch, useAppSelector } from '../../store/redux-store';
import { useEffect } from 'react';
import { setCheckStatus, setIsLoggedIn } from '../../store/authentication/authentication-slice';
import { authenticatedUser } from '../../services/front-end-services/auth/auth';

export default function AuthEventsHandler() {
  const status = useAppSelector(authCheckStatusSelector);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (status !== 'idle') return;
      appDispatch(setCheckStatus('loading'));
      try {
        const user = await authenticatedUser();
        appDispatch(setIsLoggedIn(user != null));
      } catch (e) {
        appDispatch(setIsLoggedIn(false));
      }
      appDispatch(setCheckStatus('success'));
    })();
  }, [status]);

  return null;
}
