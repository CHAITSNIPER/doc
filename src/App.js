import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextEditor from './Components/TextEditor';
import './all.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
