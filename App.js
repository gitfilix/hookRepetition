import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients'
import Auth from './components/Auth'
// named import
import { AuthContext } from './context/auth-context'


const App = props => {
  // listen to context by using this
  const authContext = useContext(AuthContext)
  // not authenticated: defalut: Auth component
  let appContent = <Auth />
  // if authenticated -> load ingrediaents
  if (authContext.isAuth) {
    appContent = <Ingredients />
  }
  
  return appContent;
};

export default App;
