import { useLogin } from '../../hooks/useLogin'
import BasicForm from './BasicForm'
import { useLoginValidation } from '../../hooks/useUserValidation'

export const LoginForm = () => {
  const inputFieldLabels = ['Email', 'Password']
  const { login } = useLogin()
  const onSubmit = data => login(data.email, data.password)
  const validation = useLoginValidation(onSubmit)

  return (
    <BasicForm
      validation={validation}
      inputFieldLabels={inputFieldLabels}
      formName={'Login'}
    />
  )
}

export default LoginForm
