import React, { useEffect, useState } from 'react'
import { userIsAuthenticated, getUserId } from '../helpers/auth'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'

const Home = () => {

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
    <div>

      {
        !userIsAuthenticated() 
          ? 
          <div className="homepage">
            <div className="homepage-buttons">
              <a href='/registerborrower'>        
                <div className="button">
              Become a borrower
                </div></a> 
              <a href='/registerowner'>        
                <div className="button">
              Become an owner
                </div></a> 
            </div>
          </div>
          :
          <Carousel>
            {
              animals &&
              <>
                {
                  filteredAnimals.map(animal => {
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={animal.animal_image}
                        alt={animal.animal_name}
                    
                      />
                      <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  })
                }
              </>
            }
          </Carousel>

      }
    </div>
  )
}

export default Home