/* eslint-disable no-unused-vars */

import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const UserCard = ({ id, profile_picture, first_name, username, bio, schedule, activity }) => {

  const history = useHistory()

  const handleClick = () => {
    console.log('clicked')
    history.push(`/borrowers/${id}`)
  }

  return (
    <Card style={{ width: '60rem' }}>
      <div className="big-card">
        <Card.Img src={profile_picture} alt={username} />
        <div className="information">
          <Card.Title>{first_name}</Card.Title>
          <Card.Text>{bio}</Card.Text>
          <Button variant="secondary" onClick={handleClick}>View profile</Button>
        </div>
      </div>
    </Card>
  )
}

export default UserCard