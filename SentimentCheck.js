import React, { useState } from 'react';
import '../styles.css';

const SentimentCheck = () => {
  const [inputText, setInputText] = useState('');
  const [sentimentData, setSentimentData] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handlePredictSentiment = async () => {
    // Predict sentiment based on input text
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/predict_single?text=${encodeURIComponent(inputText)}`
      );
      if (!response.ok) {
        throw new Error('Failed to predict sentiment');
      }
      const data = await response.json();
      setSentimentData(data);
    } catch (error) {
      console.error('Error predicting sentiment:', error);
    }
  };

  const handleImageUpload = async (event) => {
    // Handle image upload and predict sentiment from the image
    const file = event.target.files[0];
    setImageFile(file);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict_image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to predict sentiment from image');
      }

      const data = await response.json();
      setSentimentData(data);
    } catch (error) {
      console.error('Error predicting sentiment from image:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="app-name">Sentiment Check</h2>
      <div>
        <h3 className="centered-app-name">Predict Sentiment:</h3>
        <input
          type="text"
          placeholder="Enter text..."
          value={inputText}
          onChange={handleInputChange}
          className="input-field"
        />
        <div className='button-container'>
        <button className="try-me-button" onClick={handlePredictSentiment}>
          Predict
        </button>
        </div>
        {sentimentData && sentimentData.sentiment && (
          <div>
            <h4 className="centered-app-name">Predicted Sentiment:</h4>
            <p className="centered-app-name">{sentimentData.sentiment}</p>
          </div>
        )}
      </div>
      <div>
        <h3 className="centered-app-name">Predict Sentiment from Image:</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
        {imageFile && (
          <div>
            <p className="centered-app-name">Image uploaded: {imageFile.name}</p>
          </div>
        )}
        {sentimentData && sentimentData.caption && (
          <div>
            {/* <h4 className="centered-app-name">Predicted Caption:</h4>
            <p className='description'>{sentimentData.caption}</p> */}
            <h4 className="centered-app-name">Sentiment from Image:</h4>
            <p className="centered-app-name">{sentimentData.sentiment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentCheck;
