import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import TextEditor from "./Components/TextEditor";
import './all.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = uuidV4();
    navigate(`/docs/${id}`);
  }, [navigate]);

  return null;
}

function App() {
  return (
   <TextEditor/>
  );
}

export default App;
