import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage, getPayload } from '../helpers/auth'
import Button from 'react-bootstrap/Button'

const ShowUserProfile = () => {

  const [userProfile, setUserProfile] = useState(null)
  const [errors, setErrors] = useState(false)

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
                <h3>{userProfile.first_name}</h3>
                {/* <Button variant="secondary"><span className="icon"><i className="fas fa-edit"></i></span>Edit</Button> */}
              </div>
              <hr />
              <div className="date-joined">
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
                  <p>Looking for</p>
                  {
                    userProfile.activity.map(act => <div className="activity" key={act.id}><p>{ act.name }</p></div>)
                  }
                </div>
                <div className="data">
                  <p>Available on</p>
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