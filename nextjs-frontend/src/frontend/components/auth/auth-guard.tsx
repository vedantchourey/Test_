import React, { useEffect } from 'react';
import { useAppSelector } from '../../redux-store/redux-store';
import { authCheckStatusSelector, isLoggedInSelector, userRolesSelector } from '../../redux-store/authentication/authentication-selectors';
import { NoobUserRole } from '../../../backend/utils/api-middle-ware/noob-user-role';
import { useRouter } from 'next/router';

type Props = {
  renderOnCheckSuccess?: () => React.ReactElement;
  renderOnCheckFailure?: () => React.ReactElement;
  redirectToOnFailure?: string;
  redirectToOnSuccess?: string;
  requiredRoles?: NoobUserRole[];
}

export default function AuthGuard(props: Props): React.ReactElement {
  const {
    renderOnCheckSuccess,
    renderOnCheckFailure,
    requiredRoles = [],
    redirectToOnFailure,
    redirectToOnSuccess
  } = props;

  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const userRoles = useAppSelector(userRolesSelector);
  const authCheckStatus = useAppSelector(authCheckStatusSelector);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (authCheckStatus !== 'success') return;
      if (isLoggedIn && redirectToOnSuccess) {
        await router.push(redirectToOnSuccess);
      }
      if (!isLoggedIn && redirectToOnFailure) {
        await router.push(redirectToOnFailure);
      }
    })();
  }, [authCheckStatus, isLoggedIn, redirectToOnSuccess, redirectToOnFailure, router]);


  if (!isLoggedIn) return renderOnCheckFailure?.() || <></>;
  if (requiredRoles.length > 0 && userRoles.length == 0) return renderOnCheckFailure?.() || <></>;
  if (!requiredRoles.some(x => userRoles.indexOf(x) !== -1)) return renderOnCheckFailure?.() || <></>;
  return renderOnCheckSuccess?.() || <></>;
}
