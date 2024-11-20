import React, { useState } from 'react';
import './ProfileSection.css'; // Reuse the existing CSS

function Privacy() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: '',
        age: '',
        parentEmail: '', // Stores parent's email if age < 18
        consentGiven: null, // null = no action, true = consent given, false = consent withdrawn
        selectedOptions: [], // Holds the selected consent options
    });

    const [showParentEmail, setShowParentEmail] = useState(false); // Controls visibility of parent's email input

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

    const handleAgeBlur = () => {
        if (formData.age && formData.age < 18) {
            setShowParentEmail(true); // Show parent's email input after age blur if age < 18
        }
    };

    // Handle consent action
    const handleConsent = async () => {
        setFormData({ ...formData, consentGiven: true });

        const apiUrl = sessionStorage.getItem("apiUrl"); // Retrieve the create consent URL from sessionStorage

        // Prepare body data for the consent request
        const bodyData = {
            application_id: "f5470200-0f84-4e91-b2c6-c2d7e790c54c", // Replace with dynamic value if needed
            purpose_ids: formData.selectedOptions, // Selected consent options mapped to their IDs
            user_identifier: formData.fullName,
            user_email: formData.email,
        };

        try {
            const response = await fetch(apiUrl, { // Use the dynamic API URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "Referer": "http://localhost:3000/", // Replace with your actual site URL
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                },
                body: JSON.stringify(bodyData), // Send the data to the backend
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Consent successfully saved:", data);

                // Dispatch consent to Consentium
                const layer = [];
                layer.push({
                    event: "SET_CONSENTIUM_DATA",
                    user_identifier: formData.fullName,
                    user_email: formData.email,
                });
                window.dataLayer = layer;
                window.dispatchEvent(new Event("dataLayerReady"));
                console.log("Consent Request Sent.");
                // alert("Thank you for giving consent!");
            } else {
                console.error("Error saving consent:", response.statusText);
                // alert("Failed to save consent");
            }
        } catch (error) {
            console.error("Error occurred while saving consent:", error);
            // alert("Error occurred while processing consent");
        }
    };

    // Handle withdraw consent action
    const handleWithdrawConsent = async () => {
        setFormData({ ...formData, consentGiven: false });

        const withdrawApiUrl = sessionStorage.getItem("withdrawApiUrl"); // Retrieve the withdraw consent URL from sessionStorage

        // Prepare body data for the withdraw consent request
        const bodyData = {
            application_id: "f5470200-0f84-4e91-b2c6-c2d7e790c54c", // Replace with dynamic value if needed
            user_identifier: formData.fullName,
            user_email: formData.email,
        };

        try {
            const response = await fetch(withdrawApiUrl, { // Use the dynamic API URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "Referer": "http://localhost:3000/", // Replace with your actual site URL
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                },
                body: JSON.stringify(bodyData), // Send the data to withdraw consent
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Consent successfully withdrawn:", data);
                // Trigger withdraw consent event
                window.dispatchEvent(new Event("withdrawConsent"));
                console.log("Consent withdrawn");
                // alert("Your consent has been withdrawn.");
            } else {
                console.error("Error withdrawing consent:", response.statusText);
                // alert("Failed to withdraw consent");
            }
        } catch (error) {
            console.error("Error occurred while withdrawing consent:", error);
            // alert("Error occurred while processing withdraw consent");
        }
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

            {/* Age and Parent's Email Logic */}
            <div className="form-group">
                <label htmlFor="age">Age*</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    onBlur={handleAgeBlur} // Trigger the blur event to show parent's email if age < 18
                    required
                />
            </div>

            {/* Conditionally Show Parent's Email if Age < 18 and onBlur Triggered */}
            {showParentEmail && formData.age < 18 && (
                <div className="form-group">
                    <label htmlFor="parent-email">Parent's Email*</label>
                    <input
                        type="email"
                        id="parent-email"
                        name="parentEmail"
                        placeholder="Parent's Email"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            {/* Purpose Selection */}
            <h3>Select the purposes for which we need your consent:</h3>
            <div className="form-group" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '300px'
                }}>
                    {[
                        "Sales", "Marketing", "Support", "Consent", "Tech", "Educate", "Product",
                        "Analytics", "HR", "Account management", "Advertisement", "Legal"
                    ].map((label, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <input
                                type="checkbox"
                                value={`purpose-${index}`}
                                onChange={handleCheckboxChange}
                                style={{ width: 'auto', accentColor: 'indigo', marginRight: '8px' }}
                            />
                            <label style={{ marginLeft: '8px' }}>{label}</label>
                        </div>
                    ))}
                </form>
            </div>

            {/* Buttons to submit consent or withdraw */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    type="button"
                    onClick={handleConsent}
                    style={{ padding: '10px 20px', marginRight: '10px' }}>
                    Give Consent
                </button>
                <button
                    type="button"
                    onClick={handleWithdrawConsent} 
                    style={{ padding: '10px 20px' }}>
                    Withdraw Consent
                </button>
            </div>

            {/* Display Consent Status */}
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
