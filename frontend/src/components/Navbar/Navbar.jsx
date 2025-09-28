import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Navbar = () => {
  const [menu, setMenu] = useState('Home');
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const { cartItem } = useContext(StoreContext);

  // Don't show any active menu item when on cart or other pages
  const isHomePage = location.pathname === '/';
  
  // Calculate total cart items
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItems += cartItem[item];
      }
    }
    return totalItems;
  };
  
  // Trigger animation when cart changes
  const totalItems = getTotalCartItems();
  
  useEffect(() => {
    const prevTotal = parseInt(localStorage.getItem('prevCartTotal') || '0');
    if (totalItems > prevTotal) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      localStorage.setItem('prevCartTotal', totalItems.toString());
      return () => clearTimeout(timer);
    } else {
      localStorage.setItem('prevCartTotal', totalItems.toString());
    }
  }, [totalItems]);
  
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Account for navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    
    // Navigate to specific sections
    switch(menuItem) {
      case 'Menu':
        scrollToSection('explore-menu');
        break;
      case 'Mobile App':
        scrollToSection('app-download');
        break;
      case 'Contact Us':
        scrollToSection('footer');
        break;
      default:
        // For Home, scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    }
  };
  
  return (
    <div className="navbar">
      <Link to='/'><h2 className="foodify">Foodify</h2></Link>
      <ul className="navbar-menu">
        <Link to='/'><li onClick={() => handleMenuClick('Home')} className={menu === 'Home' && isHomePage ? 'active' : ''}>Home</li></Link>
        <li onClick={() => handleMenuClick('Menu')} className={menu === 'Menu' && isHomePage ? 'active' : ''}>Menu</li>
        <li onClick={() => handleMenuClick('Mobile App')} className={menu === 'Mobile App' && isHomePage ? 'active' : ''}>Mobile App</li>
        <li onClick={() => handleMenuClick('Contact Us')} className={menu === 'Contact Us' && isHomePage ? 'active' : ''}>Contact Us</li>
      </ul>
      
      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Search for food, restaurants..."
          className="navbar-search-input"
        />
        <img src={assets.search_icon} alt="Search" className="navbar-search-icon-btn" />
      </div>
      
      <div className="right">
        <div className="navbar-search-icon">
          <Link to='/cart'> 
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          {getTotalCartItems() > 0 && <div className={`dot${isAnimating ? ' blink' : ''}`}></div>}
        </div>
        <button>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;