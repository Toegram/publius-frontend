const initialState = {
  newsStories: []
}

export default function newsReducer( state=initialState, action ){

  switch (action.type) {

    case 'GET_NEWS_FOR_COUNTRY':
      return {...state, newsStories: action.payload}

      case 'SAVE_NEWS_TO_USER':
        return state


    default:
      return state
  }
}
