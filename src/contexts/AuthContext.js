import { createContext, useEffect, useReducer } from 'react';

const defaultAuthState = {
  isAuth: false,
  user: {},
};

export const AuthContext = createContext({
  ...defaultAuthState,
  register: user => {},
  login: user => {},
  logout: () => {},
});

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      localStorage.setItem('user', JSON.stringify(action.user));
      return { isAuth: true, user: action.user };
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.user));
      return { isAuth: true, user: action.user };
    case 'LOGOUT':
      localStorage.setItem('user', JSON.stringify(defaultAuthState.user));
      return defaultAuthState;
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatchAuth] = useReducer(authReducer, defaultAuthState);

  console.log(authState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    user && dispatchAuth({ type: 'LOGIN', user });
  }, []);

  const register = user => {
    dispatchAuth({
      type: 'REGISTER',
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  };

  const login = user => {
    dispatchAuth({
      type: 'LOGIN',
      user,
    });
  };

  const logout = () => {
    dispatchAuth({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
