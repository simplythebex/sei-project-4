import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ImageUploadField } from '../../ImageUploadField'

const RegisterBorrower = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    account_type: '',
    bio: '',
    activities: [],
    schedule: [],
    password: '',
    password_confirmation: '',
    profile_image: '',
  })

  // const [errors, setErrors] = useState({
  //   email: '',
  //   username: '',
  //   first_name: '',
  //   last_name: '',
  //   account_type: '',
  //   bio: '',
  //   activities: [],
  //   schedule: [],
  //   password: '',
  //   password_confirmation: '',
  //   profile_image: '',
  // })

  const handleImageUrl = url => {
    setFormData({ ...FormData, profile_picture: url })
  }

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    // const newErrors = { ...errors, [event.target.name]: '' }
    setFormData(newFormData)
    // setErrors(newErrors)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('formData->', formData)
      await axios.post('/api/auth/register/', formData)
      history.push('/')
    } catch (err) {
      console.log('error response', err.response.data.errors)
      console.log('err.response', err.response)
      // setErrors(err.response.data.errors)
    }

    // console.log('errors', errors)
  }

  return (
    <div className="login-register-form">
      <h1>I am a Borrower</h1>
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
          {/* {errors.email && <p className="help is-danger">{errors.email}</p>} */}
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
          {/* {errors.username && <p className="help is-danger">{errors.username}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>Your first name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Jane" 
            name="first_name" 
            onChange={handleChange}
            value={formData.first_name}  
          />
          {/* {errors.first_name && <p className="help is-danger">{errors.first_name}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Your last name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Doe" 
            name="last_name" 
            onChange={handleChange}
            value={formData.last_name}
          />
          {/* {errors.last_name && <p className="help is-danger">{errors.last_name}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBioName">
          <Form.Label>Tell us about yourself</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="I love cats..." 
            name="bio" 
            onChange={handleChange}
            value={formData.bio}  
          />
          {/* {errors.bio && <p className="help is-danger">{errors.bio}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formactivities">
          <Form.Label>Activities</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="activities" 
            name="activities" 
            onChange={handleChange}
            value={formData.activities}
          />
          {/* {errors.activities && <p className="help is-danger">{errors.activities}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSchedule">
          <Form.Label>Schedule</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="schedule" 
            name="schedule" 
            onChange={handleChange}
            value={formData.schedule}  
          />
          {/* {errors.schedule && <p className="help is-danger">{errors.schedule}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAccountType">
          <Form.Label>Account type</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="account type" 
            name="account_type" 
            onChange={handleChange}
            value={formData.account_type}
          />
          {/* {errors.password && <p className="help is-danger">{errors.password}</p>} */}
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
          {/* {errors.password && <p className="help is-danger">{errors.password}</p>} */}
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
          {/* {errors.password_confirmation && <p className="help is-danger">{errors.password_confirmation}</p>} */}
        </Form.Group>

        <ImageUploadField
          value={FormData.profile_pictue}
          name='profile_picture'
          handleImageUrl={handleImageUrl}
        />


        <Button varient="light" type="submit">
          Submit
        </Button>

      </Form>
    </div>
  )
}

export default RegisterBorrower