import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayload } from '../helpers/auth'

const ShowPetProfile = () => {

  const [userProfile, setUserProfile] = useState(null)
  const [petProfile, setPetProfile] = useState(null)
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
        setPetProfile(data.animals)
        console.log('data', data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getCurrentUser()
  }, [])

  console.log('user profile', userProfile)
  console.log('pet profile', petProfile)

  return (
    <div className="user-profile">
      {petProfile ?
        petProfile.map(pet => {
          return (
            <>
              <div className="top">
                <div className="profile-images">
                  <img src={pet.animal_image} alt={pet.animal_name} />
                </div>
                <div className="information">
                  <div className="info-header">
                    <h3>{pet.animal_name}</h3>
                    <Link to={`/edit-animal/${pet.id}`}><span className="icon"><i className="fas fa-edit"></i></span>Edit</Link>
                  </div>
                  <hr />
                  <div className="date-joined">
                    <p>Pet type: {pet.animal_type}</p>
                  </div>
                  <hr />
                  <div className="needs">
                    <div className="data">
                      <p>Looking for</p>
                      {
                        pet.activity.map(act => <div className="activity" key={act.id}><p>{ act.name }</p></div>)
                      }
                    </div>
                    <div className="data">
                      <p>Available on</p>
                      {
                        pet.schedule.map(sch => <div className="schedule" key={sch.id}><p>{ sch.name }</p></div>)
                      }
                    </div>
                  </div>
                  <hr />
                  <div className="bio">
                    <p>{pet.animal_bio}</p>
                  </div>
  
                </div>
              </div>
              <div className="bottom">
                <hr />
              </div>              
            </>
          )
        })
        : <h2>{errors ? 'Something has gone wrong!' : 'loading...'}</h2>
      }
    </div>
  )

}

export default ShowPetProfile