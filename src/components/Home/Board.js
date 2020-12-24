import React, { useState } from 'react';
import Title from 'react-vanilla-tilt';
import classNames from 'classnames';
import './Home.css';

import msg from '../../img/msg.png';
import msg3 from '../../img/msg3.png';
import tiger from '../../img/tiger.png';
import noel from '../../img/Noel1.png';
import noel1 from '../../img/Noel2.png';

const Board = () => {
  const [logo, setLogo] = useState(false);
  const [noell, setNoell] = useState(false);
  
  
  const handleOver1 = () => {
    setLogo(true);
    setNoell(false);
  }
  const handleOver2 = () => {
    setNoell(true);
    setLogo(false);
  }
  const handleOut = () => {
    setLogo(false);
    setNoell(false);
  }
  var bg = tiger;
  if (logo) {
    bg = msg3; 
  } else if (noell) {
    bg = noel1;
  }
  return(
    <div className='Board'>
      <div className={classNames('circle', {'c-noel': noell}, {'c-logo': logo})}></div>
      <div className='container' >
          <Title 
          options={{ scale: 2, speed: 1000, max: 30}} 
          className='card' 
          onMouseOver={handleOver1}
          onMouseOut={handleOut}
          >
            <div className='content'>
              <div className='msg-logo'>
                <img src={msg} alt='msg-logo' width={200} />
              </div>
              <div className='zz'>
                <h3>Chat Group =)))</h3>
                <p>This is community where you can add new friends, chat, find real love,...</p>
              </div>
            </div>
          </Title>
          <Title 
          options={{ scale: 2, speed: 1000, max: 30}} 
          className='card' 
          onMouseOver={handleOver2}
          onMouseOut={handleOut}
          >
            <div className='content'>
              <div className='noel'>
                <img src={noel} alt='noel' width={200} />
              </div>
              <div className='zzz'>
                <h3>Coming soon</h3>
                <p>Something...</p>
              </div>
            </div>
          </Title>
      </div>
      <div className='bg-item'>
        <img src={bg} alt='bg-item' width={400} />
      </div>
    </div>
  )
}
export default Board;