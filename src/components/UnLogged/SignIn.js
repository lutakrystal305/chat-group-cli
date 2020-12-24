import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import './login.css';
import SucAlert from '../material-ui/Alert';
import ErrAlert from '../bootstrap/Alert';

const SignIn = () => {
  const [valueMail, setValueMail] = useState('');
	const [valuePass, setValuePass] = useState('');
	const [err, setErr] = useState(false);
	const [msgErr, setMsgErr] = useState('');
  const onRegister = useSelector(state => state.register);
  

  const dispatch = useDispatch();

	const validateMail = new RegExp(/^([a-z0-9]{6,25})?(@gmail.com)$/g);
	const validatePass = new RegExp(/^([a-z0-9]{6,20})$/g);
  const handleChangeMail = (event) => {
    setValueMail(event.target.value);
  }
  const handleChangePass = (event) => {
    setValuePass(event.target.value);
  }
  const checkAuth = (token) => {
			axios
				.post('http://localhost:9999/user/check', { token })
				.then((res) => {
					console.log(res.data)
					dispatch({type: 'AUTHED', dataUser: res.data})
				})
  }
  const handleLogin = () => {
    if (validateMail.test(valueMail) === false) {
			setErr(true);
      setMsgErr('Your Mail was wrong syntax!');
      setValueMail('');
      setValuePass('');
		} else if (validatePass.test(valuePass) === false) {
			setErr(true);
      setMsgErr('Your Password was wrong syntax!');
      setValuePass('');
		} else {
      const user= {
        email: valueMail,
        password: valuePass
      }
      axios
        .post('http://localhost:9999/user/login', user)
        .then((res) => {
          dispatch({type: 'LOGGED'});
          checkAuth(res.data.token);
          setValueMail('');
          setValuePass('');
        })
    }
  }
  return(
    <div className={classNames('SignIn', {'onAlert': onRegister.isRegister})}>
      <div className='title-item'>
        <h3>Sign In</h3>
      </div>
      <div className='body-form'>
        {onRegister.isRegister ?
          <SucAlert />
          : ''
        }
        {err ?
          <ErrAlert isOpen={true}>{msgErr}</ErrAlert>
          : ''
        }
        <input type='text' placeholder='Email' onChange={handleChangeMail} value={valueMail}/>
        <input type='password' placeholder='Password' onChange={handleChangePass} value={valuePass} />
        <button onClick={handleLogin} className='click-post' > Login </button>
      </div>
    </div>
  )
}
export default SignIn;