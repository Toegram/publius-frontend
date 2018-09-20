import React from 'react'
import { connect } from 'react-redux'

const Article = (props) => {
  console.log("Article Props:", props);
  return (
    <div>
      <p> HELLO FROM ARTICLE </p>
    </div>
  )
}

function mapStateToProps(state){
  return {
    selectedCountry: state.selectedCountry
  }
}

export default connect(mapStateToProps)(Article)
