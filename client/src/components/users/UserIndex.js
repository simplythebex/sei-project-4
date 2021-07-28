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

  const schedule = [
    'weekday - daytimes', 'weekday - evenings', 'weekends', 'holidays or overnight stays'
  ]

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
  
  console.log('users on state', users)

  const borrowers = users.filter(borrower => borrower.account_type === 'borrower' && borrower.id !==  getUserId()).reverse()

  console.log(borrowers)

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
                    />
                  </div>

                )
              })}
            </Form.Group>
          </Form>
      
        </Col>
        <Col>
          <h5>{borrowers.length} borrowers found</h5>
          <Row>
            {borrowers.length > 0 ?
              <Row>
                {borrowers.map(borrower => {
                  return <UserCard key={borrower.id} {...borrower} /> 
                })}
              </Row>
              :
              <h2>{hasError ? 'Something has gone wrong!' : 'loading... 🐈 🦮 🐇'}</h2>
            }
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default UserIndex