import React from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatAddress } from '../utils/helpers';

const WalletConnect = () => {
  const { walletAddress, isConnecting, connectWallet, disconnectWallet } = useApp();

  if (walletAddress) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card px-4 py-2 flex items-center gap-3"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-mono text-sm text-slate-300">
          {formatAddress(walletAddress)}
        </span>
        <button
          onClick={disconnectWallet}
          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
          title="Disconnect"
        >
          <LogOut size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={connectWallet}
      disabled={isConnecting}
      className="btn-primary flex items-center gap-2"
    >
      <Wallet size={20} />
      {isConnecting ? (
        <>
          <span>Connecting...</span>
          <div className="spinner w-4 h-4" />
        </>
      ) : (
        <span>Connect Wallet</span>
      )}
    </motion.button>
  );
};

export default WalletConnect;
