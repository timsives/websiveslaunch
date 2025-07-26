import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Contact from './pages/Contact.tsx';
import OmOss from './pages/OmOss.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/omoss" element={<OmOss />} />
      </Routes>
    </Router>
  </StrictMode>
);
