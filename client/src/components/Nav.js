import React from 'react'
import PetPalLogo from '../styles/images/PetPalLogo.jpg'

const Nav = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={PetPalLogo} alt="PetPal logo" />
      </div>
      <div className="nav-links">
        <h3 className="nav-link">Sign Up</h3>
        <h3 className="nav-link">Login</h3>
      </div>
    </div>
  )
}

export default Nav