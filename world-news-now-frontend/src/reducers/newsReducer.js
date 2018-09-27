const initialState = {
  newsStories: []
}

export default function newsReducer( state=initialState, action ){

  switch (action.type) {

    case 'GET_NEWS_FOR_COUNTRY':
      return {...state, newsStories: action.payload}

    default:
      return state
  }
}
