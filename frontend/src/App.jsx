import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import CycleSense from './components/CycleSense';
import ModernLogin from './components/ModernLogin';
import Dashboard from './components/Dashboard';
import MenstruationQuiz from './components/MenstruationQuiz';
import Remedies from './components/Remedies';
import EducationalContent from './components/EducationalContent';
import LabMeds from './components/LabMeds'; // Lab directory component
import HospitalDirectory from './components/HospitalDirectory'; // Hospital directory component
import PharmacyMeds from './components/PharmacyMeds'; // Pharmacy directory component
import DoctorDirectory from './components/DoctorDirectory'; // Doctor directory component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<CycleSense />} />
        <Route
          path="/login"
          element={<ModernLogin setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/quiz"
          element={
            isAuthenticated ? <MenstruationQuiz /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/remedies"
          element={
            isAuthenticated ? <Remedies /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/contents"
          element={
            isAuthenticated ? <EducationalContent /> : <Navigate to="/login" replace />
          }
        />
        {/* Route for Lab Directory */}
        <Route
          path="/labs"
          element={isAuthenticated ? <LabMeds /> : <Navigate to="/login" replace />}
        />
        {/* Route for Hospital Directory */}
        <Route
          path="/hospitals"
          element={isAuthenticated ? <HospitalDirectory /> : <Navigate to="/login" replace />}
        />
        {/* Route for Pharmacy Directory */}
        <Route
          path="/pharmacies"
          element={isAuthenticated ? <PharmacyMeds /> : <Navigate to="/login" replace />}
        />
        {/* Route for Doctor Directory */}
        <Route
          path="/doctors"
          element={isAuthenticated ? <DoctorDirectory /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
