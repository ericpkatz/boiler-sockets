import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { createMessage } from '../store';

/**
 * COMPONENT
 */
export const Messages = props => {
  const { messages } = props
  const [ text, setText ] = useState('');

  return (
    <div>
      <form
        onSubmit={ (ev)=> {
          ev.preventDefault();
          props.createMessage(text);
          setText('') 
        }
      }>
        <input value={ text } onChange={ ev => setText(ev.target.value)} />
      </form>
      <ul>
        {
          messages.map( message => {
            return (
              <li key={ message.id }>
                { message.text } from { message.user.email }
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMessage: (text)=> dispatch(createMessage({text}))  
  }
}

export default connect(mapState, mapDispatchToProps)(Messages)
