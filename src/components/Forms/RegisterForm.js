import { useState } from 'react'
import { useRegister } from '../../hooks/useRegister'
import {
  useMfaValidation,
  useRegisterValidation,
} from '../../hooks/useUserValidation'
import BasicForm from './BasicForm'

export const RegisterForm = () => {
  const [step, setStep] = useState(1)
  const { validate, register, qr } = useRegister()
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
  const onSubmit = data => {
    register(data.token)
  }

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
            {qr && <img src={qr} alt="QR Code for authenticator app" />}
          </BasicForm>
        </>
      )}
    </>
  )
}

export default RegisterForm
