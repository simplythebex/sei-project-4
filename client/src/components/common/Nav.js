import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import PetPalLogo from '../../styles/images/PetPalLogo.jpg'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { getPayload, getTokenFromLocalStorage, userIsAuthenticated } from '../helpers/auth'

const Nav = () => {

  const history = useHistory()
  const location = useLocation()

  const [userProfile, setUserProfile] = useState()
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        if (!payload) return 
        const currentUserId = payload.sub
        const { data } = await axios.get(`api/auth/users/${currentUserId}`,
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          }
        )
        setUserProfile(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getCurrentUser()
  }, [])

  console.log(userProfile)

  useEffect(() => {
  }, [location.pathname])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleFocus = () => {
    setError(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      history.push('/animals')
      setShow(false)
      console.log('response', data)
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  // Logout user
  const handleLogout = () => {
    window.localStorage.removeItem('token')
    console.log('logging out')
    history.push('/')
  }

  return (
    <div className="nav-container">
      <div className="navbar">
        <a href="/">
          <div className="nav-logo">
            <img src={PetPalLogo} alt="PetPal logo" />
          </div>
        </a>
        <div className="nav-links">
          {!userIsAuthenticated() ? 
            <>
              <Button variant="secondary" onClick={handleShow}>
                Login
              </Button>

              <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Login</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control 
                        name="email"
                        type="email" 
                        placeholder="user@email.com" 
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        name="password"
                        type="password" 
                        placeholder="password" 
                        value={formData.password}
                        onChange={handleChange}
                        nFocus={handleFocus}
                      />
                    </Form.Group>
                    {error && <p className="help is-danger">Sorry your username or password are incorrect</p>}

                    <Button variant="secondary" type="submit">Login</Button>
                  </Form>
                </Offcanvas.Body>
              </Offcanvas>
            </>
            :
            <>
              <Link to="/animals">
                <h3 className="nav-link">Find a pet</h3>
              </Link>
              <Link to="/borrowers">
                <h3 className="nav-link">Find a borrower</h3>
              </Link>
              {
                userProfile ? 
                  <>
                    <Link to="/profile">
                      <img src={userProfile.profile_picture} alt={userProfile.username} />
                    </Link>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary-light" id="dropdown-basic">
                        {userProfile.first_name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/profile">My profile</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                  : 
                  <div></div>
              }
            </>
          } 
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Nav