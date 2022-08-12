import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw Error('useAuthContext is not inside an AuthContextProvider!')
  }

  return authContext
}
