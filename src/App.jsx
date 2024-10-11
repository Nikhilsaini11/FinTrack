import PropTypes from 'prop-types';
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import React, { useState } from 'react'

function App() {
  const [refresh, setRefresh] = useState(false);
  const handleClearData = () => {
      localStorage.clear();
      setRefresh(prev => !prev);
    };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };
  scrollToSection.propTypes = {
    sectionId: PropTypes.string.isRequired
  };

  return (
    <>
      <Navbar scrollToSection={scrollToSection} handleClearData={handleClearData}/>
      <Dashboard refresh={refresh}/>
    </>
  )
}


export default App
