/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ImageUploadField } from '../../ImageUploadField'
import Select from 'react-select'
import { getTokenFromLocalStorage } from '../helpers/auth'

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

const RegisterAnimal = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    animal_name: '',
    animal_type: '',
    animal_bio: '',
    animal_age: '',
    activity: [],
    schedule: [],
    animal_image: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('new form data', newFormData)
    setFormData(newFormData)
  }

  const handleMultiChange = (selected, name) => {
    console.log('selected', selected)
    console.log('name', name)
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, animal_image: url })
  }

  console.log('formdata', formData)
  console.log('token', getTokenFromLocalStorage())


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('formData->', formData)
      await axios.post(
        '/api/animals/', 
        formData, 
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      history.push('/borrowers')
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <div className="register-animal">
      <Form onSubmit={handleSubmit}>

        <h2>Register animal</h2>

        <Form.Group className="mb-3" controlId="formAnimalName">
          <Form.Label>What is your pet called?</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Rex" 
            name="animal_name" 
            onChange={handleChange}
            value={formData.animal_name}  
          />
          {/* {errors.first_name && <p className="help is-danger">{errors.first_name.message}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAnimalType">
          <Form.Label>How old is your pet?</Form.Label>
          <Form.Control 
            type="integer" 
            placeholder="0" 
            name="animal_age" 
            onChange={handleChange}
            value={formData.animal_age}
          />
          {/* {errors.last_name && <p className="help is-danger">{errors.last_name.message}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAnimalType">
          <Form.Label>What type of animal is your pet?</Form.Label>
          <Form.Select 
            onChange={handleChange}
            name="animal_type"
          >
            <option> - select an animal - </option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="rabbit">Rabbit</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBioName">
          <Form.Label>Tell us about your pet</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Fido loves barking and chasing sticks" 
            name="animal_bio" 
            onChange={handleChange}
            value={formData.animal_bio}  
          />
          {/* {errors.bio && <p className="help is-danger">{errors.bio.message}</p>} */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formActivity">
          <Form.Label>What activities does your pet need?</Form.Label>
          <Select 
            options={activityOptions}
            isMulti
            name="activity"
            onChange={(selectedActivity) => handleMultiChange(selectedActivity, 'activity')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSchedule">
          <Form.Label>When is your pet available?</Form.Label>
          <Select 
            options={scheduleOptions}
            isMulti
            name="schedule"
            onChange={(selectedSchedule) => handleMultiChange(selectedSchedule, 'schedule')}
          />
        </Form.Group>

        <ImageUploadField
          value={FormData.animal_image}
          name='animal_image'
          handleImageUrl={handleImageUrl}
        />


        <Button variant="secondary" type="submit">
          Submit
        </Button>

      </Form>
    </div>
  )
}

export default RegisterAnimal