import { authCheckStatusSelector, userProfileFetchStatusSelector, userProfileSelector } from '../../store/authentication/authentication-selectors';
import { useAppDispatch, useAppSelector } from '../../store/redux-store';
import { useEffect } from 'react';
import { clearUserProfile, fetchUserProfileThunk, setAvatarBackgroundUrl, setAvatarUrl, setCheckLoginStatus, setIsLoggedIn } from '../../store/authentication/authentication-slice';
import { refreshSession } from '../../services/front-end-services/auth-service';
import { frontendSupabase } from '../../services/front-end-services/supabase-frontend-service';
import { setIsLoading } from '../../store/screen-animations/screen-animation-slice';
import { downloadImage } from '../../services/front-end-services/image-service';

export default function AuthEventsHandler() {
  const status = useAppSelector(authCheckStatusSelector);
  const appDispatch = useAppDispatch();
  const profileFetchStatus = useAppSelector(userProfileFetchStatusSelector);
  const userProfile = useAppSelector(userProfileSelector);

  useEffect(() => {
    (async () => {
      if (status !== 'idle') return;
      try {
        appDispatch(setIsLoading(true));
        appDispatch(setCheckLoginStatus('loading'));
        const session = await refreshSession();
        if (session.error != null) {
          appDispatch(setCheckLoginStatus('success'));
          appDispatch(setIsLoggedIn({isLoggedIn: false, username: undefined}));
          appDispatch(setIsLoading(false))
        }
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
        appDispatch(setAvatarUrl(undefined));
        appDispatch(setAvatarBackgroundUrl(undefined));
      }
    });
    return () => subscription.data?.unsubscribe()
  }, [])

  useEffect(() => {
    (async () => {
      if (userProfile?.avatarUrl == null) return;
      const usersAvatar = await downloadImage('resources', userProfile?.avatarUrl);
      if (usersAvatar.data == null) return;
      const objectURL: string = URL.createObjectURL(usersAvatar.data);
      appDispatch(setAvatarUrl(objectURL));
    })();
  }, [userProfile?.avatarUrl]);


  useEffect(() => {
    (async () => {
      if (userProfile?.profileBackgroundImageUrl == null) return;
      const usersBackground = await downloadImage('resources', userProfile?.profileBackgroundImageUrl);
      if (usersBackground.data == null) return;
      const objectURL: string = URL.createObjectURL(usersBackground.data);
      appDispatch(setAvatarBackgroundUrl(objectURL));
    })();
  }, [userProfile?.profileBackgroundImageUrl])

  return null;
}
