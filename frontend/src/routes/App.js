import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './Upload';
import Home from './Home';
import ItemDetail from './ItemDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/upload" element={<Upload />}></Route>
        <Route exact path="/items/:id" element={<ItemDetail />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
