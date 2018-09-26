import countryConverter from './countryCodes.js'

const BASE_URL = 'http://localhost:3000/api/v1/'

export function selectCountry(countryID, callback){
  callback(countryConverter[countryID])
  return {type: 'CHANGE_SELECTED_COUNTRY', payload: countryConverter[countryID]}
}

export function getNewsArticles(selectedCountry) {
  console.log("selectedCountry is", selectedCountry);
  return(dispatch) => {
    return fetch(`https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=39cf1522998442b68090abeb1716a344`)
    .then( res => res.json() )
    .then( data => {
      return dispatch({ type: 'GET_NEWS_FOR_COUNTRY', payload: data })
    })
  }
}

export const createUser = (username, password, age, country) => {

  let URL_SUFFIX = 'users'

  let objData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        name: username,
        password: password,
        age: age,
        country: country
      }
    })
  }
  return(dispatch) => {
  dispatch({ type: 'AUTHENTICATING_USER'})
  fetch(`${BASE_URL}${URL_SUFFIX}`, objData)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  })
    .then(JSONResponse => {
      localStorage.setItem('jwt', JSONResponse.jwt)
      dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
    })
    .catch( res => {
      debugger
      res.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message }))})
  }
}

export const loginUser = (username, password) => {

  let URL_SUFFIX = 'login'

  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATING_USER'})
    fetch(`${BASE_URL}${URL_SUFFIX}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: username,
          password: password
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
      })
      .catch( res => {
        debugger
        res.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message }))})
    }
}

export const fetchCurrentUser = () => {

  let URL_SUFFIX = 'profile'

  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch(`${BASE_URL}${URL_SUFFIX}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const logoutUser = () => {
  type:'LOGOUT_USER'
}

export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })

export const saveArticleToUser = (article, userId) => {

  let URL_SUFFIX = 'news'

  let objData = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({
      author: article["author"],
      content: article["content"],
      description: article["description"],
      published_at: article["publishedAt"],
      source: article["source"]["name"],
      title: article["title"],
      url_to_image: article["urlToImage"],
      url: article["url"],
      user_id: userId
    })
  }
  return(dispatch) => {
  dispatch({ type: 'SAVE_NEWS_TO_USER'})
  fetch(`${BASE_URL}${URL_SUFFIX}`, objData)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  })
  }
}
