import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage, getUserId } from '../helpers/auth'
import Row from 'react-bootstrap/Row'

const Requests = () => {

  const [userProfile, setUserProfile] = useState(null)
  const [errors, setErrors] = useState(false)

  // gets the users profile
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get(`api/auth/users/${getUserId()}/`,
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          }
        )
        setUserProfile(data)
        console.log('data', data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getCurrentUser()
  }, [])

  console.log('userprofile', userProfile)

  const [requests, setRequests] = useState(null)
  const [requestErrors, setRequestErrors] = useState(false)

  // gets the requests
  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data } = await axios.get('api/requests/',
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          }
        )
        setRequests(data)
        console.log('req data', data)
      } catch (err) {
        console.log(err)
        setRequestErrors(true)
      }
    }
    getRequests()
  }, [])
  
  console.log('requests', requests)

  return (
    <>
      <h1>Requests here</h1>
      <>
        {
          requests && 
      requests.map(request => {
        return (
          <Row key={request.id}>
            <h2>{request.created_at}</h2>
          </Row>
        )
      })
        }
      </>
    </>
  )
}

export default Requests