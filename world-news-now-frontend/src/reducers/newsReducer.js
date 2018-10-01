const initialState = {
  newsStories: [],
  indexCounter: 0
}

export default function newsReducer( state=initialState, action ){
  switch (action.type) {

    case 'SAVE_INDEX_COUNTER':
      return {...state, indexCounter: action.payload}
      
    case 'GET_NEWS_FOR_COUNTRY':
      return {...state, newsStories: action.payload}


    default:
      return state
  }
}
