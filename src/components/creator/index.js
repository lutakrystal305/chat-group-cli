import React, { useEffect } from 'react';
import Footer from '../footer';
import Creator from './Creator';

const Author = () => {
    useEffect(() => {
        document.title = 'About Us'
    }, []);
    return(
        <div className='Author'>
            <Creator />
            <Footer />
        </div>
    )
}
export default Author;