import React, { useState } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SendRequest = ({ id, name, handleClose }) => {

  const [formData, setFormData] = useState({
    request_status: 'pending',
    message: '',
    animal: id,
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('new form data', newFormData)
    setFormData(newFormData)
  }

  console.log('formdata', formData)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('formData->', formData)
      await axios.post(
        '/api/requests/', 
        formData, 
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      console.log('submitted')
      handleClose()
    } catch (err) {
      console.log('err', err.response)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Add a message to your request: </Form.Label>
          <Form.Control 
            type="textarea"
            name='message'
            placeholder={`Please could I play with ${name} on Tuesday?`}
            onChange={handleChange}
            value={formData.message}
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Send Request
        </Button>
      </Form>
    </>
  )
}

export default SendRequest