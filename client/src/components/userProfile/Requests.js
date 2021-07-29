import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage, getUserId } from '../helpers/auth'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const Requests = () => {

  const [userAnimal, setUserAnimal] = useState(null)
  const [errors, setErrors] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [requests, setRequests] = useState(null)
  const [requestErrors, setRequestErrors] = useState(false)
  const [filteredRequests, setFilteredRequests] = useState(null)
  const [updatedReq, setUpdatedReq] = useState(null)

  // gets the users profile
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get(`api/auth/users/${getUserId()}/`,
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          }
        )
        setCurrentUser(data.id)
        const id = data.animals.map(animal => {
          return animal.id
        })
        setUserAnimal(id[0])
        console.log('user id', id)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getCurrentUser()
  }, [])

  // gets the requests
  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data } = await axios.get('api/requests/',
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          }
        )
        setRequests(data.reverse())
      } catch (err) {
        console.log(err)
        setRequestErrors(true)
      }
    }
    if (currentUser) getRequests()
  }, [currentUser])

  console.log('requests', requests)

  // filters the requests to show only those belonging to the current user
  useEffect(() => {
    const filterRequests = () => {
      const filteredReq = requests.filter(request => {
        return request.animal.owner === currentUser
      })
      setFilteredRequests(filteredReq)
    }
    if (requests && currentUser) filterRequests()
  }, [requests, currentUser])

  const handleButton = async (value, requestId) => {
    const { data: requestToUpdate } = await axios.get(`/api/requests/${requestId}`)
    const updatedObject = { ...requestToUpdate, request_status: value }
    try {
      await axios.put(`/api/requests/${requestId}/`, updatedObject, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Container className="request-page">
        <h3>Your Requests</h3>
        <Accordion className="accordion">
          <>
            {
              filteredRequests && filteredRequests.map(request => {
                return (
                  <Accordion.Item key={request.id} eventKey={request.id}>
                    <Accordion.Header className="accordion-header">
                      <img src={request.owner.profile_picture} alt={request.owner.username} />
                      <div>
                        <h5>{request.owner.first_name}</h5>
                        <p>Request for: {request.animal.animal_name}</p>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="accordion-body">
                      <div className="content">
                        <div className="left">
                          <p className="time">{(new Date(String(request.created_at)).toLocaleString()).slice(0, 10)}</p>
                        </div>
                        <p>{request.message}</p>
                      </div>
                      {
                        request.request_status === 'pending'
                          ?
                          <div className="buttons">
                            <Button variant="success" onClick={() => handleButton('accepted', request.id)}>Accept Request</Button>
                            <Button variant="danger" onClick={() => handleButton('declined', request.id)}>Decline Request</Button>
                          </div>
                          :
                          <div className={request.request_status}>
                            <p>{request.request_status}</p>
                          </div>
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                )
              })
            }
          </>
        </Accordion>
      </Container>
    </>
  )
}

export default Requests