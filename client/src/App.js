import React, {useState, useEffect} from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { login, getAccounts } from './actions';
import {Row, Col} from 'reactstrap';
import uuid4 from 'uuid4';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {user, pass, tab, throttle, accounts, selected, infoPanels, lois} = useSelector(state => state);
  let dispatch = useDispatch();

  function addInfoPanel(e) { 
    document.getElementById('broken').innerText='';
    let users = Array.from(document.getElementById('selectAccounts'));
    users = users.filter(option => option.selected).map(option => option.value);
    let data = accounts.filter(acc => users.includes(acc.firstName + ' ' + acc.lastName));
    dispatch({type: 'SET_SELECTED', payload: data});
    let panels = data.map(acc => <InfoPanel key={uuid4()} data={acc}/>);
    dispatch({type: 'SET_INFO_PANEL', payload: panels});
  }

  function toMoney(num) {
    // Create our number formatter.
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(num);
  }

  // Account Data component to keep track of it's data
  function AccountData(props) {
    const [data, setData] = useState(props.acc);
    return (
      <option 
        style={props.style}
        >
        {props.acc.firstName + ' ' + props.acc.lastName}
      </option>
    )
  }

  // info about a specific account,
  // rendered on account select
  function InfoPanel(props) {
    let { user, debt, lastFour, DOB, firstName, lastName } = props.data;
    return (
      <div style={{marginLeft: '20px'}}>
        <Row>
          <Col>Name: </Col>
          <Col>{firstName + ' ' + lastName}</Col>
        </Row>
        <Row>
          <Col>Account: </Col>
          <Col>{user}</Col>
        </Row>
        <Row>
          <Col>Owed: </Col>
          <Col>{toMoney(Number(debt))}</Col>
        </Row>
        <Row>
          <Col>DOB: </Col>
          <Col>{DOB}</Col>
        </Row>
        <Row>
          <Col>SSN: </Col>
          <Col>***-**-{lastFour}</Col>
        </Row>
        <hr style={{borderTop: 'dotted 1px'}} />
      </div>
    );
  }

  // handles login submission
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
      getAccounts().then(res => {
        dispatch({type: 'SET_ACCOUNTS', payload: res.data});
        dispatch({type: 'SET_LOIS', payload: res.data.filter(acc => acc.firstName + ' ' + acc.lastName === 'Lois Gislason')[0]});
      }).catch( err => {
        console.log(err)
      })
      dispatch({type: 'SET_TAB', payload: 'LOGGED_IN'});
    }
    else {
      document.getElementById('invalid').innerText = 'Invalid Password';
    }
    dispatch({type: 'SET_USER', payload: ''});
    dispatch({type: 'SET_PASS', payload: ''});
  }

  // selects all accounts
  function selectAll() {
    let options = document.getElementById('selectAccounts');
    let checked = document.getElementById('selectAll').checked;
    Array.from(options).map(option => option.selected = checked);
    addInfoPanel();
  }

  // displays accounts after they're gathered
  function displayAccounts() {
    if(accounts) {
      return accounts.map(acc => <AccountData key={uuid4()} acc={acc} />);
    }
    return 'Loading...';
  }

  function delAccounts(e) {
    e.preventDefault();
    document.getElementById('broken').innerText='';
    if(selected.includes(lois)) {
      dispatch({type: 'SET_TAB', payload: 'VICTORY'});
    }
    dispatch({type: 'SET_ACCOUNTS', payload: accounts.filter(acc => !selected.includes(acc))});
    dispatch({type: 'SET_SELECTED', payload: []});
    dispatch({type: 'SET_INFO_PANEL', payload: []});
  }

  function brokenMod(e) {
    e.preventDefault();
    document.getElementById('broken').innerText='Failed: Configuration Error.';
  }

  switch(tab) {
    case 'VICTORY':
      if(accounts.length === 0) {
        return (
          <div className='accounts text-success'>
            Congratulation, you hacked challenge 6! Also you're a fucking hero!
          </div>
        )
      } else {
        return (
          <div className='accounts text-success'>
            Congratulations, you hacked challenge 6. :)
          </div>
        )
      }
    case 'LOGGED_IN':
      return (
        <div className='accounts'>
          <div className='text-danger' id='broken' />
          <form className='form-group'>
            <select multiple className='form-control' id='selectAccounts' onChange={addInfoPanel}>
              {displayAccounts()};
            </select>
            <Row style={{marginTop: '10px', marginLeft: '20px'}}>
              <Col xs='2'>
                <input type='checkbox' className="form-check-input" id='selectAll' onChange={selectAll}/>
                <label className="form-check-label" htmlFor="selectAll">Select All</label>
              </Col>
              <Col xs='2'><button onClick={brokenMod}>Modify</button></Col>
              <Col xs='2'><button onClick={delAccounts}>Delete Record</button></Col>
            </Row>
          </form>
          {infoPanels}
        </div>
      )
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
