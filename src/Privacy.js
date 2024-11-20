import React, { useState } from 'react';
import './ProfileSection.css'; // Reuse the existing CSS

function Privacy() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: '',
        consentGiven: null, // null = no action, true = consent given, false = consent withdrawn
        selectedOptions: [], // Holds the selected consent options
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevState => {
            const updatedSelectedOptions = checked
                ? [...prevState.selectedOptions, value]
                : prevState.selectedOptions.filter(item => item !== value);

            return { ...prevState, selectedOptions: updatedSelectedOptions };
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

            {/* Additional Consent Options */}
            <div className="form-group" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // height: '100vh'
            }}>
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    // backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    // boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                    width: '300px'
                }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>
                        We need your consent for the following purposes:
                    </label>

                    {/* Loop through each consent item */}
                    {[
                        "Sales", "Marketing", "Support", "Consent",
                        "Tech", "Educate", "Product", "Analytics",
                        "HR", "Account Management", "Advertisement", "Legal"
                    ].map((label, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <input
                                type="checkbox"
                                value={label.toLowerCase().replace(' ', '_')}
                                onChange={handleCheckboxChange}
                                style={{ width: 'auto',accentColor: 'indigo', marginRight: '8px' }}
                            />
                            <label style={{ fontSize: '12px' }}>{label}</label>
                        </div>
                    ))}

                    <button type="submit" style={{
                        marginTop: '12px',
                        padding: '8px',
                        backgroundColor: 'indigo',
                        color: '#fff',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Submit
                    </button>
                </form>
            </div>




            {/* Consent Buttons */}
            <div className="form-group">
                <label>Privacy Consent</label>
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