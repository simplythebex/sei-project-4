/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ImageUploadField } from '../../ImageUploadField'
import Select from 'react-select'
import { setTokenToLocalStorage } from '../helpers/auth'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const activityOptions = [
  { value: 2, label: 'Company' },
  { value: 3, label: 'Exercise' },
  { value: 1, label: 'Playtime' }
]

const scheduleOptions = [
  { value: 1, label: 'Weekday - daytimes' },
  { value: 2, label: 'Weekday - evenings' },
  { value: 3, label: 'Weekends' },
  { value: 4, label: 'Holidays or overnight stays' }
]

const RegisterBorrower = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    account_type: 'borrower',
    bio: '',
    activity: [],
    schedule: [],
    password: '',
    password_confirmation: '',
    profile_picture: '',
  })

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    account_type: '',
    bio: '',
    activity: [],
    schedule: [],
    password: '',
    password_confirmation: '',
    profile_picture: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    console.log('new form data', newFormData)
    setFormData(newFormData)
    setErrors(newErrors)
    if (event.target.name === 'email' || event.target.name === 'password') {
      const newLoginFormData = { ...loginFormData, [event.target.name]: event.target.value }
      console.log('new', newLoginFormData)
      setLoginFormData(newLoginFormData)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('formData->', formData)
      await axios.post('/api/auth/register/', formData)
      const { data } = await axios.post('/api/auth/login/', loginFormData)
      setTokenToLocalStorage(data.token)
      history.push('/animals')
    } catch (err) {
      console.log('err.response', err.response)
      setErrors(err.response.data.errors)
    }
    // console.log('errors', errors)
  }

  const handleMultiChange = (selected, name) => {
    console.log('selected', selected)
    console.log('name', name)
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profile_picture: url })
  }

  console.log('formdata', formData)
  console.log('loginformdata', loginFormData)

  return (
    <div className="login-register-form">
      <h2>I am a Borrower</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>What is your email address?</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="email@email.com" 
            name="email" 
            onChange={handleChange}
            value={formData.email}
          />
          {/* {errors.email && <p className="help is-danger">{errors.email.message}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Choose a username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="username" 
            name="username" 
            onChange={handleChange}
            value={formData.username}
          />
          {/* {errors.username && <p className="help is-danger">{errors.username.message}</p>} */}
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Your first name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Jane" 
                name="first_name" 
                onChange={handleChange}
                value={formData.first_name}  
              />
              {/* {errors.first_name && <p className="help is-danger">{errors.first_name.message}</p>} */}
            </Form.Group>
          
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Doe" 
                name="last_name" 
                onChange={handleChange}
                value={formData.last_name}
              />
              {/* {errors.last_name && <p className="help is-danger">{errors.last_name.message}</p>} */}
            </Form.Group>
          </Col>

        </Row>

        <Form.Group className="mb-3" controlId="formBioName">
          <Form.Label>Tell us about yourself</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="I love cats..." 
            name="bio" 
            onChange={handleChange}
            value={formData.bio}  
          />
          {/* {errors.bio && <p className="help is-danger">{errors.bio.message}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formActivity">
          <Form.Label>Activities</Form.Label>
          <Select 
            options={activityOptions}
            isMulti
            name="activity"
            onChange={(selectedActivity) => handleMultiChange(selectedActivity, 'activity')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSchedule">
          <Form.Label>Schedule</Form.Label>
          <Select 
            options={scheduleOptions}
            isMulti
            name="schedule"
            onChange={(selectedSchedule) => handleMultiChange(selectedSchedule, 'schedule')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Choose a password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="password" 
            name="password" 
            onChange={handleChange}
            value={formData.password}
          />
          {/* {errors.password && <p className="help is-danger">{errors.password.message}</p>} */}
        </Form.Group> 

        <Form.Group className="mb-3" controlId="formPasswordConfirmation">
          <Form.Label>Please confirm your password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="password" 
            name="password_confirmation" 
            onChange={handleChange}
            value={formData.password_confirmation}  
          />
          {/* {errors.password_confirmation && <p className="help is-danger">{errors.password_confirmation.message}</p> */}
        </Form.Group> 


        <ImageUploadField
          value={FormData.profile_pictue}
          name='profile_picture'
          handleImageUrl={handleImageUrl}
        />


        <Button variant="secondary" type="submit">
          Submit
        </Button>

      </Form>
    </div>
  )
}

export default RegisterBorrower
