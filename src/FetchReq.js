import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getNewsArticles} from "./actions.js"

class GetNews extends Component {
  componentDidMount() {
    this.props.getNewsArticles(this.props.selectedCountry.toLowerCase())
  }

  render() {
    console.log("this.props are", this.props);
    console.log("-----");
    return (
      <h1>HEY</h1>
    )
  }
}

function mapStateToProps(state){
  return {
    selectedCountry: state.selectedCountry,
    newsStories: state.newsStories
  }
}
//
function mapDispatchToProps(dispatch){
  return {
    getNewsArticles: (selectedCountry) => dispatch(getNewsArticles(selectedCountry))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetNews)
