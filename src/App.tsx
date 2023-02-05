import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
