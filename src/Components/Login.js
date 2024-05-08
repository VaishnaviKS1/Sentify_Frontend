import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Login = () => {
  const navigate = useNavigate();

  const handleTryMe = () => {
    navigate('/home');
  };
  

  return (
    <div className="container">
      {/* Header */}
      <h1 className="app-name">SENTIFY</h1>

      {/* Center Content */}
      <div className="center-content">
        {/* App Name */}
        <h2 className="centered-app-name">SENTIFY</h2>
        {/* Description */}
        <p className="description">
          Helps understand your viewers via their comments
        </p>
        {/* Try Me Button */}
        <button className="try-me-button" onClick={handleTryMe}>
          Try Me
        </button>
       
      </div>

      {/* Three Boxes */}
      <div className="box-container">
      <p className="features-text">Features of this project </p>
        {/* Box 1: Multimodal */}
        <div className="box">
          <h3 className='heading'>Multimodal</h3>
          <p>Combines text and images present in the comments, for better understanding</p>
        </div>
        {/* Box 2: Detailed */}
        <div className="box">
          <h3 className='heading '>Detailed</h3>
          <p>Checks for sentiment based on the parts of speech that matter.</p>
        </div>
        {/* Box 3: Privacy */}
        <div className="box">
          <h3 className='heading'>Privacy</h3>
          <p>Only allows for public accounts, thereby adhering to privacy concerns.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
