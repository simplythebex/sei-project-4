import React from 'react'

const Home = () => {
  return (
    <div className="homepage">
      <div className="homepage-buttons">
        <a href='/registerborrower'>        
          <div className="button">
            become a borrower
          </div></a> 
        <a href='/registerowner'>        
          <div className="button">
            become an owner
          </div></a> 
      </div>
    </div>
  )
}

export default Home