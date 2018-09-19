import React from 'react'

const HeaderBar = () => {
  return(
    <div>
      <h1 className="App-title">Publius</h1>
      <div className="ui buttons">
        <button className="ui button">Sign Up</button>
          <div className="or"></div>
        <button className="ui positive button">Log In</button>
      </div>
    </div>
  )
}

export default HeaderBar
