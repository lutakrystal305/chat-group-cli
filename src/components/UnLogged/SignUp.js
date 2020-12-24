import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ErrAlert from '../bootstrap/Alert';

const SignUp = () => {
    const [valueMail, setValueMail] = useState('');
    const [valuePass2, setValuePass2] = useState('');
    const [valuePass, setValuePass] = useState('');
    const [valueGender, setValueGender] = useState('');
    const [err, setErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    const dispatch = useDispatch();
    const validateMail = new RegExp(/^([a-z0-9]{6,25})?(@gmail.com)$/g);
	const validatePass = new RegExp(/^([a-z0-9]{6,20})$/g);

    const handleChange1 = (event) => {
        setValueMail(event.target.value);
    }
    const handleChange2 = (event) => {
        setValuePass(event.target.value);
    }
    const handleChange3 = (event) => {
        setValuePass2(event.target.value);
    }
    const handleChange4 = (event) => {
        setValueGender(event.target.value);
    }
    const handleClick = () => {
        if (validateMail.test(valueMail) === false) {
			setErr(true);
            setMsgErr('Your Mail was wrong syntax!');
            setValueMail('');
            setValuePass('');
            setValuePass2('');
		} else if (validatePass.test(valuePass) === false) {
			setErr(true);
            setMsgErr('Your Password was wrong syntax!');
            setValuePass('');
            setValuePass2('');
		} else if (valuePass !== valuePass2) {
            setErr(true);
            setMsgErr('Your Password is not correct!');
            setValuePass2('');
        } else if (!valueGender) {
            setErr(true);
            setMsgErr('You need click your gender!');
        } else {
            let newUser = {
                email: valueMail,
                password: valuePass,
                sex: valueGender
            };
            console.log(newUser);
            axios
                .post('http://localhost:9999/user/create', newUser)
                .then((res) => {
                    if (res.data) {
                        dispatch({type: 'REGISTER'});
                    }
                })
        }
    }
    return(
        <div className='SignUp'>
            <div className='title-item'>
                <h3>Sign Up</h3>
            </div>
            <div className='body-form'>
                {err ?
                    <ErrAlert >{msgErr}</ErrAlert>
                    : ''
                }
                <input type='text' onChange={handleChange1} placeholder='Your mail you want create!' value={valueMail}/>
                <input type='password' onChange={handleChange2} placeholder='Your password!' value={valuePass}/>
                <input type='password' onChange={handleChange3} placeholder='Your password again!' value={valuePass2} />
                <div className='gender'>
                    <label>Gender:</label>
                    <div>
                        <input type='radio' name='gender' value='male' onChange={handleChange4} />Male
                    </div>
                    <div>
                        <input type='radio' name='gender' value='female' onChange={handleChange4} /> Female
                    </div>
                </div>
                <button onClick={handleClick} className='click-post'>Sign Up</button>
            </div> 
        </div>
    )
}
export default SignUp;