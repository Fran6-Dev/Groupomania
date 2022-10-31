import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from '../../pages/Feed';
import Profil from '../../pages/Profil';
import Login from '../../pages/Login';
import Navbar from '../Navbar';

const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Feed />} />
      </Routes>
    </Router>
  );
};

export default index;