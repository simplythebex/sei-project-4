import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const AnimalShow = () => {

  const [animal, setAnimal] = useState(null)
  const [errors, setErrors] = useState(false)
  const { id } = useParams()

  console.log(id)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/animals/${id}/`)
        setAnimal(data)
        console.log('data', data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getData()
  }, [id])

  console.log('animal data', animal)

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
                <Button variant="secondary">Send {animal.owner.first_name} a request</Button>
              </div>
            </div>
          </div>

        </div>
        : <h2>{errors ? 'Something has gone wrong!' : 'loading... 🐈 🦮 🐇'}</h2>
      }

    </Container>
  )
}

export default AnimalShow