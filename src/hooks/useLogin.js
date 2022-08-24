import { verifyUser } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import capitalize from '../helpers/capitalize'

export const useLogin = () => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()

  const login = (email, password, token) => {
    const user = verifyUser(email, password, token)

    if (!user) {
      sendNotification('error', 'Wrong credentials !')
      return
    }

    dispatchAuth({
      type: 'LOGIN',
      user,
    })
    sendNotification(
      'success',
      `Welcome back ${capitalize(user.name)} !`,
      false
    )
    navigate('/profile')
  }

  return { login }
}
