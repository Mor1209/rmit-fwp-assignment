import { addUser, userExists } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()

  const register = (name, email, password, secretkey) => {
    console.log('register')
    console.log(name)
    console.log(email)
    const user = addUser(name, email, password, secretkey.ascii)

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

  const validate = (name, email, password) => {
    const user = userExists(email)

    if (user) {
      sendNotification('error', 'User with email already exists !')
      return
    }

    return true
  }

  return { register, validate }
}
