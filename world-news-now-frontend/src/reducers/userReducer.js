const initialState = {
  user: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

const usersReducer = (state=initialState, action) => {

  switch (action.type) {

    case 'SET_CURRENT_USER':
      return { ...state, user: action.payload, loggedIn: true, authenticatingUser: false }

    case 'AUTHENTICATING_USER':
      return { ...state, authenticatingUser: true }

    case 'AUTHENTICATED_USER':
      return { ...state, authenticatingUser: false }

    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }

  case 'LOGOUT_USER':
    return {...state, loggedIn: false}

    case 'ADD_SAVED_STORY_TO_LIST':
      return {
        ...state,
        user: {
          ...state.user,
          news: [...state.user.news, action.payload]
        }
      }

    case 'DELETE_NEWS_FROM_USER':
      return {
        ...state,
        user: {
          ...state.user,
          news: state.user.news.filter( article => article.id !== action.payload )
        }
      }

    default:
      return state
  }
}

export default usersReducer


// return { ...state, user: {...state.user, books: state.user.books.filter(book => book.id !== action.payload)}}

// case SAVE_BOOKSHELF:
//   return { ...state, user: {...state.user, bookshelves: state.user.bookshelves.concat(action.payload)}}
