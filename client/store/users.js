import axios from 'axios'
import history from '../history'
import socket from '../socket';
import io from 'socket.io-client'

/**
 * ACTION TYPES
 */
const SET_USERS = 'SET_USERS'

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const setUsers = users => ({type: SET_USERS, users})

/**
 * THUNK CREATORS
 */
export const getUsers = (users) => async dispatch => {
    const res = await axios.get('/api/users')
    dispatch(setUsers(res.data))
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
