import React from 'react'
import PetPalLogo from '../../styles/images/PetPalLogo.jpg'

const Nav = () => {
  return (
    <div className="navbar">
      <a href="/">
        <div className="nav-logo">
          <img src={PetPalLogo} alt="PetPal logo" />
        </div>
      </a>
      <div className="nav-links">
        <h3 className="nav-link">Login</h3>
      </div>
    </div>
  )
}

export default Nav