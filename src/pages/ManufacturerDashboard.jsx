import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Plus, CheckCircle, ArrowLeft } from 'lucide-react';
import QRDisplay from '../components/QRDisplay';
import { toast } from 'react-hot-toast';

const ManufacturerDashboard = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [createdBatch, setCreatedBatch] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = () => {
    if (!productName || !manufacturer) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsCreating(true);
    setTimeout(() => {
      const id = `BATCH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
      setCreatedBatch({ id, productName, manufacturer });
      setIsCreating(false);
      toast.success('Batch created successfully!');
    }, 1000);
  };

  const reset = () => {
    setCreatedBatch(null);
    setProductName('');
    setManufacturer('');
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="border-b border-slate-800/50 backdrop-blur-xl sticky top-0 z-40 bg-dark-200/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/role-selection')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-3">
            <Package className="text-blue-400" size={24} />
            <h1 className="text-xl font-bold font-display text-white">
              MANUFACTURER
            </h1>
          </div>

          <div className="w-20" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!createdBatch ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create New Batch */}
              <div className="glass-card p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Create New Batch</h2>
                  <p className="text-slate-400">Register a new product batch</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
                    <input
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g. Premium Coffee Beans"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Manufacturer</label>
                    <input
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                      placeholder="e.g. FreshBeans Co."
                      className="input-field w-full"
                    />
                  </div>

                  <button
                    onClick={handleCreate}
                    disabled={isCreating}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                  >
                    {isCreating ? (
                      <div className="spinner w-4 h-4" />
                    ) : (
                      <Plus size={16} />
                    )}
                    {isCreating ? 'Creating...' : 'Create Batch'}
                  </button>
                </div>
              </div>

              {/* Recent Batches */}
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">Recent Batches</h2>
                <div className="space-y-3">
                  {[
                    { id: 'BATCH-2024-0847', name: 'Acetaminophen 500mg', date: 'Dec 1, 2024' },
                    { id: 'BATCH-2024-1055', name: 'Li-Ion Battery EV-200', date: 'Dec 10, 2024' },
                    { id: 'BATCH-2024-0912', name: 'Organic Olive Oil 1L', date: 'Nov 15, 2024' },
                  ].map((b, i) => (
                    <motion.div
                      key={b.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all border border-slate-700/30 hover:border-cyber-500/30 group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate group-hover:text-cyber-400 transition-colors">
                          {b.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {b.id} · {b.date}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <QRDisplay value={b.id} size={40} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-3">What happens next?</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-400 mt-2" />
                  <span>Batch is registered on the blockchain with your wallet address</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-400 mt-2" />
                  <span>A unique QR code is generated for product verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-400 mt-2" />
                  <span>Download and attach the QR code to your product packaging</span>
                </li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="glass-card p-8 text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Batch Created!</h2>
              <p className="text-slate-400 mb-4">{createdBatch.productName}</p>

              <div className="flex justify-center mb-6">
                <QRDisplay value={`https://chainguard.app/verify?batch=${createdBatch.id}`} label={createdBatch.id} size={200} />
              </div>

              <div className="flex gap-3 justify-center">
                <button onClick={reset} className="btn-secondary">Create Another</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerDashboard;
