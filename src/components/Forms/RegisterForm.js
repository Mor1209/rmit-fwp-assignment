import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useRegister } from '../../hooks/useRegister'
import {
  useMfaValidation,
  useRegisterValidation,
} from '../../hooks/useUserValidation'
import BasicForm from './BasicForm'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

// Multi-step form for user login
// step1: getting user details
// step2: verifying mfa token and saving secret
export const RegisterForm = () => {
  const [step, setStep] = useState(1)
  const { validate, register, qr, secret } = useRegister()
  const inputFields1 = [
    { label: 'Name', defaultValue: '' },
    { label: 'Email', defaultValue: '' },
    { label: 'Password', defaultValue: '' },
    { label: 'Confirm Password', defaultValue: '' },
  ]
  const inputFields2 = [{ label: 'Token', defaultValue: '' }]

  const onStep1 = data => {
    if (validate(data.name, data.email, data.password)) {
      setStep(2)
    }
  }

  // Step2: user added to local storage upon successfull completion
  const onSubmit = data => {
    register(data.token)
  }

  const formValidation1 = useRegisterValidation(onStep1)
  const formValidation2 = useMfaValidation(onSubmit)
  console.log('secret recieved:')
  console.log(secret)

  return (
    <>
      {step === 1 && (
        <BasicForm
          validation={formValidation1}
          inputFieldLabels={inputFields1}
          formName={'Register'}
          submitButtonName={'Next'}
        />
      )}
      {step === 2 && (
        <>
          <BasicForm
            validation={formValidation2}
            inputFieldLabels={inputFields2}
            formName={'Add MFA'}
            submitButtonName={'Register'}
            stepBackHandler={() => setStep(1)}
          >
            {qr && (
              <Box sx={{ pt: 2, pb: 3 }}>
                <Typography variant="h6">Please scan QR code</Typography>
                <img src={qr} alt="QR Code for authenticator app" />
                <Typography variant="h6" sx={{ pb: 1 }}>
                  OR
                </Typography>
                <Button
                  endIcon={<OpenInNewIcon />}
                  onClick={() => {
                    window.open(secret.otpauth_url)
                  }}
                  sx={{ textTransform: 'none', fontSize: 17 }}
                >
                  Click this link on your mobile
                </Button>
              </Box>
            )}
          </BasicForm>
        </>
      )}
    </>
  )
}

export default RegisterForm
