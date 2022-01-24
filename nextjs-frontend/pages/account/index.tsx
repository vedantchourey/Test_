import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { authCheckStatusSelector, isLoggedInSelector } from '../../src/frontend/redux-store/authentication/authentication-selectors';
import UserProfileCard from '../../src/frontend/components/cards/user-profile-card/user-profile-card';
import NoobPage from '../../src/frontend/components/page/noob-page';

export default function Account() {
    const router = useRouter();
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const checkStatus = useAppSelector(authCheckStatusSelector);

    useEffect(() => {
        (async () => {
            if (checkStatus !== 'success') return;
            if (isLoggedIn) return;
            await router.push('/')
        })()
    });

    return (
        <NoobPage
            title="Account"
            metaData={{
                description: "Noob Storm account page"
            }}
        >
            <UserProfileCard />
        </NoobPage>
    )
}
