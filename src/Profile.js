import React from 'react'
import { useState } from 'react'
import './Profile.css'
import Colombo from './Colombo'


export default function Profile() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=433461cde5f6b201c4863a64f51c73a1`;
  return (
    <div className="app">
      <Colombo />
    </div>
  )
}
