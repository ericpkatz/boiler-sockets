import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_MESSAGES = 'SET_MESSAGES'
const CREATE_MESSAGE = 'CREATE_MESSAGE'


/**
 * ACTION CREATORS
 */
const setMessages = messages => ({type: SET_MESSAGES, messages})
const _createMessage = message => ({type: CREATE_MESSAGE, message})

/**
 * THUNK CREATORS
 */
export const getMessages = () => async dispatch => {
  const res = await axios.get('/api/messages')
  dispatch(setMessages(res.data))
}

export const createMessage = (message) => async dispatch => {
  const res = await axios.post('/api/messages', message)
  dispatch(_createMessage(res.data))
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages
    case CREATE_MESSAGE:
      return [action.message, ...state]
    default:
      return state
  }
}
