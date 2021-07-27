import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AnimalCard from './AnimalCard'
import { getUserId } from '../helpers/auth'

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

  const filteredAnimals = animals.filter(filtered => {
    return filtered.owner.id !==  getUserId()
  })

  console.log('filtered animals', filteredAnimals)

  return (
    <Container className="animal-index">
      <Row>
        <h5>{filteredAnimals.length} pets found</h5>
      </Row>
      <Col>
        {filteredAnimals.length > 0 ?
          <Row>
            {filteredAnimals.map(animal => {
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