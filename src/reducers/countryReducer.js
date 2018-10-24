const initialState = {
  selectedCountry: 'us',
}

export default function countryReducer(state = initialState, action) {

  switch(action.type) {

    case 'CHANGE_SELECTED_COUNTRY':
      return {...state, selectedCountry: action.payload}

    default:
      return state
  }
}
