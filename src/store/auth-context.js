import React, { useState } from 'react'

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem('token')
  const [token, setToken] = useState(initToken)

  const userIsLoggedIn = !!token

  const loginHandler = (token) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const logoutHandler = () => {
    // console.log(token)
    setToken(null)
    // console.log(token)
    localStorage.removeItem('token')
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
