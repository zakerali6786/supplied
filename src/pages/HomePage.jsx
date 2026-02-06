import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Package, Truck, Store, ArrowRight } from 'lucide-react';
import WalletConnect from '../components/WalletConnect';
import { useApp } from '../context/AppContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { walletAddress } = useApp();

  const features = [
    {
      icon: Package,
      title: 'Manufacturer',
      description: 'Create and track product batches from origin',
      color: 'text-blue-400',
    },
    {
      icon: Truck,
      title: 'Distributor',
      description: 'Transfer custody and maintain chain integrity',
      color: 'text-yellow-400',
    },
    {
      icon: Store,
      title: 'Retailer',
      description: 'Confirm receipt and prepare for consumers',
      color: 'text-green-400',
    },
    {
      icon: Shield,
      title: 'Consumer',
      description: 'Verify authenticity and product provenance',
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b  rounded-full border-slate-800/50 backdrop-blur-xl sticky top-1 z-40">
        <div className="container px-4 py-4 flex items-center justify-center align-middle gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Shield className="text-cyber-500" size={32} />
            <div>
              <h1 className="text-xl font-bold font-display text-white">
                SUPPLY CHAIN
              </h1>
              <p className="text-xs text-cyber-400 font-mono">INTEGRITY TRACKER</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <WalletConnect />
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 px-6 py-2 bg-cyber-500/10 border border-cyber-500/30 rounded-full"
            >
              <span className="text-cyber-400 text-sm font-mono">
                BLOCKCHAIN-POWERED VERIFICATION
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 text-glow">
              Secure Your
              <br />
              Supply Chain
            </h1>

            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Track, verify, and ensure the integrity of your products from
              manufacturer to consumer with blockchain technology.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(walletAddress ? '/role-selection' : '#')}
              disabled={!walletAddress}
              className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {walletAddress ? (
                <>
                  Get Started
                  <ArrowRight size={20} className="ml-2" />
                </>
              ) : (
                'Connect Wallet to Continue'
              )}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Built for Every Stakeholder
            </h2>
            <p className="text-slate-400 text-lg">
              From production to purchase, transparency at every step
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card-hover p-6 text-center group"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-dark-100 mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Batches Tracked', value: '10K+' },
              { label: 'Integrity Score', value: '98%' },
              { label: 'Active Users', value: '500+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center glass-card p-8"
              >
                <div className="text-5xl font-bold font-display text-cyber-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Supply Chain Integrity Tracker. Powered by Blockchain.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
