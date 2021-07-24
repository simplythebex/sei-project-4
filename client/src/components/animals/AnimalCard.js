/* eslint-disable no-unused-vars */

import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const AnimalCard = ({ id, animal_image, animal_name, animal_type, animal_bio, owner, schedule, activity }) => {
  return (
    <Card style={{ width: '19rem' }}>
      <Link to={`/animals/${id}`}>
        <Card.Img src={animal_image} alt={animal_name} />
        <Card.Title>{animal_name}</Card.Title>
        <Card.Text>{animal_type}</Card.Text>
      </Link>
    </Card>
  )
}

export default AnimalCard