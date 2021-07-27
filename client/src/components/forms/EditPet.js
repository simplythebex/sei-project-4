import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/esm/Button'
import Select from 'react-select'
import { ImageUploadField } from '../../ImageUploadField'

const EditPet = () => {

  const { id } = useParams()
  const history = useHistory()
  
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

  const [formData, setFormData] = useState({
    animal_name: '',
    animal_type: '',
    animal_bio: '',
    animal_age: '',
    activity: [],
    schedule: [],
    animal_image: '',
  })

  const [errors, setErrors] = useState({
    animal_name: '',
    animal_type: '',
    animal_bio: '',
    animal_age: '',
    activity: [],
    schedule: [],
    animal_image: '',
  })

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/animals/${id}/`)
      setFormData(data)
      console.log('data', data)
    }
    getData()
  }, [id])

  console.log('form data', formData)

  const handleChange = (event) => {
    const updatedFormData = { ...formData, [event.target.name]: event.target.value }
    const newErrors = { ...errors, [event.target.name]: '' }
    setFormData(updatedFormData)
    setErrors(newErrors)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`/api/animals/${id}/`, formData, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      history.push('/pet-profile')
    } catch (err) {
      console.log('error response', err.response)
      setErrors(err.response.data.errors)
    }
  }
  console.log('errors', errors)

  const handleImageUrl = url => {
    setFormData({ ...formData, image: url })
  }

  const handleMultiChange = (selected, name) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
  }

  return (
    <div className="register-animal">
      <Form onSubmit={handleSubmit}>

        <h2>Edit pet</h2>

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
            <option value="rabbit">Rebbit</option>
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


        <Button varient="light" type="submit">
          Submit
        </Button>

      </Form>
    </div>
    
  )
}

export default EditPet