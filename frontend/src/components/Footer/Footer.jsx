import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <h2 className="foodify">Foodify</h2>
                    <p>Delivering fresh and delicious food with the power of AI. Our smart platform personalizes recommendations, predicts demand, and ensures your orders reach you faster than ever.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get in touch</h2>
                    <ul>
                        <li>+91 9845279245</li>
                        <li>Foodify@gamil.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                <p className="footer-copyright">
                    Copyright {new Date().getFullYear()} &copy; Dheeraj Sai Goutham — All Rights Reserved
                </p>

            </p>
        </div>
    )
}

export default Footer
