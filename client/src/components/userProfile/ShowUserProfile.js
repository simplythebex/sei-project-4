/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage, getPayload } from '../helpers/auth'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { Link, useHistory } from 'react-router-dom'

const ShowUserProfile = () => {

  const [userProfile, setUserProfile] = useState(null)
  const [errors, setErrors] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const payload = getPayload()
        if (!payload) return 
        const currentUserId = payload.sub
        const { data } = await axios.get(`api/auth/users/${currentUserId}/`,
          {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
          }
        )
        setUserProfile(data)
        console.log('data', data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getCurrentUser()
  }, [])

  const handleClick = () => {
    history.push('/register-animal')
  }

  console.log('userprofile', userProfile)
  return (
    <div className="user-profile">
      {userProfile ?
        <>
          <div className="top">
            <div className="profile-images">
              <img src={userProfile.profile_picture} alt={userProfile.username} />
            </div>
            <div className="information">
              <div className="info-header">
                <h3>Welcome back, {userProfile.first_name}</h3>
              </div>
              <hr />
              <div className="date-joined">
                {
                  userProfile.account_type === 'owner'
                    ?
                    <Button variant="secondary" onClick={handleClick}><span className="icon"><i className="fas fa-plus"></i></span>Add another pet</Button>
                    :
                    <div></div>
                }
                <p>Member since: {(new Date(String(userProfile.date_joined)).toLocaleString()).slice(0, 10)}</p>
              </div>
              <hr />
              <div className="borrow-info">
                <p>Looking for a pet to borrow </p>
                {
                  userProfile.account_type === 'borrower'
                    ?
                    <div className="green">
                      <p>Yes</p>
                    </div>
                    :
                    <div className="red">
                      <p>No</p>
                    </div> 
                }
              </div>
              <hr />
              <div className="needs">
                <div className="data">
                  <p><span className="icon"><i className="fas fa-bullhorn"></i></span> Looking for</p>
                  {
                    userProfile.activity.map(act => <div className="activity" key={act.id}><p>{ act.name }</p></div>)
                  }
                </div>
                <div className="data">
                  <p><span className="icon"><i className="fas fa-calendar-alt"></i></span> Available on</p>
                  {
                    userProfile.schedule.map(sch => <div className="schedule" key={sch.id}><p>{ sch.name }</p></div>)
                  }
                </div>
              </div>
              <hr />
              <div className="bio">
                <p>{userProfile.bio}</p>
              </div>
            </div>
          </div>
          <hr />
          <Row className="bottom">
            {
              userProfile.account_type === 'owner'
                ?
                <>
                  <h3>Your Pets</h3>
                  <hr/>
                  {
                    userProfile.animals.map(animal => {
                      return (
                        <div 
                          key={animal.id} 
                          className="animals" 
                          style={{ backgroundImage: `url(${animal.animal_image})` }}
                        >
                          <Link to={`/animals/${animal.id}`}>
                            <div className="animal-name">
                              <h4>{animal.animal_name}</h4>
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  }
                </>
                :
                <div className="padding"></div>

            }

          </Row>
          {/* <div className="bottom">
            <hr />
            {
              userProfile.account_type !== 'owner' 
                ?
                <div className="bottom-text">
                  <p>Do you own a pet?</p>
                  <Button variant="secondary">Create an owner profile</Button>
                </div>
                :
                <div className="bottom-text">
                  <p>Would you like to borrow a pet?</p>
                  <Button variant="secondary">Create a borrower profile</Button>
                </div>
            
            }
          </div> */}
        </>
        : <h2>{errors ? 'Something has gone wrong!' : 'loading...'}</h2>
      }
    </div>
  )

}

export default ShowUserProfile