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
  }, [id])

  const handleClick = () => {
    handleShow()
  }

  console.log('requests', requests)

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
              <ul>
                <li>{animal.animal_type}</li>
                <li>{animal.animal_age} years old</li>
                <li>{animal.animal_name} needs {animal.activity.map(act => act.name)} on {animal.schedule.map(sch => sch.name)}</li>
              </ul>
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