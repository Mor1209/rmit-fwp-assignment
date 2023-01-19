import { useLogin } from '../../hooks/useLogin'
import BasicForm from './BasicForm'
import {
  useLoginValidation,
  useMfaValidation,
} from '../../hooks/useUserValidation'
import { useState } from 'react'
import { Typography } from '@mui/material'

// Multi-step form for user login
// step1: getting user details
// step2: verifying mfa token
export const LoginForm = () => {
  const [step, setStep] = useState(1)
  const { loginMutation, validateUserMutation } = useLogin({ setStep })

  const inputFields1 = [
    { label: 'Email', defaultValue: '' },
    { label: 'Password', defaultValue: '' },
  ]
  const inputFields2 = [{ label: 'Token', defaultValue: '' }]

  const onStep1 = data => validateUserMutation.mutate(data)

  // Step2: Adding user to local storage and context upon success
  const onSubmit = data => loginMutation.mutate(data)

  const formValidation1 = useLoginValidation(onStep1)
  const formValidation2 = useMfaValidation(onSubmit)

  return (
    <>
      {step === 1 && (
        <BasicForm
          validation={formValidation1}
          inputFieldLabels={inputFields1}
          formName={'Login'}
          submitButtonName={'Next'}
          isLoading={validateUserMutation.isLoading}
        />
      )}
      {step === 2 && (
        <>
          <BasicForm
            validation={formValidation2}
            inputFieldLabels={inputFields2}
            formName={'Identity Check'}
            submitButtonName={'Login'}
            stepBackHandler={() => setStep(1)}
            isLoading={loginMutation.isLoading}
          >
            <Typography variant="h6" pt={1} mb={6}>
              Please open your authenticator app and enter your token
            </Typography>
          </BasicForm>
        </>
      )}
    </>
  )
}

export default LoginForm
