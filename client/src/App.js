import React, { useEffect } from 'react';

import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { loadUserAction } from './Containers/Authentication/LoginPage/action'
import Nav from './Nav'
import LoginPage from './Containers/Authentication/LoginPage'
import WelcomePage from './Containers/WelcomePage'
import HomePage from './Containers/HomePage'
import RegisterPage from './Containers/Authentication/RegisterPage'
import ShoppingCartPage from './Containers/ShoppingCartPage'
import ProfilePage from './Containers/ProfilePage'
import AdminPage from './Containers/AdminPage'
function App() {
  useEffect(() => {
    store.dispatch(loadUserAction())
  }, [loadUserAction])
  return (
    <Provider store={store} >
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/cart" component={ShoppingCartPage} />
            <Route path="/admin" component={AdminPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
