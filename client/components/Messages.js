import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { createMessage } from '../store';

/**
 * COMPONENT
 */
export const Messages = props => {
  const { messages, users, user, isDms} = props
  const [ text, setText ] = useState('');
  const [ dm , setDm ] = useState('');

  return (
    <div>
      <h1>{ isDms ? 'DMS' : 'Public' }</h1>
      {
        props.user.id && (
          <form
            onSubmit={ (ev)=> {
              ev.preventDefault();
              props.createMessage({ text, dmId: dm});
              setText('') 
            }
          }>
            <input value={ text } onChange={ ev => setText(ev.target.value)} />
            <select value={ dm } onChange={ ev => setDm(ev.target.value)}>
              
              <option value=''>Everyone</option>
              {
                users.map( user => {
                  return (
                    <option key={user.id} value={ user.id }>{ user.email }</option>
                  );
                })
              }
            </select>
            <button disabled={ isDms && !dm}>Send</button>
          </form>

        )
      }
      <ul>
        {
          messages.map( message => {
            return (
              <li key={ message.id } className={ message.user.id === user.id ? 'bold': ''}>
                <div>
                From: { user.id === message.user.id ? 'You': message.user.email }
                </div>
                {
                  message.dm && <div>To: { message.dm.id === user.id ? 'You': message.dm.email }</div>
                }
                <div>
                  {
                    message.text
                  }
                </div>
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
const mapState = (state, { location }) => {
  const isDms = location.pathname === '/dms';

  return {
    isDms,
    messages: state.messages.filter( message => isDms ? message.dmId : !message.dmId),
    users : state.users,
    user : state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMessage: (message)=> dispatch(createMessage(message))  
  }
}

export default connect(mapState, mapDispatchToProps)(Messages)
