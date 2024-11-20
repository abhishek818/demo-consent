import React, { useEffect, useState } from 'react';
import './ProfileSection.css'; // Reuse the existing CSS

function Privacy() {
	const applicationId = sessionStorage.getItem('applicationId');
	// Set default values if user hasn't provided them
	const defaultUserEmail = 'kathirvel@privasapien.com';
	const defaultUserIdentifier = 'Kathirvel';
	const [purposes, setPurposes] = useState([]);
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		gender: '',
		age: '',
		parentEmail: '', // Stores parent's email if age < 18
		consentGiven: null, // null = no action, true = consent given, false = consent withdrawn
		selectedOptions: [], // Initialize as empty, will be updated dynamically
	});

	const [showParentEmail, setShowParentEmail] = useState(false); // Controls visibility of parent's email input

	// Load purposes from sessionStorage on component mount
	useEffect(() => {
		const storedPurposes = sessionStorage.getItem('purposes');
		if (storedPurposes) {
			const parsedPurposes = JSON.parse(storedPurposes);
			setPurposes(parsedPurposes);

			// Set default selected options with all purpose IDs
			const defaultSelected = parsedPurposes.map((purpose) => purpose.i);
			setFormData((prevState) => ({
				...prevState,
				selectedOptions: defaultSelected,
			}));
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target;
		setFormData((prevState) => {
			const updatedSelectedOptions = checked ? [...prevState.selectedOptions, value] : prevState.selectedOptions.filter((item) => item !== value);

			return { ...prevState, selectedOptions: updatedSelectedOptions };
		});
	};

	const handleAgeBlur = () => {
		if (formData.age && formData.age < 18) {
			setShowParentEmail(true); // Show parent's email input after age blur if age < 18
		}
	};

	const handleConsent = async () => {
		setFormData({ ...formData, consentGiven: true });

		const apiUrl = sessionStorage.getItem('apiUrl');
		const userEmail = formData.email || defaultUserEmail;
		const userIdentifier = formData.fullName || defaultUserIdentifier;
		const bodyData = {
			application_id: applicationId,
			purpose_ids: formData.selectedOptions,
			user_identifier: userIdentifier,
			user_email: userEmail,
		};

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bodyData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Consent successfully saved:', data);

				// Dispatch consent to Consentium
				const layer = [];
				layer.push({
					event: 'SET_CONSENTIUM_DATA',
					user_identifier: formData.fullName,
					user_email: formData.email,
				});
				window.dataLayer = layer;
				window.dispatchEvent(new Event('dataLayerReady'));
				console.log('Consent Request Sent.');
				// alert("Thank you for giving consent!");
			} else {
				console.error('Error saving consent:', response.statusText);
			}
		} catch (error) {
			console.error('Error occurred while saving consent:', error);
		}
	};

	const handleWithdrawConsent = async () => {
		setFormData({ ...formData, consentGiven: false });

		const withdrawApiUrl = sessionStorage.getItem('withdrawApiUrl');
		const userEmail = formData.email || defaultUserEmail;
		const userIdentifier = formData.fullName || defaultUserIdentifier;
		const bodyData = {
			application_id: applicationId,
			user_identifier: userIdentifier,
			user_email: userEmail,
		};

		try {
			const response = await fetch(withdrawApiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bodyData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log('Consent successfully withdrawn:', data);
				// Trigger withdraw consent event
				window.dispatchEvent(new Event('withdrawConsent'));
				console.log('Consent withdrawn');
			} else {
				console.error('Error withdrawing consent:', response.statusText);
			}
		} catch (error) {
			console.error('Error occurred while withdrawing consent:', error);
		}
	};

	return (
		<div className="profile-section">
			<h2>Privacy Policy</h2>
			<p>Please review our privacy policy. Use the buttons below to give or withdraw your consent. You can also update your profile information.</p>
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
					onBlur={handleAgeBlur}
					required
				/>
			</div>

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

			<h3>Select the purposes for which we need your consent:</h3>
			<div
				className="form-group"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<form
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-start',
						padding: '20px',
						borderRadius: '8px',
						width: '300px',
					}}
				>
					{purposes.map((purpose, index) => (
						<div
							key={index}
							style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
						>
							<input
								type="checkbox"
								value={purpose.i}
								checked={formData.selectedOptions.includes(purpose.i)}
								onChange={handleCheckboxChange}
								style={{ width: 'auto', accentColor: 'indigo', marginRight: '8px' }}
							/>
							<label style={{ marginLeft: '8px' }}>{purpose.n}</label>
						</div>
					))}
				</form>
			</div>

			{/* Buttons to submit consent or withdraw */}
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
				<button
					type="button"
					onClick={handleConsent}
					style={{
						padding: '12px 24px',
						marginRight: '12px',
						backgroundColor: '#4CAF50', // Green background
						color: '#fff', // White text
						border: 'none',
						borderRadius: '6px',
						cursor: 'pointer',
						fontSize: '16px',
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						transition: 'all 0.3s ease',
					}}
					onMouseEnter={(e) => (e.target.style.backgroundColor = '#45A049')} // Hover effect
					onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
				>
					Give Consent
				</button>
				<button
					type="button"
					onClick={handleWithdrawConsent}
					style={{
						padding: '12px 24px',
						backgroundColor: '#F44336', // Red background
						color: '#fff', // White text
						border: 'none',
						borderRadius: '6px',
						cursor: 'pointer',
						fontSize: '16px',
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						transition: 'all 0.3s ease',
					}}
					onMouseEnter={(e) => (e.target.style.backgroundColor = '#D32F2F')} // Hover effect
					onMouseLeave={(e) => (e.target.style.backgroundColor = '#F44336')}
				>
					Withdraw Consent
				</button>
			</div>

			{/* Display Consent Status */}
			{formData.consentGiven !== null && <p>{formData.consentGiven ? 'You have given your consent.' : 'You have withdrawn your consent.'}</p>}
		</div>
	);
}

export default Privacy;
