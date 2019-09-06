import React from 'react';
import Routes from './config/routes';
import NavBar from './components/Layout/NavBar';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes />
      </div>
    </>
    
  );
};

export default App;
