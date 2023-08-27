import React from 'react';

import { StyledEngineProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

import NavBarApp from "./components/NavBarApp"
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ThemePage from './pages/ThemePage';
import Login from './pages/Login'

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router style={{ maxHeight: 1080}}>
        <Grid container>
          <Grid item xs={12} style={{ display: "5rem" }}>
            <NavBarApp />
          </Grid>
          <Grid item xs={12}>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/upload" element={<UploadPage />} />
              <Route exact path="/theme" element={<ThemePage />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </Grid>
        </Grid>

      </Router>
    </StyledEngineProvider>
  );
}


