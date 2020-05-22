import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './actions';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {user, pass, tab, throttle} = useSelector(state => state);
  let dispatch = useDispatch();

  async function onSubmit(e) {
    e.preventDefault();
    let authenticated = undefined;

    if(!throttle) {
      authenticated = await login({user, pass}).then(res => true).catch(err => false);
      dispatch({type: 'TOGGLE_THROTTLE'});
      setTimeout(() => { 
        dispatch({type: 'TOGGLE_THROTTLE'});
      }, 1000);
    } else {
      document.getElementById('invalid').innerText = 'Too many requests. Please wait a moment then try again.';
      return;
    }

    if(authenticated) {
      dispatch({type: 'SET_TAB', payload: 'VIEW_ACCOUNTS'});
    }
    else {
      document.getElementById('invalid').innerText = 'Invalid Password';
    }
    dispatch({type: 'SET_USER', payload: ''});
    dispatch({type: 'SET_PASS', payload: ''});
  }

  switch(tab) {
    default:
      return (
        <div>
          <div className='text-danger'>Warning: Default configurations set. Contact your system administrator immediately.</div>
          <form className='form-centered form-group' onSubmit={onSubmit}>
            <div className='invalid' id='invalid'></div>
            <label className='label'>Username:</label>
            <input className='form-control' 
              type='input' 
              placeholder='username'
              value={user}
              onChange={e => dispatch({type: 'SET_USER', payload: e.target.value})}
            />

            <label className='label'>Password:</label>
            <input className='form-control' 
              type='password'
              placeholder='password'
              value={pass} 
              onChange={e => dispatch({type: 'SET_PASS', payload: e.target.value})} 
            />
            <button className='btn btn-primary submit-btn' type='submit'>submit</button>

          </form>
        </div>
      );
  }
}

export default App;
