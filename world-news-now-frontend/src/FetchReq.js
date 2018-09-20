import { connect } from 'react-redux'

const getNews = (props) => {
  console.log("FETCH PROPS", props);
  
  fetch(`https://newsapi.org/v2/top-headlines?country=${props.selectedCountry}&apiKey=39cf1522998442b68090abeb1716a344`)
  .then( res => res.json() )
  .then( data => props.dispatch({
    type: "GET_NEWS_FOR_COUNTRY",
    payload: data
  }) )
}

function mapStateToProps(state){
  return {
    selectedCountry: state.selectedCountry
  }
}

export default connect(mapStateToProps)(getNews)
