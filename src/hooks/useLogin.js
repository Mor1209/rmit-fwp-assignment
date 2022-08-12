import { verifyUser } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()

  const login = (email, password) => {
    const user = verifyUser(email, password)

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
      `Welcome back ${
        user.name.charAt(0).toUpperCase() + user.name.slice(1)
      } !`,
      false
    )
    navigate('/profile')
  }

  return { login }
}
