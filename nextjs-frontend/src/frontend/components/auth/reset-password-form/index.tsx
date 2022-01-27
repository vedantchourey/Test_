import React, { useState } from 'react';
import CodeSendMessage from './link-sent-message';
import RequestVerificationCode from './request-verification-code';
import SetNewPassword from './new-password';

const ResetPasswordPage = () => {

    const [activeScreen, setActiveScreen] = useState(0) // [0,1,2] -> reset pass, message, confirm password 

    const handleNext = (incrementor = 1) => {
        setActiveScreen(pre => pre + incrementor)
    }

    const onResetHandler = () => {
        if (activeScreen == 2) {
            handleNext(-2)
        } else {
            handleNext()
        }
    }

    switch (activeScreen) {
        case 1:
            return <CodeSendMessage handleNext={onResetHandler} />
        case 2:
            return <SetNewPassword onResetHandler={onResetHandler} />
        default:
            return <RequestVerificationCode onResetHandler={onResetHandler} />
    }
}

export default ResetPasswordPage