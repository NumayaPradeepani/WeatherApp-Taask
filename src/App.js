import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './login';
import Profile from './Profile';
//import longitudelantitude from './longitutdelaitude';
import WeatherForecast from './WeatherForecast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/WeatherForecast" element={<WeatherForecast/>} />
        
      </Routes>
      </BrowserRouter>
    

      
    </div>
  );
}

export default App;
