const initialState = {
  indexCounter: 0,
  filteredSearch: [],
  newsStories: []
}

export default function newsReducer( state=initialState, action ){
  switch (action.type) {

    case 'SAVE_INDEX_COUNTER':
      return {...state, indexCounter: action.payload}

    case 'GET_NEWS_FOR_COUNTRY':
      return {...state, newsStories: action.payload}

    case 'GET_NEWS_BY_SEARCH':
      return {...state, filteredSearch: action.payload}

    default:
      return state
  }
}
