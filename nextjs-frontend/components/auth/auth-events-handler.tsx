import { authCheckStatusSelector } from '../../store/authentication/authentication-selectors';
import { useAppDispatch, useAppSelector } from '../../store/redux-store';
import { useEffect } from 'react';
import { fetchUserProfileThunk, setCheckLoginStatus, setIsLoggedIn } from '../../store/authentication/authentication-slice';
import { refreshSession } from '../../services/front-end-services/auth/auth-service';
import { frontendSupabase } from '../../services/front-end-services/supabase-frontend-service';
import { setIsLoading } from '../../store/screen-animations/screen-animation-slice';

export default function AuthEventsHandler() {
  const status = useAppSelector(authCheckStatusSelector);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (status !== 'idle') return;
      try {
        appDispatch(setIsLoading(true));
        appDispatch(setCheckLoginStatus('loading'));
        await refreshSession();
        appDispatch(setCheckLoginStatus('success'));
      } finally {
        appDispatch(setIsLoading(false));
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = frontendSupabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        appDispatch(setIsLoggedIn({isLoggedIn: session?.user != null, username: session?.user?.user_metadata?.username}));
        appDispatch(fetchUserProfileThunk());
      } else if (event === 'SIGNED_OUT') {
        appDispatch(setIsLoggedIn({isLoggedIn: false, username: undefined}));
      }
    });
    return () => subscription.data?.unsubscribe()
  }, [])

  return null;
}
