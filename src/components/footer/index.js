import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import './footer.css';

const Footer = () => {
    return(
        <div className='Footer'>
            <div className='footer-main'>
                <div className='contact'>
                    <a href='https://github.com/lutakrystal305' target='_blank' className='Link-contact'>
                        <FontAwesomeIcon icon={faGithub}/>
                        <h6>lutakrystal305</h6>
                    </a>
                    <a href='https://www.facebook.com/lutakrystal305/' target='_blank' className='Link-contact'>
                        <FontAwesomeIcon icon={faFacebook}/>
                        <h6>Thái</h6>
                    </a>
                    <a href='https://www.instagram.com/Lutakrystal/?fbclid=IwAR06U45xL97LvE171Y1VotccXnOaWzHvxqJfXETaGY97l5gT0WvatETUd1o' target='_blank' className='Link-contact'>
                        <FontAwesomeIcon icon={faInstagram}/>
                        <h6>Lutakrystal</h6>
                    </a>
                    <a href='https://www.youtube.com/channel/UCjddmzteQBzAvqOSXE9tHKA?view_as=subscriber' target='_blank' className='Link-contact'>
                        <FontAwesomeIcon icon={faYoutube}/>
                        <h6>Kull</h6>
                    </a>
                </div>
                <div className='logo'>
                    <FontAwesomeIcon icon={faMoon} className='icon-moon'/>
                    <h2>Amber</h2>
                </div>
                <div className='address'>
                    <p>54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</p>
                    <p>Quốc lộ 1A, Viêm Tây 2, Điện Thắng Bắc, Điện Bàn, Quảng Nam</p>
                    <p>Stàmord Bridge, London, England</p>
                    <p>Old trafford, Manchester, England</p>
                </div>
            </div>
            <div className='contact-mb'>
                    <a href='github.com/lutakrystal305' target='_blank' className='Link-contact'>
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                    <a href='https://www.facebook.com/lutakrystal305/' target='_blank' className='Link-contact'>
                        <FontAwesomeIcon icon={faFacebook}/>
                    </a>
                    <a href='https://www.instagram.com/Lutakrystal/?fbclid=IwAR06U45xL97LvE171Y1VotccXnOaWzHvxqJfXETaGY97l5gT0WvatETUd1o' target='_blank' className='Link-contact'>
                        <FontAwesomeIcon icon={faInstagram}/>
                    </a>
                    <a href='https://www.youtube.com/channel/UCjddmzteQBzAvqOSXE9tHKA?view_as=subscriber' target='_blank' className='Link-contact'>
                        <FontAwesomeIcon icon={faYoutube}/>
                    </a>
            </div>
            <div className='hr'>© 2020 Luta Krystal - All Rights Reserved.</div>
        </div>
    )
}
export default Footer