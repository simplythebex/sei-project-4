import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AnimalCard from './AnimalCard'

const AnimalIndex = () => {

  const [animals, setAnimals] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/animals/')
        setAnimals(data.reverse())
      } catch (err) {
        console.log(err)
        setHasError(err)
      }
    }
    getData()
  }, [])
  
  console.log('animals on state', animals)

  return (
    <Container className="animal-index">
      <Row>
        <h5>{animals.length} pets found</h5>
      </Row>
      <Col>
        {animals.length > 0 ?
          <Row>
            {animals.map(animal => {
              return <AnimalCard key={animal.id} {...animal} /> 
            })}
          </Row>
          :
          <h2>{hasError ? 'Something has gone wrong!' : 'loading... 🐈 🦮 🐇'}</h2>
        }
      </Col>
    </Container>
  )
}

export default AnimalIndex