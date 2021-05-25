import React, { useState } from 'react'

// named export
export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {}
})

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const loginHandler = () => {
    setIsAuthenticated(true)
  }

  // allow everything below to get access to AuthContext for every component listening 
  return (
    <AuthContext.Provider 
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider