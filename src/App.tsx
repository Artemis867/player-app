import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlayerDetails from './pages/PlayerDetails';
function App() {

  const routesMarkup = (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:playerId" element={<PlayerDetails />} />
        </Routes>
      </Router>
  );

  return (
    <>
      {routesMarkup}
    </>
  )
}

export default App
