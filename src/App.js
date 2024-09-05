import React from 'react';
import './App.css';
import Header from './Header';
import Navbar from './Navbar';
import ProfileSection from './ProfileSection';
import ConsentOverlay from './ConsentOverlay';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <ProfileSection />
      <ConsentOverlay />
    </div>
  );
}

export default App;
