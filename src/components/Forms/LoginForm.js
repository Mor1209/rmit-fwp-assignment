import { useLogin } from '../../hooks/useLogin'
import BasicForm from './BasicForm'
import { useLoginValidation } from '../../hooks/useUserValidation'

export const LoginForm = () => {
  const inputFields = [
    { label: 'Email', defaultValue: '' },
    { label: 'Password', defaultValue: '' },
  ]
  const { login } = useLogin()
  const onSubmit = data => login(data.email, data.password)
  const validation = useLoginValidation(onSubmit)

  return (
    <BasicForm
      validation={validation}
      inputFieldLabels={inputFields}
      formName={'Login'}
    />
  )
}

export default LoginForm
