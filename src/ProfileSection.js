import React from 'react';
import './ProfileSection.css'; // Create CSS file if needed

function ProfileSection() {
  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      <div className="form-group">
        <label htmlFor="mobile-number">Mobile Number*</label>
        <p id="mobile-number">9996663331</p>
      </div>
      <div className="form-group">
        <label htmlFor="full-name">Full Name*</label>
        <input type="text" id="full-name" name="full-name" placeholder="Full Name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" name="email" placeholder="Email" />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender*</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      {/* Add other form fields here */}
      <a href="#" className="edit-btn">Edit</a>
    </div>
  );
}

export default ProfileSection;
