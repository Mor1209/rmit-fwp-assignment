import { useState } from 'react'
import { useRegister } from '../../hooks/useRegister'
import { useRegisterValidation } from '../../hooks/useUserValidation'
import BasicForm from './BasicForm'
import MfaForm from './MfaForm'

export const RegisterForm = () => {
  const [step, setStep] = useState(1)
  const { validate, register } = useRegister()
  const [registerDetails, setRegisterDetails] = useState({})

  const onStep1 = data => {
    if (validate(data.name, data.email, data.password)) {
      setStep(2)
      setRegisterDetails({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    }
  }
  const validationStep1 = useRegisterValidation(onStep1)
  // const validationStep2 = data => {
  //   register(...registerDetails, data.secretkey, data.token)
  // }

  const inputFields = [
    { label: 'Name', defaultValue: '' },
    { label: 'Email', defaultValue: '' },
    { label: 'Password', defaultValue: '' },
    { label: 'Confirm Password', defaultValue: '' },
  ]

  return (
    <>
      {step === 1 && (
        <BasicForm
          validation={validationStep1}
          inputFieldLabels={inputFields}
          formName={'Register'}
        />
      )}
      {step === 2 && (
        <MfaForm
          register={true}
          registerDetails={registerDetails}
          formName={'Add MFA'}
        />
      )}
    </>
  )
}

export default RegisterForm
