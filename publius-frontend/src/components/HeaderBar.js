import React from 'react'
import logo from '../logo.svg';

const HeaderBar = () => {

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
    </div>
  )

}

export default HeaderBar;
