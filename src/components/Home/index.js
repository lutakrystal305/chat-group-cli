import React, { useEffect } from 'react';
import Board from './Board.js';

const Home = () => {
    useEffect(() => {
        document.title = 'Home'
    }, []);
    return(
        <div className='Home'>
            <div className='btn-wel'>
                <button >Welcome to Amber Chat!!</button>
            </div>
            <Board />
        </div>
    )
}
export default Home