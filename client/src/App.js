import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListContract from './pages/ListContract';
import UploadContract from './pages/UploadContract';
import Details from './pages/Details';
import Navigation from './components/Navigation';
import SelectContract from './pages/SelectContract';
import PersonalData from './pages/PersonalData';
import ContentModifier from './pages/ContentModifier';

function App() {

  return (
    <>

      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListContract />} />
          <Route path="/upload" element={<UploadContract />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/create" element={<SelectContract />} />
          <Route path="/create/:id" element={<PersonalData />} />
          <Route path="/create/:id/content" element={<ContentModifier />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;