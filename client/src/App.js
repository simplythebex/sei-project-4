import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import RegisterBorrower from './components/auth/RegisterBorrower'
import RegisterOwner from './components/auth/RegisterOwner'
import AnimalIndex from './components/animals/AnimalIndex'
import AnimalShow from './components/animals/AnimalShow'
import UserIndex from './components/users/UserIndex'
import UserShow from './components/users/UserShow'

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/borrowers/:id">
          <UserShow />
        </Route>
        <Route path="/animals/:id">
          <AnimalShow />
        </Route>
        <Route path="/registerborrower">
          <RegisterBorrower />
        </Route>
        <Route path="/registerowner">
          <RegisterOwner />
        </Route>
        <Route path="/borrowers">
          <UserIndex />
        </Route>
        <Route path="/animals">
          <AnimalIndex />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>  
  )
}

export default App
