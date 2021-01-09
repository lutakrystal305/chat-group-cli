import React, { useState } from 'react';
import './creator.css';
import am1 from '../../img/am1.png';
import am2 from '../../img/am2.png';
import bamboo from '../../img/bamboo.png';
import shiba from '../../img/avt-x.jpg';
import ashura from '../../img/avt-author.jpg';
import heathen from '../../img/heathen.png';

const Creator = () => {
    let author = [
        {
            avt: ashura,
            name: 'Ashura Douji', sex: 'male', age: 30,
            address: 'Kuri, Wano',
            university: 'Wano university of sword',
            hobby: 'War, Porn, Loyal'
        },
        {
            avt: heathen,
            name: 'Heathen', sex: 'male', age: 20,
            address: 'Gotham, America',
            university: 'Harvard',
            hobby: 'War'
        },
        {
            avt: shiba,
            name: 'Luta Krystal', sex: 'male', age: 20, 
            address: 'Dien Ban, Quang Nam, Viet Nam', 
            university: 'Danang university of technology',
            hobby: 'Music, Football, Manga, Green color, Dog, Simply'
        }
    ];
    const [creators, setCreators] = useState(author);
    const handleClick = (x) => {
        let a = creators.indexOf(x);
        setCreators([...creators.slice(0,a), ...creators.slice(a+1), x]);
    }
    return(
        <div className='Creator'>
            <div className='cover-creator'>
                <img src={bamboo} alt='cover' />
            </div>
            <div className='profile'>
                {creators.map(x => (
                <div className='each-profile' onClick={() => handleClick(x)}>
                    <div className='avt-author'>
                        <img src={x.avt} alt='avt-creator' />
                    </div>
                    <div className='infor'>
                        <div className='name'>
                            <h5>Name:</h5>
                            <p>{x.name}</p>
                        </div>
                        <div className='sex'>
                            <h5>Gender:</h5>
                            <p>{x.sex}</p>
                        </div>
                        <div className='age'>
                            <h5>Age:</h5>
                            <p>{x.age} years old</p>
                        </div>
                        <div className='address'>
                            <h5>Address:</h5>
                            <p>{x.address}</p>
                        </div>
                        <div className='uni'>
                            <h5>University:</h5>
                            <p>{x.university}</p>
                        </div>
                        <div className='hobby'>
                            <h5>Hobby:</h5>
                            <p>{x.hobby}</p>
                        </div>
                    </div>
                    <div className='exp'>
                        <h5>My project:</h5>
                        <a href='https://lutakrystal305.herokuapp.com/' target='_blank'>
                            <div className='pj-z'>
                                    
                                <img src={am1} alt='project' />
                            </div>
                        </a>
                        <a href='https://amber-social.herokuapp.com/' target='_blank'>
                            <div className='pj-z'>
                                    
                            <img src={am2} alt='project' />
                            </div>
                        </a>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}
export default Creator;