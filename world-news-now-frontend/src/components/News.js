import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const News = (props) => {
  console.log("news props", props);



  return (
    <Fragment>
      <div>
        <h3> Title: </h3> <h4> {props.newsStories.articles[0].title} </h4>
        <h3> Content: </h3> <h4> {props.newsStories.articles[0].description} </h4>
        <h3> Link: </h3> <a href="{props.newsStories.articles[0].url}"> {props.newsStories.articles[0].url} </a>
      </div>
    </Fragment>
  )
}

function mapStateToProps(state){
  return {
    newsStories: state.news.newsStories
  }
}

export default connect(mapStateToProps)(News)
