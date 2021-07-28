import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AnimalCard from './AnimalCard'
import { getUserId } from '../helpers/auth'
import Form from 'react-bootstrap/Form'

const AnimalIndex = () => {

  const [animals, setAnimals] = useState([])
  const [hasError, setHasError] = useState(false)
  const [formData, setFormData] = useState({
    type: [],
    activities: [],
    schedule: [],
  })

  const activities = [
    'exercise', 'company', 'playtime'
  ]

  const animalType = [
    'Cat', 'Dog', 'Rabbit'
  ]

  const schedule = [
    'weekday - daytimes', 'weekday - evenings', 'weekends', 'holidays or overnight stays'
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/animals/')
        setAnimals(data.reverse())
      } catch (err) {
        console.log(err)
        setHasError(err)
      }
    }
    getData()
  }, [])

  const filteredAnimals = animals.filter(filtered => {
    return filtered.owner.id !==  getUserId()
  })

  console.log('filtered animals', filteredAnimals)

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('new form data', newFormData)
    setFormData(newFormData)
  }

  console.log('Form Data', formData)

  // const form = document.querySelector('form')
  // const inputs = form.querySelectorAll('input[type="checkbox"]')

  // console.log('form', form)
  // console.log('inputs', inputs)

  // const filters = {}

  // const updateFilters = (event) => {
  //   const { name, value, checked } = event.target
  //   if (checked) {
  //     if (!filters[name]) {
  //       filters[name] = [value]
  //     } else if (!filters[name].includes(value)) {
  //       filters[name].push(value)
  //     }
  //   } else {
  //     filters[name] = filters[name].filter(val => val !== value)
  //     if (filters[name].length < 1) delete filters[name]
  //   }
  //   filterAnimals()
  // }

  // const filterAnimals = () => {
  //   const filterKeys = Object.keys(filters)
  //   const filteredAnimals = animals.filter(animal => {
  //     let filterMatch = true
  //     filterKeys.forEach(key => {
  //       if (filterMatch) {
  //         let keyMatch = false
  //         animal[key].forEach(keyItem => {
  //           if (filters[key].includes(keyItem)) {
  //             keyMatch = true
  //           }
  //         })
  //         filterMatch = keyMatch
  //       }
  //     })
  //     if (filterMatch) return animal
  //   })
  //   let results = ''
  //   filteredAnimals.forEach(a => results += `${a.name}`)
  //   console.log('results', results)
  // }
  

  return (
    <Container className="animal-index">
      <Row>
        <Col className="sort">
          <h4>Filter</h4>
          <hr />
          <Form id="form">
            <Form.Group>
              <Form.Label>
                <span className="icon"><i className="fas fa-cat"></i></span>Pet type
              </Form.Label>
              {animalType.map(type => {
                return (
                  <div key={`${type}`}>
                    <Form.Check
                      type={'checkbox'}
                      id={`${type}`}
                      label={`${type}`}
                      name={'type'}
                      value={`${type}`}
                      onChange={handleChange}
                    />
                  </div>

                )
              })}
            </Form.Group>
            <hr />

            <Form.Group>
              <Form.Label>
                <span className="icon"><i className="fas fa-bullhorn"></i></span>Activities
              </Form.Label>
              {activities.map(type => {
                return (
                  <div key={`${type}`}>
                    <Form.Check
                      type={'checkbox'}
                      id={`${type}`}
                      name={'activities'}
                      label={`${type}`}
                      value={`${type}`}
                      onChange={handleChange}
                    />
                  </div>

                )
              })}
            </Form.Group>
            <hr />

            <Form.Group>
              <Form.Label>
                <span className="icon"><i className="fas fa-calendar-alt"></i></span>Availability
              </Form.Label>
              {schedule.map(type => {
                return (
                  <div key={`${type}`}>
                    <Form.Check
                      type={'checkbox'}
                      id={`${type}`}
                      label={`${type}`}
                      name={'schedule'}
                      value={`${type}`}
                      onChange={handleChange}
                    />
                  </div>

                )
              })}
            </Form.Group>




          </Form>
      
        </Col>
        <Col xs={10} className="right">
          <Row>
            <h5>{filteredAnimals.length} pets found</h5>
          </Row>
          {filteredAnimals.length > 0 ?
            <Row>
              {filteredAnimals.map(animal => {
                return <AnimalCard key={animal.id} {...animal} /> 
              })}
            </Row>
            :
            <h2>{hasError ? 'Something has gone wrong!' : 'loading... 🐈 🦮 🐇'}</h2>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default AnimalIndex