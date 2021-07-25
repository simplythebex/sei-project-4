import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import UserCard from './UserCard'


const UserIndex = () => {

  const [users, setusers] = useState([])
  const [hasError, setHasError] = useState(false)

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

  const borrowers = users.filter(borrower => borrower.account_type === 'borrower').reverse()

  console.log(borrowers)

  return (
    <Container className="user-index">
      <Row>
        <h5>{borrowers.length} borrowers found</h5>
      </Row>
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
    </Container>
  )
}

export default UserIndex