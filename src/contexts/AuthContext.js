import { createContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyUser, getUser, removeUser } from '../data/users'

const defaultAuthState = {
  isAuth: false,
  user: {},
}

export const AuthContext = createContext({
  ...defaultAuthState,
  register: user => {},
  login: user => {},
  logout: () => {},
})

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return { isAuth: true, user: action.user }
    case 'LOGIN':
      return { isAuth: true, user: action.user }
    case 'LOGOUT':
      return defaultAuthState
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const user = getUser()
  const initialState =
    user && verifyUser(user.email, user.password)
      ? { isAuth: true, user }
      : defaultAuthState
  const [authState, dispatchAuth] = useReducer(authReducer, initialState)
  const navigate = useNavigate()

  const logout = () => {
    removeUser()
    dispatchAuth({
      type: 'LOGOUT',
    })
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ ...authState, dispatchAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
