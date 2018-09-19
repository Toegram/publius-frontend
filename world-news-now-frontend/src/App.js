import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WorldMap from './components/worldmap.js'
import HeaderBar from './components/header.js'

class App extends Component {
  constructor(props){
    super(props)


    this.state = {
      searchTerm: 'us', //us is defaulted to country code before user inputs search
      newsStories: [],
    }
  }

 countryCode = () => {
   return this.state.searchTerm
  }



//uses state.searchTerm to set the 2 char country code from the search bar component
  componentDidMount(){
    fetch(`https://newsapi.org/v2/top-headlines?country=${this.countryCode()}&apiKey=39cf1522998442b68090abeb1716a344`)
    .then( res => res.json() )
    .then( data => this.setState({ newsStories: data.articles }) )
  }


//LOGS EACH COUNTRY ID!! HOORAY!
  handleClick = (event) => {
    this.setState({searchTerm: event.target.id})
  }

//makes a copy of state, moves first element of array to last spot and returns new elem [0]
  displayStory = () => {
    const stateStories = this.state.newsStories
    let rollingStories = stateStories.push(stateStories.shift())
    return rollingStories[0] //why is this returning '1'?
  }

  render() {
    console.log(this.state.searchTerm, "is the current STATE.searchTerm")
    console.log(this.state.newsStories, "is the current STATE.newsStories")
    console.log("First element of display story is", this.displayStory());

    return (
      <div className="App">
        <header className="App-header">
          <HeaderBar />
        </header>
          <WorldMap handleClick={this.handleClick}/>
      </div>
    );
  }
}

export default App;

// <img src={logo} className="App-logo" alt="logo" />
