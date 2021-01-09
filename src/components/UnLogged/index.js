import React, { useState, useEffect } from 'react';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import mc from '../../img/mc.png';

const UnLogged = () => {
    const [onSignUp, setOnSignUp] = useState(false);
    const onRegister = useSelector(state => state.register);

    const dispatch = useDispatch();
    const handleClick1 = () => {
        setOnSignUp(false);
    };
    const handleClick2 = () => {
        setOnSignUp(true);
    }
    const checkEffect = () => {
        if (onRegister.isRegister) {
            setOnSignUp(false);
        }
    }
    useEffect(() => {
        checkEffect();
    },[onRegister.isRegister]);
    useEffect(() => {
        document.title = 'Login'
    }, []);
    return(
        <div className='UnLogged' >
            <div className='bg-login'>
                <img src={mc} alt='bg' />
            </div>
            <div className='item-login'>
                <h5 onClick={handleClick1} className={classNames({'on-item':!onSignUp})}>Sign In</h5>
                <h5 onClick={handleClick2} className={classNames({'on-item': onSignUp})}>Sign Up</h5>
            </div>
            {!onSignUp?
            <SignIn />
            : <SignUp />
            }
        </div>
    )
}
export default UnLogged