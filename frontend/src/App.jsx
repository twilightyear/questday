import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;