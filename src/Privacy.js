import React, { useState } from 'react';
import './ProfileSection.css'; // Reuse the existing CSS

function Privacy() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    consentGiven: null, // null = no action, true = consent given, false = consent withdrawn
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConsent = () => {
    setFormData({ ...formData, consentGiven: true });
    alert('Thank you for giving consent!');
  };

  const handleWithdrawConsent = () => {
    setFormData({ ...formData, consentGiven: false });
    alert('Your consent has been withdrawn.');
  };

  return (
    <div className="profile-section">
      <h2>Privacy Policy</h2>
      <p>
        Please review our privacy policy. Use the buttons below to give or withdraw your consent. 
        You can also update your profile information.
      </p>
      <div className="form-group">
        <label htmlFor="mobile-number">Mobile Number*</label>
        <p id="mobile-number">9996663331</p>
      </div>
      <div className="form-group">
        <label htmlFor="full-name">Full Name*</label>
        <input
          type="text"
          id="full-name"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender*</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Consent Buttons */}
      <div className="form-group">
        {/* <label>Privacy Consent</label> */}
        <div>
          <button
            type="button"
            className="edit-btn"
            onClick={handleConsent}
            style={{ marginRight: '10px' }}
          >
            Give Consent
          </button>
          <button
            type="button"
            className="edit-btn"
            onClick={handleWithdrawConsent}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Withdraw Consent
          </button>
        </div>
      </div>

      {/* Consent Status Display */}
      {formData.consentGiven !== null && (
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
          {formData.consentGiven
            ? 'You have given your consent.'
            : 'You have withdrawn your consent.'}
        </p>
      )}
    </div>
  );
}

export default Privacy;
