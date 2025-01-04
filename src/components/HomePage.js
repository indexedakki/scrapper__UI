import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import NavigationBar from './NavigationBar';
import axios from 'axios';

function HomePage() {
  const [name, setName] = useState('');
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name.trim() !== '') {
        submitName();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      submitName();
    }
  };

  const submitName = async () => {
    setIsLoading(true);
    setError(null);


    try {
      const response = await fetch('http://localhost:8000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Name sent successfully');
      setIsLoading(true); 
      setTimeout(async () => {
        setIsLoading(false);
        navigate('/Question', { state: { name } });
      }, 10000);

    } catch (error) {
      console.error('Error sending name:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/logout', {
        });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
    }
    localStorage.removeItem('token');
    navigate('/LoginPage'); // Redirect to login page after logout
  };

  return (
    <div>
      <NavigationBar onLogout={handleLogout} />
      <h1>Welcome to the Home Page!</h1>
      <p>Please enter the URL link:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter ..."
          required
        />
        <button  type="submit" disabled={isLoading}>
          {isLoading  ? 'Sending...' : 'Submit' }
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>You will be redirected to another page after clicking submit</p>
    </div>
  );
}

export default HomePage;