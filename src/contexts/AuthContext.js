import { createContext, useReducer } from 'react';

const defaultAuthState = {
  isAuth: false,
  user: null,
};

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      state = { ...state, isAuth: true, user: action.user };
      localStorage.setItem('user-auth', JSON.stringify(state));
      return state;
    case 'LOGIN':
      state = { ...state, isAuth: true, user: action.user };
      localStorage.setItem('user-auth', JSON.stringify(state));
      return state;
    case 'LOGOUT':
      localStorage.setItem('user-auth', JSON.stringify(defaultAuthState));
      return defaultAuthState;
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, defaultAuthState);

  console.log(authState);

  return (
    <AuthContext.Provider value={{ ...authState, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
