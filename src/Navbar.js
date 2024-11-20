import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="navbar">
      {/* Use Link for navigation */}
      <Link
        to="/"
        className={`navbar-link ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleTabChange('home')}
      >
        My Profile
      </Link>
      <a
        href="#"
        className={`navbar-link ${activeTab === 'car' ? 'active' : ''}`}
        onClick={() => handleTabChange('car')}
      >
        Car Enquiries/Booking
      </a>
      <a
        href="#"
        className={`navbar-link ${activeTab === 'service' ? 'active' : ''}`}
        onClick={() => handleTabChange('service')}
      >
        Service Bookings
      </a>
      <a
        href="#"
        className={`navbar-link ${activeTab === 'loyalty' ? 'active' : ''}`}
        onClick={() => handleTabChange('loyalty')}
      >
        Loyalty/Rewards
      </a>
      <a
        href="#"
        className={`navbar-link ${activeTab === 'accessories' ? 'active' : ''}`}
        onClick={() => handleTabChange('accessories')}
      >
        Maruti Suzuki Genuine Accessories
      </a>
      <a
        href="#"
        className={`navbar-link ${activeTab === 'config' ? 'active' : ''}`}
        onClick={() => handleTabChange('config')}
      >
        My Configurations
      </a>
      <Link
        to="/privacy"
        className={`navbar-link ${activeTab === 'privacy' ? 'active' : ''}`}
        onClick={() => handleTabChange('privacy')}
      >
        Privacy
      </Link>
      <a
        href="#"
        className={`navbar-link ${activeTab === 'package' ? 'active' : ''}`}
        onClick={() => handleTabChange('package')}
      >
        Customer Convenience Package
      </a>
    </div>
  );
};

export default Navbar;
