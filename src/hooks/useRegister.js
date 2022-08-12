import { addUser } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()

  const register = (name, email, password) => {
    const user = addUser(name, email, password)

    if (!user) {
      sendNotification('error', 'User with email already exists !')
      return
    }

    dispatchAuth({
      type: 'REGISTER',
      user,
    })
    sendNotification(
      'success',
      `Welcome ${user.name.charAt(0).toUpperCase() + user.name.slice(1)} !`,
      false
    )
    navigate('/profile')
  }

  return { register }
}
