import React from 'react';
import './Header.css'; // Create CSS file if needed

function Header() {
  return (
    <div className="header">
            <header class="site-header">
        <img src="https://canarabankcsis.in/onlinesurvey/images/CB_logo1.png" alt="Canara Bank Logo" class="site-logo" />
      </header>
      <div className="contact-info">
        <img 
          src="https://marutisuzukiarenaprodcdn.azureedge.net/assets/msga/phase2/images/header/login-icon.png" 
          alt="Profile Logo" 
          className="profile-logo"
        />
        <a href="mailto:contact@canarabank.co.in">contact@canarabank.co.in</a>
      </div>
    </div>
  );
}

export default Header;
