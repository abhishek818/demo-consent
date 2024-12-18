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
				Account Dashboard
			</Link>
			<a
				href="#"
				className={`navbar-link ${activeTab === 'loan' ? 'active' : ''}`}
				onClick={() => handleTabChange('loan')}
			>
				Loan Applications
			</a>
			<a
				href="#"
				className={`navbar-link ${activeTab === 'bill-payments' ? 'active' : ''}`}
				onClick={() => handleTabChange('bill-payments')}
			>
				Bill Payments
			</a>
			<a
				href="#"
				className={`navbar-link ${activeTab === 'banking-products' ? 'active' : ''}`}
				onClick={() => handleTabChange('banking-products')}
			>
				Banking Products
			</a>
			<a
				href="#"
				className={`navbar-link ${activeTab === 'account-settings' ? 'active' : ''}`}
				onClick={() => handleTabChange('account-settings')}
			>
				Account Settings
			</a>
			<a
				href="#"
				className={`navbar-link ${activeTab === 'accessories' ? 'active' : ''}`}
				onClick={() => handleTabChange('accessories')}
			>
				Canara Bank Services
			</a>
			<Link
				to="/privacy"
				className={`navbar-link ${activeTab === 'privacy' ? 'active' : ''}`}
				onClick={() => handleTabChange('privacy')}
			>
				Privacy & Security
			</Link>
			<a
				href="#"
				className={`navbar-link ${activeTab === 'premium-banking' ? 'active' : ''}`}
				onClick={() => handleTabChange('premium-banking')}
			>
				Premium Banking Services
			</a>
		</div>
	);
};

export default Navbar;
