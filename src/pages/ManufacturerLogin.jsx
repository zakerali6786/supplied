import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ManufacturerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWalletConnect = () => {
    toast.success('Wallet connected! Redirecting...');
    setTimeout(() => navigate('/manufacturer'), 1500);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Login successful!');
      navigate('/manufacturer');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-96 p-8 rounded-xl border border-slate-700/50 relative shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 p-1 hover:bg-slate-700/50 rounded transition-colors text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Manufacturer Login</h2>
          <p className="text-slate-400 text-sm">Choose your login method</p>
        </div>

        {/* Connect Wallet Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWalletConnect}
          className="btn-primary w-full mb-4 flex items-center justify-center gap-2"
        >
          <Wallet size={18} />
          Connect Wallet
        </motion.button>

        {/* OR Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-700/50" />
          <span className="text-slate-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-slate-700/50" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="input-field w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field w-full"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="btn-secondary w-full"
          >
            {isLoading ? 'Logging in...' : 'Login with Email'}
          </motion.button>
        </form>

        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-slate-400 hover:text-white text-sm transition-colors"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default ManufacturerLogin;
