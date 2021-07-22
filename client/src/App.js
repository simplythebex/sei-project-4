import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>  
  )
}

export default App
