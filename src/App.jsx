import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <h1 className="title">Search for Comics!</h1>
      <Search />
    </div>
  );
}

export default App;
