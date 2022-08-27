import { useLogin } from '../../hooks/useLogin'
import BasicForm from './BasicForm'
import {
  useLoginValidation,
  useMfaValidation,
} from '../../hooks/useUserValidation'
import { useState } from 'react'
import { Typography } from '@mui/material'

export const LoginForm = () => {
  const { validate, login } = useLogin()
  const [step, setStep] = useState(1)
  const inputFields1 = [
    { label: 'Email', defaultValue: '' },
    { label: 'Password', defaultValue: '' },
  ]
  const inputFields2 = [{ label: 'Token', defaultValue: '' }]

  const onStep1 = data => {
    validate(data.email, data.password)
    setStep(2)
  }

  const onSubmit = data => login(data.token)

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
