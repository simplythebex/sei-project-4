import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const UserShow = () => {

  const [user, setuser] = useState(null)
  const [errors, setErrors] = useState(false)
  const { id } = useParams()

  console.log(id)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/auth/users/${id}/`)
        setuser(data)
        console.log('data', data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getData()
  }, [id])

  console.log('user data', user)

  return (
    <Container className="user-show">
      {user ?
        <div className="user-card">
          <div className="left-side">
            <Card.Img src={user.profile_picture} /> 
          </div>
          <div className="right-side">
            <h3>{user.first_name}</h3>
            <hr />
            <div className="information">
              {user.bio}
              <hr />
              {user.first_name} is available to give {user.activity.map(act => act.name)} on {user.schedule.map(sch => sch.name)}
              <hr />
            </div>
          </div>

        </div>
        : <h2>{errors ? 'Something has gone wrong!' : 'loading... 🐈 🦮 🐇'}</h2>
      }

    </Container>
  )
}

export default UserShow