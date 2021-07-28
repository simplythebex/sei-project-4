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

  return (
    <Container className="animal-index">
      <Row>
        <Col className="sort">
          <h4>Filter</h4>
          <hr />
          <Form>
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
                      label={`${type}`}
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
                    />
                  </div>

                )
              })}
            </Form.Group>




          </Form>
      
        </Col>
        <Col xs={10}>
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