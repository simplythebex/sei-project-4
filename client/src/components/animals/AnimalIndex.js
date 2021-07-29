/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AnimalCard from './AnimalCard'
import Form from 'react-bootstrap/Form'

const AnimalIndex = () => {

  const [animals, setAnimals] = useState([])
  const [hasError, setHasError] = useState(false)

  // state for the filters
  const [filteredResults, setFilteredResults] = useState(null)
  const [typeFilterValues, setTypeFilterValues] = useState([])
  const [activityFilterValues, setActivityFilterValues] = useState([])
  const [scheduleFilterValues, setScheduleFilterValues] = useState([])

  // values used to build filters
  const activities = [
    'exercise', 'company', 'playtime'
  ]
  const animalType = [
    'Cat', 'Dog', 'Rabbit'
  ]
  const schedule = [
    'weekday - daytimes', 'weekday - evenings', 'weekends', 'holidays or overnight stays'
  ]

  // useEffect to get the animal data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/animals/')
        setAnimals(data.reverse())
        console.log('DATA', data)
      } catch (err) {
        console.log(err)
        setHasError(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    // this useeffect handles the filtering
    // when a value to filter by is added to state this useeffect is triggered
    // it works like a waterfall effect, filtering by type first
    // 2nd filter runs on the result of the first one and carries on for each filter value
    const typeMatches = typeFilterValues.length ? animals.filter(animal => {
      return typeFilterValues.some(value => animal.animal_type === value)
    }) : animals
    const activityMatches = activityFilterValues.length ? typeMatches.filter(animal => {
      return activityFilterValues.some(value => animal.activity.some(activity => activity.name === value))
    }) : typeMatches
    const scheduleMatches = scheduleFilterValues.length ? activityMatches.filter(animal => {
      return scheduleFilterValues.some(value => animal.schedule.some(schedule => schedule.name === value))
    }) : activityMatches
    // set filtered results to state
    setFilteredResults(scheduleMatches)
  }, [typeFilterValues, activityFilterValues, scheduleFilterValues, animals])
  
  // 3 functions to handle the different type of checkboxes
  // first checks if that filter value already exists on state
  // if it does then it removes it from the array on state
  // if it doesn't then it adds the new filter value to the array on state
  const handleTypeChange = (event) => {
    if (typeFilterValues.includes(event.target.value)) return setTypeFilterValues([...typeFilterValues.filter(item => item !== event.target.value)])
    return setTypeFilterValues([...typeFilterValues, event.target.value])
  }
  const handleActivityChange = (event) => {
    if (activityFilterValues.includes(event.target.value)) return setActivityFilterValues([...activityFilterValues.filter(item => item !== event.target.value)])
    return setActivityFilterValues([...activityFilterValues, event.target.value])
  }
  const handleScheduleChange = (event) => {
    if (scheduleFilterValues.includes(event.target.value)) return setScheduleFilterValues([...scheduleFilterValues.filter(item => item !== event.target.value)])
    return setScheduleFilterValues([...scheduleFilterValues, event.target.value])
  }
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
                      onChange={handleTypeChange}
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
                      name={'activity'}
                      label={`${type}`}
                      value={`${type}`}
                      onChange={handleActivityChange}
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
                      onChange={handleScheduleChange}
                    />
                  </div>
                )
              })}
            </Form.Group>
          </Form>
        </Col>
        <Col xs={10} className="right">
          <Row>
            <h5>{(filteredResults ? filteredResults : animals).length} pets found</h5>
          </Row>
          {animals ?
            <Row>
              {(filteredResults ? filteredResults : animals).map(animal => {
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