/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import UserCard from './UserCard'
import { getUserId } from '../helpers/auth'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const UserIndex = () => {

  const [users, setusers] = useState([])
  const [hasError, setHasError] = useState(false)

  // state for the filter
  const [filteredResults, setFilteredResults] = useState(null)
  const [scheduleFilterValues, setScheduleFilterValues] = useState([])

  // values to build filters
  const schedule = [
    'weekday - daytimes', 'weekday - evenings', 'weekends', 'holidays or overnight stays'
  ]

  // use effect to get users data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/auth/users/')
        setusers(data)
      } catch (err) {
        console.log(err)
        setHasError(err)
      }
    }
    getData()
  }, [])
  
  // filters data so that only borrowers are displayed
  const borrowers = users.filter(borrower => borrower.account_type === 'borrower' && borrower.id !==  getUserId()).reverse()
  console.log(borrowers)

  // useEffect to filter data
  useEffect(() => {
    const scheduleMatches = scheduleFilterValues.length ? borrowers.filter(borrower => {
      return scheduleFilterValues.some(value => borrower.schedule.some(schedule => schedule.name === value))
    }) : borrowers
    setFilteredResults(scheduleMatches)
  }, [scheduleFilterValues, users])

  // functions for handling the checkboxes
  const handleScheduleChange = (event) => {
    if (scheduleFilterValues.includes(event.target.value)) return setScheduleFilterValues([...scheduleFilterValues.filter(item => item !== event.target.value)])
    return setScheduleFilterValues([...scheduleFilterValues, event.target.value])
  }

  return (
    <Container className="user-index">
      <Row>
        <Col className="sort">
          <h4>Filter</h4>
          <hr />
          <Form>
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
        <Col className="right">
          <Row>
            <h5>{(filteredResults ? filteredResults : borrowers).length} borrowers found</h5>
          </Row>
          {
            borrowers ?
              <Row>
                {(filteredResults ? filteredResults : borrowers).map(borrower => {
                  return <UserCard key={borrower.id} {...borrower} /> 
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

export default UserIndex