const initialState = {
  indexCounter: 0,
  filteredSearch: [],
  newsStories: [],
  newsToDisplay: 'country',
  searchTerm: ''
}

export default function newsReducer( state=initialState, action ){
  switch (action.type) {

    case 'SAVE_INDEX_COUNTER':
      return {...state, indexCounter: parseInt(action.payload)}

    case 'INCREASE_INDEX':
      return {...state, indexCounter: state.indexCounter + 1 }

    case 'DECREASE_INDEX':
      return {...state, indexCounter: state.indexCounter - 1 }

    case 'NEWS_TO_DISPLAY':
      return {...state, newsToDisplay: action.payload}

    case 'GET_NEWS_FOR_COUNTRY':
      return {...state, newsStories: action.payload}

    case 'GET_NEWS_BY_SEARCH':
      return {...state,
        filteredSearch: action.payload,
        searchTerm: action.searchTerm}

    default:
      return state
  }
}
