import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients'
import Auth from './components/Auth'
// named import
import { AuthContext } from './context/auth-context'


const App = props => {
  const authContext = useContext(AuthContext)
  // not authenticated
  let appContent = <Auth />
  
  if (authContext.isAuth) {
    appContent = <Ingredients />
  }
  
  return appContent;
};

export default App;
