import React, { Component } from 'react';
import './App.css';
import WorldMap from './components/WorldMap.js'
import HeaderBar from './components/HeaderBar.js'


class App extends Component {

//makes a copy of state, moves first element of array to last spot and returns new elem [0]
  displayStory = () => {
    const stateStories = this.state.newsStories
    let rollingStories = stateStories.push(stateStories.shift())
    return rollingStories[0] //why is this returning '1'?
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HeaderBar />
        </header>
          <WorldMap />
      </div>
    );
  }
}

export default App;
