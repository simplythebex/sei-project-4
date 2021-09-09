/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import SendRequest from '../forms/SendRequest'
import { getUserId } from '../helpers/auth'

const AnimalShow = () => {

  const [animal, setAnimal] = useState(null)
  const [errors, setErrors] = useState(false)
  const [requests, setRequests] = useState(null)
  const [requestErrors, setRequestErrors] = useState(null)
  const [show, setShow] = useState(false)
  const [userProfile, setUserProfile] = useState()
  const [userErrors, setUserErrors] = useState(false)
  const { id } = useParams()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  console.log(id)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/animals/${id}/`)
        setAnimal(data)
        console.log('data', data)
        const filteredReq = data.requests.filter(req => {
          return req.owner.id === getUserId()
        })
        if (filteredReq.length < 1) {
          setRequests('none')
        } else {
          setRequests(filteredReq)
        }
        const requestStatus = filteredReq.map(status => {
          return status.request_status
        })
        console.log(requestStatus)

      } catch (err) {
        console.log(err)
        setErrors(true)
        setRequestErrors(true)
      }
    }
    getData()
  }, [id, requests])

  const handleClick = () => {
    handleShow()
  }

  console.log('requests', requests)

  // gets the users profile data
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await axios.get(`api/auth/users/${getUserId()}/`,
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          }
        )
        setUserProfile(data)
      } catch (err) {
        console.log(err)
        setUserErrors(true)
      }
    }
    getCurrentUser()
  }, [location.pathname])

  return (
    <Container className="animal-show">
      {animal ?
        <div className="animal-card">
          <div className="left-side">
            <Card.Img src={animal.animal_image} /> 
          </div>
          <div className="right-side">
            <h3>{animal.animal_name}</h3>
            <hr />
            <div className="information">
              {animal.animal_bio}
              <hr />
              <div className="data">
                <div className="info">
                  <p><span className="icon"><i className="fas fa-paw"></i></span>{animal.animal_type}</p>
                </div>
                <div className="info">
                  <p><span className="icon"><i className="fas fa-bone"></i></span>{animal.animal_age} years old</p>
                </div>
                <div className="info">
                  <p><span className="icon"><i className="fas fa-bullhorn"></i></span>{animal.animal_name} needs: </p>
                  {
                    animal.activity.map((act, index) => <div key={index} className="activity">{act.name}</div>)
                  }
                </div>
                <div className="info">
                  <p><span className="icon"><i className="fas fa-calendar-alt"></i></span>Available on:</p>
                  {
                    animal.schedule.map((sch, index) => <div key={index} className="schedule">{sch.name}</div>)
                  }
                </div>
              </div>
              <hr />
              <div className="request">
                <div className="owner">
                  <img className="profile-image" src={animal.owner.profile_picture} alt={animal.owner.username} />
                  Owned by {animal.owner.first_name}
                </div>
                {(requests !== 'none') ? 
                  <>
                    { 
                      requests &&
                    <div className="req-status"><span className="icon"><i className="fas fa-paper-plane"></i></span>Request {requests.map(req => {
                      return req.request_status
                    })}</div>
                    }
                  </>
                  :
                  <Button variant="secondary" onClick={handleClick}>Send {animal.owner.first_name} a request</Button>
                }
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Send a request to {animal.owner.first_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SendRequest 
                id = { animal.id }
                name = { animal.animal_name }
                handleClose = { handleClose }
              />
            </Modal.Body>

          </Modal>
        </div>
        : <h2>{errors || requestErrors ? 'Something has gone wrong!' : 'loading... 🐈 🦮 🐇'}</h2>
      }

    </Container>
  )
}

export default AnimalShow