import { useState, useEffect } from 'react'
import './App.css'
import requests from './assets/Requests'
import Animes from './components/Animes'
import Banner from './components/Banner'

function App() {
  
  return (
    <div className="App h-full w-full">
      <Banner />
      <Animes />
    </div>
  )
}

export default App
