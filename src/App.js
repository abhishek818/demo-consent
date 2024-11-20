import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Header from './Header';
import Navbar from './Navbar';
import ProfileSection from './ProfileSection';
import ConsentOverlay from './ConsentOverlay';
import Privacy from './Privacy'; // Import the Privacy component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<ProfileSection />} /> {/* Default route */}
          <Route path="/privacy" element={<Privacy />} /> {/* Privacy page route */}
          {/* You can add more routes for other tabs as needed */}
        </Routes>
        
        <ConsentOverlay />
      </div>
    </Router>
  );
}

export default App;
