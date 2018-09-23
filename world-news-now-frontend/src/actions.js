import countryConverter from './countryCodes.js'

export function selectCountryAction(countryID){
  return {
      type: 'CHANGE_SELECTED_COUNTRY',
      payload: countryConverter[countryID]
  }
}

export function getNewsArticles(selectedCountry) {
  console.log("selectedCountry is", selectedCountry);
  return (dispatch) => {
    return fetch(`https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=39cf1522998442b68090abeb1716a344`)
      .then( res => res.json() )
      .then( data => dispatch({
        type: 'GET_NEWS_FOR_COUNTRY',
        payload: data.articles
      }) )
  }
}

export function createUser(){

  let objData = {
    Headers: {
      'Content-Type': 'application/json'
    },
    Method: 'POST',
    Body: JSON.stringify({
      name: 'LittleBobbyDropTables',
      age: 6,
      country: 'Italy',
      password: 'michael'
    })
  }

  return (dispatch) => {
    return
      fetch('http://localhost:3000/api/v1/users', objData)
      .then( res => console.log(res) )
  }
}
