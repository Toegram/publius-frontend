import { combineReducers } from 'redux'
import countryReducer from './countryReducer.js'
import newsReducer from './newsReducer.js'
import usersReducer from './userReducer.js'

const rootReducer = combineReducers({
  user: usersReducer,
  country: countryReducer,
  news: newsReducer
})

export default rootReducer
