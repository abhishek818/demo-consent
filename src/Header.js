import React from 'react';
import './Header.css'; // Create CSS file if needed

function Header() {
  return (
    <div className="header">
      <img 
        src="https://marutisuzukiarenaprodcdn.azureedge.net/-/media/images/maruti/marutisuzuki/global/maruti-logo.webp?h=39&w=194&la=en&hash=A8D386DD695C25850B9EE818532657AC" 
        alt="Maruti Suzuki Logo"
      />
      <div className="contact-info">
        <img 
          src="https://marutisuzukiarenaprodcdn.azureedge.net/assets/msga/phase2/images/header/login-icon.png" 
          alt="Profile Logo" 
          className="profile-logo"
        />
        <a href="mailto:contact@maruti.co.in">contact@maruti.co.in</a>
      </div>
    </div>
  );
}

export default Header;
