import countryConverter from './countryCodes.js'

export function selectCountryAction(countryID){
  return {
      type: 'CHANGE_SELECTED_COUNTRY',
      payload: countryConverter[countryID]
  }
}
