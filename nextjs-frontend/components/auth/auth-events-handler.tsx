import { authCheckStatusSelector, userProfileFetchStatusSelector } from '../../store/authentication/authentication-selectors';
import { useAppDispatch, useAppSelector } from '../../store/redux-store';
import { useEffect } from 'react';
import { clearUserProfile, fetchUserProfileThunk, setCheckLoginStatus, setIsLoggedIn } from '../../store/authentication/authentication-slice';
import { refreshSession } from '../../services/front-end-services/auth/auth-service';
import { frontendSupabase } from '../../services/front-end-services/supabase-frontend-service';
import { setIsLoading } from '../../store/screen-animations/screen-animation-slice';

export default function AuthEventsHandler() {
  const status = useAppSelector(authCheckStatusSelector);
  const appDispatch = useAppDispatch();
  const profileFetchStatus = useAppSelector(userProfileFetchStatusSelector);

  useEffect(() => {
    (async () => {
      if (status !== 'idle') return;
      try {
        appDispatch(setIsLoading(true));
        appDispatch(setCheckLoginStatus('loading'));
        const session = await refreshSession();
        if (session.user == null) appDispatch(setIsLoading(false));
      } catch (e) {
        appDispatch(setIsLoading(false));
        throw e;
      }
    })();
  }, []);

  useEffect(() => {
    if (profileFetchStatus !== 'success') return;
    appDispatch(setIsLoading(false));
  }, [profileFetchStatus]);

  useEffect(() => {
    const subscription = frontendSupabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        appDispatch(setIsLoading(true));
        appDispatch(setIsLoggedIn({isLoggedIn: session?.user != null, username: session?.user?.user_metadata?.username}));
        appDispatch(fetchUserProfileThunk());
        appDispatch(setCheckLoginStatus('success'));
      } else if (event === 'SIGNED_OUT') {
        appDispatch(setIsLoggedIn({isLoggedIn: false, username: undefined}));
        appDispatch(clearUserProfile());
      }
    });
    return () => subscription.data?.unsubscribe()
  }, [])

  return null;
}
