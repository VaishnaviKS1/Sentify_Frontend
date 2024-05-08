import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PieChart from './PieChart';
import '../styles.css';

const Home = () => {
  const [sentimentData, setSentimentData] = useState(null);
  const navigate = useNavigate();

  const handleTryYourself = () => {
    navigate('/sentiment-check');
  };

  useEffect(() => {
    // Fetch sentiment data from the backend
    const fetchSentimentData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/predict_csv');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSentimentData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchSentimentData();
  }, []);

  return (
    <div className="container">
      <h2 className="app-name">Here is an overview of the sentiments!</h2>
      {/* Check if sentimentData exists and then render the data */}
      {sentimentData && (
        <div>
          {/* <p className='description'>Positive Count: {sentimentData.positive_count}</p>
          <p className='description'>Negative Count: {sentimentData.negative_count}</p> */}
          <PieChart
            positivePercentage={sentimentData.positive_percentage}
            negativePercentage={sentimentData.negative_percentage}
          />
          

          <h3 className="centered-app-name">Positive Comments:</h3>
          <div className="comments-container">
          <ul className='description'>
            {sentimentData.positive_comments &&
              sentimentData.positive_comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
          </ul>
          </div>
          
          <h3 className="centered-app-name">Negative Comments:</h3>
          <div className="comments-container">
          <ul className='description'>
            {sentimentData.negative_comments &&
              sentimentData.negative_comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
          </ul>
          </div>
          <div className="button-container"> 
          <button className="try-me-button" onClick={handleTryYourself}>
            Try Me
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
