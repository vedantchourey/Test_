import React, { useEffect, useState } from 'react';
import CodeSendMessage from './link-sent-message';
import RequestVerificationCode from './request-verification-code';
import SetNewPassword from './new-password';
import { useRouter } from 'next/router';
import PasswordResetSuccessfully from './password-reset-successfully';

const ResetPasswordPage = (): JSX.Element => {

  const [activeScreen, setActiveScreen] = useState(0) // [0,1,2] -> reset pass, message, confirm password
  const router = useRouter()
  const handleNext = (incrementor = 1): void => {
    setActiveScreen((pre) => pre + incrementor)
  }

  useEffect(() => {
    const location = router.asPath.split("?")[1];
    const urlParams = new URLSearchParams(location)
    const token = urlParams.get("token")
    if (token) {
      setActiveScreen(2)
    }
  }, [])

  switch (activeScreen) {
    case 1:
      return <CodeSendMessage handleNext={handleNext} />
    case 2:
      return <SetNewPassword onResetHandler={handleNext} />
    case 3:
      return <PasswordResetSuccessfully />
    default:
      return <RequestVerificationCode onResetHandler={handleNext} />
  }
}

export default ResetPasswordPage
