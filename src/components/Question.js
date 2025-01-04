import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Question.css';
import NavigationBar from './NavigationBar';
import { useNavigate } from 'react-router-dom';

function Question() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/answer', {
        question: question
      });

      setResponse(response.data.response);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear local storage or send a request to your backend
    localStorage.removeItem('token');
    navigate('/LoginPage'); // Redirect to login page after logout
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="container">
      <NavigationBar onLogout={handleLogout} />
      <h1>What would you like to know?</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question..."
          rows={5}
          cols={50}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Scraping...' : 'Submit'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {response && (
        <div className="response-container">
          <h2>Summary:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default Question;
