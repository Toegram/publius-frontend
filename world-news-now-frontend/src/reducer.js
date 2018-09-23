const initialState = {
  selectedCountry: 'us',
  newsStories: []
}


export default function reducer(state = initialState, action) {
  switch(action.type) {

    case 'CHANGE_SELECTED_COUNTRY':
      return {...state, selectedCountry: action.payload}

    case 'GET_NEWS_FOR_COUNTRY':
      return {...state, newsStories: action.payload}

    default:
      return state;
  }
}
