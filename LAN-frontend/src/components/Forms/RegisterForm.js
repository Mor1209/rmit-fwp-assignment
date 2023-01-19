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
  const { registerMutation, registerMfaMutation, qrCode, mfaSecret } =
    useRegister({ setStep })

  const inputFields1 = [
    { label: 'Username', defaultValue: '' },
    { label: 'Email', defaultValue: '' },
    { label: 'Password', defaultValue: '' },
    { label: 'Confirm Password', defaultValue: '' },
  ]
  const inputFields2 = [{ label: 'Token', defaultValue: '' }]

  const onStep1 = data => registerMfaMutation.mutate(data)

  // Step2: user added to db storage upon successfull completion
  const onSubmit = data => registerMutation.mutate(data)

  const formValidation1 = useRegisterValidation(onStep1)
  const formValidation2 = useMfaValidation(onSubmit)

  return (
    <>
      {step === 1 && (
        <BasicForm
          validation={formValidation1}
          inputFieldLabels={inputFields1}
          formName={'Register'}
          submitButtonName={'Next'}
          isLoading={registerMfaMutation.isLoading}
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
            isLoading={registerMutation.isLoading}
          >
            {qrCode && (
              <Box sx={{ pt: 2, pb: 3 }}>
                <Typography variant="h6">Please scan QR code</Typography>
                <img src={qrCode} alt="QR Code for authenticator app" />
                <Typography variant="h6" sx={{ pb: 1 }}>
                  OR
                </Typography>
                <Button
                  endIcon={<OpenInNewIcon />}
                  onClick={() => {
                    window.open(mfaSecret.otpauthUrl)
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
