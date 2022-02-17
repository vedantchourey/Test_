import React from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux-store/redux-store';
import { isLoggedInSelector, userProfileSelector } from '../../redux-store/authentication/authentication-selectors';
import { isLoadingSelector } from '../../redux-store/screen-animations/screen-animations-selectors';

const withProtected = (Component: React.ElementType): unknown => {
  const AuthenticatedRoute = (): JSX.Element | null => {
    const isLogged = useAppSelector(isLoggedInSelector);
    const isLoading = useAppSelector(isLoadingSelector);
    const user = useAppSelector(userProfileSelector);
    const router = useRouter();

    if (isLogged && user?.id) return <Component />
    if (!isLogged && !isLoading) router.replace('/');
    return null
  }
  return AuthenticatedRoute;
}

export {
  withProtected
}