import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowLeft, Download, Copy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { mockContract } from '../services/mockContract';
import { useApp } from '../context/AppContext';
import { generateDeepLink, copyToClipboard } from '../utils/helpers';
import QRDecodeAnimation from '../components/QRDecodeAnimation';
import LoadingSpinner from '../components/LoadingSpinner';

const ManufacturerDashboard = () => {
  const navigate = useNavigate();
  const { walletAddress, isInitialized } = useApp();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [loading, setLoading] = useState(false);
  const [createdBatch, setCreatedBatch] = useState(null);
  const [qrReady, setQrReady] = useState(false);

  const onSubmit = async (data) => {
    if (!isInitialized) {
      toast.error('Contract not initialized. Please reconnect wallet.');
      return;
    }

    setLoading(true);
    try {
      const result = await mockContract.createBatch(
        data.productName,
        parseInt(data.batchSize),
        data.location
      );

      setCreatedBatch({
        ...result,
        productName: data.productName,
        batchSize: data.batchSize,
        location: data.location,
      });

      toast.success('Batch created successfully!');
      reset();
    } catch (error) {
      console.error('Failed to create batch:', error);
      toast.error('Failed to create batch. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBatchId = () => {
    copyToClipboard(createdBatch.batchId);
    toast.success('Batch ID copied!');
  };

  const handleCopyLink = () => {
    const link = generateDeepLink(createdBatch.batchId);
    copyToClipboard(link);
    toast.success('Deep link copied!');
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `QR-${createdBatch.batchId}.png`;
      link.href = url;
      link.click();
      toast.success('QR code downloaded!');
    }
  };

  const handleCreateAnother = () => {
    setCreatedBatch(null);
    setQrReady(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
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

          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!createdBatch ? (
          /* Creation Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="glass-card p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Create New Batch
                </h2>
                <p className="text-slate-400">
                  Register a new product batch on the blockchain
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    {...register('productName', { required: 'Product name is required' })}
                    type="text"
                    placeholder="e.g., Premium Coffee Beans"
                    className="input-field w-full"
                  />
                  {errors.productName && (
                    <p className="text-red-400 text-sm mt-1">{errors.productName.message}</p>
                  )}
                </div>

                {/* Batch Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Batch Size (units) *
                  </label>
                  <input
                    {...register('batchSize', {
                      required: 'Batch size is required',
                      min: { value: 1, message: 'Minimum 1 unit' },
                    })}
                    type="number"
                    placeholder="e.g., 500"
                    className="input-field w-full"
                  />
                  {errors.batchSize && (
                    <p className="text-red-400 text-sm mt-1">{errors.batchSize.message}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Origin Location *
                  </label>
                  <input
                    {...register('location', { required: 'Location is required' })}
                    type="text"
                    placeholder="e.g., Medellin, Colombia"
                    className="input-field w-full"
                  />
                  {errors.location && (
                    <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !isInitialized}
                  className="btn-primary w-full text-lg py-4"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="spinner w-5 h-5" />
                      <span>Creating Batch...</span>
                    </div>
                  ) : (
                    <>
                      <Package size={20} className="mr-2" />
                      Create Batch
                    </>
                  )}
                </motion.button>

                {!isInitialized && (
                  <p className="text-yellow-400 text-sm text-center">
                    Please connect your wallet to create batches
                  </p>
                )}
              </form>
            </div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 mt-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">
                What happens next?
              </h3>
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
            </motion.div>
          </motion.div>
        ) : (
          /* Success State with QR Code */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 mb-6 text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Batch Created Successfully!
              </h2>
              <p className="text-slate-400 mb-6">
                Your product batch has been registered on the blockchain
              </p>

              {/* Batch Details */}
              <div className="bg-dark-100 rounded-xl p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Batch ID</p>
                    <p className="text-white font-mono text-sm break-all">
                      {createdBatch.batchId}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Transaction Hash</p>
                    <p className="text-white font-mono text-sm break-all">
                      {createdBatch.txHash.slice(0, 20)}...
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Product</p>
                    <p className="text-white font-semibold">{createdBatch.productName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Batch Size</p>
                    <p className="text-white font-semibold">{createdBatch.batchSize} units</p>
                  </div>
                </div>
              </div>

              {/* Copy Buttons */}
              <div className="flex gap-3 justify-center">
                <button onClick={handleCopyBatchId} className="btn-secondary flex items-center gap-2">
                  <Copy size={16} />
                  Copy Batch ID
                </button>
                <button onClick={handleCopyLink} className="btn-secondary flex items-center gap-2">
                  <Copy size={16} />
                  Copy Link
                </button>
              </div>
            </motion.div>

            {/* QR Code with Decode Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Product QR Code
              </h3>

              <div className="flex justify-center mb-8">
                <QRDecodeAnimation
                  value={generateDeepLink(createdBatch.batchId)}
                  size={300}
                  onComplete={() => setQrReady(true)}
                />
              </div>

              {qrReady && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <p className="text-slate-400 mb-4">
                    Print and attach this QR code to your product packaging
                  </p>

                  <button onClick={handleDownloadQR} className="btn-primary">
                    <Download size={20} className="mr-2" />
                    Download QR Code
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Create Another */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-8"
            >
              <button onClick={handleCreateAnother} className="btn-secondary">
                Create Another Batch
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerDashboard;
