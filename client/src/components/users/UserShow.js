/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

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
              <div className="data">
                <p>Can give</p>
                {
                  user.activity.map(act => <div className="activity" key={act.id}><p>{ act.name}</p></div>)
                }
              </div>
              <div className="data">
                <p>Available on</p>
                {
                  user.schedule.map(sch => <div className="schedule" key={sch.id}><p>{ sch.name}</p></div>)
                }
              </div>

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