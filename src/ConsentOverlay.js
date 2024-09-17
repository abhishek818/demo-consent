import React, { useState } from 'react';
import './ConsentOverlay.css';

const ConsentOverlay = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  // Handle consent action
  const handleConsent = () => {
    setConsentGiven(true);
    // You can add more logic here to handle consent submission
    const layer = [];
  	layer.push({
  		event: 'SET_CONSENTIUM_DATA',
  		user_identifier: "Kathirvel",
  		user_email: "kathirvel@privasapien.com",
  	});
	  window.dataLayer = layer;
    window.dispatchEvent(new Event('dataLayerReady'));
    console.log('Consent Request Sent.');
    };

  // Handle withdraw action
  const handleWithdraw = () => {
    setConsentGiven(false);
    // You can add more logic here to handle consent withdrawal
    window.dispatchEvent(new Event('withdrawConsent'));
    alert('Consent withdrawn');
  };

  //return (
    <div id="consent-overlay">
      <div id="consent-form">
        <h2>Privacy Notice</h2>
        <p>
          We value your privacy. Please provide your consent for data collection.
        </p>

        {/* Conditionally show buttons based on consent status */}
        {!consentGiven ? (
          <button className="consent-give-btn consent-btn" onClick={handleConsent}>
            Give Consent
          </button>
        ) : (
          <button className="consent-give-btn withdraw-btn" onClick={handleWithdraw}>
            Withdraw Consent
          </button>
        )}

        <p className="status">
          {consentGiven ? 'You have given consent.' : 'Consent not given.'}
        </p>
      </div>
    </div>
  //);
};

export default ConsentOverlay;
