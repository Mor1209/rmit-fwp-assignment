import { useRegister } from '../../hooks/useRegister'
import { useRegisterValidation } from '../../hooks/useUserValidation'
import BasicForm from './BasicForm'

export const RegisterForm = () => {
  const inputFields = [
    { label: 'Name', defaultValue: '' },
    { label: 'Email', defaultValue: '' },
    { label: 'Password', defaultValue: '' },
    { label: 'Confirm Password', defaultValue: '' },
  ]
  const { register } = useRegister()
  const onSubmit = data => register(data.name, data.email, data.password)
  const validation = useRegisterValidation(onSubmit)

  return (
    <BasicForm
      validation={validation}
      inputFieldLabels={inputFields}
      formName={'Register'}
    />
  )
}

export default RegisterForm
