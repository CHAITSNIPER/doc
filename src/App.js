import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import TextEditor from "./Components/TextEditor";
import './all.css';
  

function App() {
  return (
   <TextEditor/>
  );
}

export default App;
