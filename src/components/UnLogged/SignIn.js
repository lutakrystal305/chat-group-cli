import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import FacebookLogin from 'react-facebook-login';
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
				.post('https://chat-group-sv.herokuapp.com/user/check', { token })
				.then((res) => {
					console.log(res.data)
          dispatch({type: 'AUTHED', dataUser: res.data});
          sessionStorage.setItem('user', JSON.stringify(res.data));
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
        .post('https://chat-group-sv.herokuapp.com/user/login', user)
        .then((res) => {
          console.log(res.data.token);
          dispatch({type: 'LOGGED', token: res.data.token});
          sessionStorage.setItem('token', res.data.token.toString());
          checkAuth(res.data.token);
          setValueMail('');
          setValuePass('');
        })
    }
  }
  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
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
          .post('https://chat-group-sv.herokuapp.com/user/login', user)
          .then((res) => {
            dispatch({type: 'LOGGED', token: res.data.token});
            sessionStorage.setItem('token', res.data.token.toString());
            checkAuth(res.data.token);
            setValueMail('');
            setValuePass('');
          })
      }
    }
  }
  const responseFacebook = (response) => {
    console.log(response);
    if (response.accessToken) {
      sessionStorage.setItem('accessToken', response.accessToken.toString());
      const user = {
        email: response.email,
        name: response.name,
        phone: response.phone,
        sex: response.gender,
        profile: response.public_profile,
        date: response.user_birthday,
        urlAvt: response.picture.data.url,
        userID: response.id
      };
      axios
        .post("https://chat-group-sv.herokuapp.com/user/loginFB", user)
        .then((res) => {
          if (res.data.token) {
            dispatch({type: 'LOGGED', token: res.data.token});
            sessionStorage.setItem("token", res.data.token.toString());
          }
          checkAuth(res.data.token);
        })
        .catch((err) => {
          if (err.response === undefined) {
            alert(err);
          } else if (err.response.status === 401) {
            setErr(true);
            setMsgErr(err.response.data.msg);
          }
        });
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
        <input type='text' placeholder='Email' onKeyUp={handleKeyUp} onChange={handleChangeMail} value={valueMail}/>
        <input type='password' placeholder='Password' onKeyUp={handleKeyUp} onChange={handleChangePass} value={valuePass} />
        <div>
          <button onClick={handleLogin} className='click-post' > Login </button>
          <FacebookLogin
            appId="454409709303698" //APP ID NOT CREATED YET

            fields="name,email,picture,gender"
            scope="public_profile"
            callback={responseFacebook}
            disableMobileRedirect={false}
            isMobile={false}
            
          />
        </div>
      </div>
    </div>
  )
}
export default SignIn;