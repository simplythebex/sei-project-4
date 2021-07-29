import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage, getUserId } from '../helpers/auth'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const Requests = () => {

  const [userAnimal, setUserAnimal] = useState(null)
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

  console.log('userAnimal', userAnimal)

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
        setRequests(data.reverse().filter(req => {
          return req.animal.id === userAnimal
        }))
      } catch (err) {
        console.log(err)
        setRequestErrors(true)
      }
    }
    getRequests()
  }, [userAnimal])

  console.log('requests', requests)

  // edit the request status on button click 

  // const [updatedRequest, setUpdatedRequest] = useState({
  //   request_status: '',
  //   message: '',
  //   animal: '',
  // })

  // const handleAccept = async (id) => {
  //   try {
  //     const updatedFormData = { ...updatedRequest, request_status: 'accepted' }
  //     setUpdatedRequest(updatedFormData)
  //     await axios.put(`/api/requests/${id}/`, updatedRequest, {
  //       headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
  //     })
  //   } catch (err) {
  //     console.log('error response', err.response)
  //     setErrors(err.response.data.errors)
  //   }
  // }

  return (
    <>
      <Container className="request-page">
        <h3>Your Requests</h3>
        <Accordion className="accordion">
          <>
            {
              requests && 
          
      requests.map(request => {
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
                    {/* <Button variant="success" onClick={handleAccept(request.id)}>Accept Request</Button> */}
                    {/* <Button variant="danger" onClick={handleDecline}>Decline Request</Button> */}
                  </div>
                  :
                  <div className="accepted">
                    <p>Accepted</p>
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