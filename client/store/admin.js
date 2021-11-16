import {TOKEN} from "./auth"
import axios from "axios"

/**
 * ACTION TYPES
 */
const SET_ADMIN = 'SET_ADMIN'

/**
 * ACTION CREATORS
 */
const setAdmin = adminCheck => ({type: SET_ADMIN, adminCheck})

/**
 * THUNK CREATORS
 */
export const checkIsAdmin = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN)
    if(token){
      const res = await axios.get('/auth/admin', {
        headers: {
          authorization: token
        }
      })
        return dispatch(setAdmin(res.data))
    }else{
      return dispatch(setAdmin(false))
    }
}

/**
 * REDUCER
 */
 export default function(state = false, action) {
    switch (action.type) {
      case SET_ADMIN:
        return action.adminCheck
      default:
        return state
    }
  }
  