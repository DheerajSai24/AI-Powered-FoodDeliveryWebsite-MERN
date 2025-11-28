import React from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <h2 className="foodify">Foodify</h2>
        <p className="admin-panel-text">Admin Panel</p>
      </div>
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
