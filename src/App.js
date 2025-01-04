import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Question from './components/Question';
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Question" element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;
