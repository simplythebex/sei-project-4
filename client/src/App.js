import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import RegisterBorrower from './components/auth/RegisterBorrower'
import RegisterOwner from './components/auth/RegisterOwner'

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/registerborrower">
          <RegisterBorrower />
        </Route>
        <Route path="/registerowner">
          <RegisterOwner />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>  
  )
}

export default App
