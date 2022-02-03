import {
  authCheckStatusSelector,
  forceFetchAvatarBackgroundImageBlobSelector,
  forceFetchAvatarImageBlobSelector,
  userProfileFetchStatusSelector,
  userProfileSelector
} from '../../redux-store/authentication/authentication-selectors';
import { useAppDispatch, useAppSelector } from '../../redux-store/redux-store';
import { useEffect } from 'react';
import { clearUserProfile, fetchUserProfileThunk, setAvatarBackgroundBlob, setAvatarBlob, setCheckLoginStatus, setIsLoggedIn } from '../../redux-store/authentication/authentication-slice';
import { refreshSession } from '../../service-clients/auth-service-client';
import { frontendSupabase } from '../../services/supabase-frontend-service';
import { setIsLoading } from '../../redux-store/screen-animations/screen-animation-slice';
import { downloadImage } from '../../service-clients/image-service-client';
import Router from 'next/router';

export default function AuthEventsHandler() {
  const status = useAppSelector(authCheckStatusSelector);
  const appDispatch = useAppDispatch();
  const profileFetchStatus = useAppSelector(userProfileFetchStatusSelector);
  const userProfile = useAppSelector(userProfileSelector);
  const forceFetchAvatar = useAppSelector(forceFetchAvatarImageBlobSelector);
  const forceFetchAvatarBackground = useAppSelector(forceFetchAvatarBackgroundImageBlobSelector);

  useEffect(() => {
    (async () => {
      if (status !== 'idle') return;
      try {
        appDispatch(setIsLoading(true));
        appDispatch(setCheckLoginStatus('loading'));
        const session = await refreshSession();
        if (session.error != null) {
          appDispatch(setCheckLoginStatus('success'));
          appDispatch(setIsLoggedIn({ isLoggedIn: false, username: undefined }));
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
  }, [appDispatch, profileFetchStatus]);

  useEffect(() => {
    const subscription = frontendSupabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        appDispatch(setIsLoading(true));
        appDispatch(setIsLoggedIn({ isLoggedIn: session?.user != null, username: session?.user?.user_metadata?.username }));
        appDispatch(fetchUserProfileThunk());
        appDispatch(setCheckLoginStatus('success'));
      } else if (event === 'SIGNED_OUT') {
        appDispatch(setIsLoggedIn({ isLoggedIn: false, username: undefined }));
        appDispatch(clearUserProfile());
        appDispatch(setAvatarBlob(undefined));
        appDispatch(setAvatarBackgroundBlob(undefined));
      } else if (event === "PASSWORD_RECOVERY") {
        appDispatch(setIsLoading(true));
        const fullPath = Router.asPath;
        const urlSearchParams = new URLSearchParams(fullPath);
        const searchQuery = Object.fromEntries(urlSearchParams.entries());
        appDispatch(setIsLoggedIn({ isLoggedIn: session?.user != null, username: session?.user?.user_metadata?.username }));
        appDispatch(fetchUserProfileThunk());
        appDispatch(setCheckLoginStatus('success'));
        Router.push(`/reset-password?token=${searchQuery['/#access_token']}`)
      }
    });
    return () => subscription.data?.unsubscribe()
  }, [appDispatch])

  useEffect(() => {
    (async () => {
      if (userProfile?.avatarUrl == null) return;
      const usersAvatar = await downloadImage('resources', userProfile.avatarUrl, true);
      if (usersAvatar.data == null) return;
      const objectURL: string = URL.createObjectURL(usersAvatar.data);
      appDispatch(setAvatarBlob(objectURL));
    })();
  }, [appDispatch, userProfile?.avatarUrl, forceFetchAvatar]);


  useEffect(() => {
    (async () => {
      if (userProfile?.profileBackgroundImageUrl == null) return;
      const usersBackground = await downloadImage('resources', userProfile.profileBackgroundImageUrl, true);
      if (usersBackground.data == null) return;
      const objectURL: string = URL.createObjectURL(usersBackground.data);
      appDispatch(setAvatarBackgroundBlob(objectURL));
    })();
  }, [appDispatch, userProfile?.profileBackgroundImageUrl, forceFetchAvatarBackground])

  return null;
}
