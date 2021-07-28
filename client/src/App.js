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
import RegisterAnimal from './components/forms/RegisterAnimal'
import ShowUserProfile from './components/userProfile/ShowUserProfile'
import ShowPetProfile from './components/userProfile/ShowPetProfile'
import EditPet from './components/forms/EditPet'
import Requests from './components/userProfile/Requests'

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/edit-animal/:id">
          <EditPet />
        </Route>
        <Route path="/borrowers/:id">
          <UserShow />
        </Route>
        <Route path="/animals/:id">
          <AnimalShow />
        </Route>
        <Route path="/requests">
          <Requests />
        </Route>
        <Route path="/pet-profile">
          <ShowPetProfile />
        </Route>
        <Route path="/profile">
          <ShowUserProfile />
        </Route>
        <Route path="/register-animal">
          <RegisterAnimal />
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
