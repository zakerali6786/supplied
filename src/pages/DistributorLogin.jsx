import React from 'react';
import { useNavigate } from 'react-router-dom';

const DistributorLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto mt-24 glass-card p-6">
      <h2 className="text-2xl font-semibold mb-4">Distributor Login</h2>
      <p className="text-slate-300 mb-4">Placeholder login page for distributor. I'll wire the auth flow next.</p>
      <div className="flex gap-2">
        <button
          className="btn-primary"
          onClick={() => navigate('/distributor')}
        >
          Continue to Dashboard
        </button>
        <button
          className="btn-ghost"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DistributorLogin;
