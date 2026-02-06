import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';

// Pages
import HomePage from './pages/HomePage';
import RoleSelection from './pages/RoleSelection';
import ManufacturerDashboard from './pages/ManufacturerDashboard';
import DistributorDashboard from './pages/DistributorDashboard';
import RetailerDashboard from './pages/RetailerDashboard';
import ConsumerVerification from './pages/ConsumerVerification';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-dark-200">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            
            {/* Role-based Dashboards */}
            <Route path="/manufacturer" element={<ManufacturerDashboard />} />
            <Route path="/distributor" element={<DistributorDashboard />} />
            <Route path="/retailer" element={<RetailerDashboard />} />
            
            {/* Consumer Routes */}
            <Route path="/verify" element={<ConsumerVerification />} />
            <Route path="/verify/:batchId" element={<ConsumerVerification />} />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0f172a',
                color: '#e2e8f0',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#e2e8f0',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#e2e8f0',
                },
              },
            }}
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
