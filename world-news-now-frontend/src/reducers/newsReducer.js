const initialState = {
  newsStories: []
}

export default function newsReducer( state=initialState, action ){

  switch (action.type) {

    case 'GET_NEWS_FOR_COUNTRY':
      return {...state, newsStories: action.payload}

    // case 'ADD_SAVED_STORY_TO_LIST':
    //   return {...state, user.user.news: [...state.user.user.news, action.payload]

    default:
      return state
  }
}

// userDeets.user.news
