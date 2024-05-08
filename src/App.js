import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import SentimentCheck from './Components/SentimentCheck';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sentiment-check" element={<SentimentCheck />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
