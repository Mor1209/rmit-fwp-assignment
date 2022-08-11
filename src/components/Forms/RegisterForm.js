import { useRegister } from '../../hooks/useRegister'
import { useRegisterValidation } from '../../hooks/useUserValidation'
import BasicForm from './BasicForm'

export const RegisterForm = () => {
  const inputFieldLabels = ['Name', 'Email', 'Password', 'Confirm Password']
  const { register } = useRegister()
  const onSubmit = data => register(data.name, data.email, data.password)
  const validation = useRegisterValidation(onSubmit)

  return (
    <BasicForm
      validation={validation}
      inputFieldLabels={inputFieldLabels}
      formName={'Register'}
    />
  )
}

export default RegisterForm
