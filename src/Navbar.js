import React, { useState } from 'react';
import './Navbar.css'; // Ensure this file exists or create it

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home'); // Default active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [consentGiven, setConsentGiven] = useState(null);

  const handleConsent = () => {
    // Handle consent logic here
    setConsentGiven(true);
  };

  const handleWithdraw = () => {
    // Handle withdrawal logic here
    setConsentGiven(false);
  };

  return (
    <div>
      <div className="navbar">
        <a href="#" className={`navbar-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>My Profile</a>
        <a href="#" className={`navbar-link ${activeTab === 'car' ? 'active' : ''}`} onClick={() => handleTabChange('car')}>Car Enquiries/Booking</a>
        <a href="#" className={`navbar-link ${activeTab === 'service' ? 'active' : ''}`} onClick={() => handleTabChange('service')}>Service Bookings</a>
        <a href="#" className={`navbar-link ${activeTab === 'loyalty' ? 'active' : ''}`} onClick={() => handleTabChange('loyalty')}>Loyalty/Rewards</a>
        <a href="#" className={`navbar-link ${activeTab === 'accessories' ? 'active' : ''}`} onClick={() => handleTabChange('accessories')}>Maruti Suzuki Genuine Accessories</a>
        <a href="#" className={`navbar-link ${activeTab === 'config' ? 'active' : ''}`} onClick={() => handleTabChange('config')}>My Configurations</a>
        <a href="#" className={`navbar-link ${activeTab === 'privacy' ? 'active' : ''}`} onClick={() => handleTabChange('privacy')}>Privacy</a>
        <a href="#" className={`navbar-link ${activeTab === 'package' ? 'active' : ''}`} onClick={() => handleTabChange('package')}>Customer Convenience Package</a>
      </div>

      {activeTab === 'privacy' && (
        <div className="privacy-content">
          <p>Privacy Notice: We value your privacy. Please provide your consent for data collection.</p>
          {consentGiven === null ? (
            <>
              <button onClick={handleConsent} className="privacy-btn">Give Consent</button>
              <button onClick={handleWithdraw} className="privacy-btn">Withdraw Consent</button>
            </>
          ) : (
            <p>{consentGiven ? "Thank you for giving consent." : "Consent has been withdrawn."}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
