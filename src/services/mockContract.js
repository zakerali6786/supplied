import { sleep } from '../utils/helpers';

/**
 * Mock Contract Service
 * Simulates blockchain contract interactions
 * Replace with real ethers.js contract calls when ready
 */

class MockContractService {
  constructor() {
    this.batches = new Map();
    this.initialized = false;
  }

  /**
   * Initialize contract connection
   */
  async initialize(provider, signer) {
    await sleep(1000); // Simulate network delay
    this.provider = provider;
    this.signer = signer;
    this.initialized = true;
    console.log('✅ Mock Contract Initialized');
    return true;
  }

  /**
   * Create a new batch
   */
  async createBatch(productName, batchSize, location) {
    if (!this.initialized) throw new Error('Contract not initialized');
    
    await sleep(2000); // Simulate transaction time
    
    const batchId = `BATCH-${Date.now()}`;
    const batch = {
      batchId,
      productName,
      batchSize,
      location,
      manufacturer: await this.signer.getAddress(),
      currentHandler: await this.signer.getAddress(),
      status: 'CREATED',
      createdAt: Date.now(),
      history: [
        {
          handler: await this.signer.getAddress(),
          location,
          timestamp: Date.now(),
          action: 'CREATED',
        }
      ]
    };

    this.batches.set(batchId, batch);
    
    return {
      batchId,
      txHash: `0x${Math.random().toString(16).slice(2)}`,
    };
  }

  /**
   * Transfer batch to next handler
   */
  async transferBatch(batchId, nextHandler, location) {
    if (!this.initialized) throw new Error('Contract not initialized');
    
    const batch = this.batches.get(batchId);
    if (!batch) throw new Error('Batch not found');
    
    await sleep(2000); // Simulate transaction time
    
    batch.currentHandler = nextHandler;
    batch.status = 'IN_TRANSIT';
    batch.history.push({
      handler: nextHandler,
      location,
      timestamp: Date.now(),
      action: 'TRANSFERRED',
    });

    this.batches.set(batchId, batch);
    
    return {
      success: true,
      txHash: `0x${Math.random().toString(16).slice(2)}`,
    };
  }

  /**
   * Confirm receipt of batch
   */
  async confirmReceipt(batchId, location) {
    if (!this.initialized) throw new Error('Contract not initialized');
    
    const batch = this.batches.get(batchId);
    if (!batch) throw new Error('Batch not found');
    
    await sleep(2000);
    
    batch.status = 'DELIVERED';
    batch.history.push({
      handler: await this.signer.getAddress(),
      location,
      timestamp: Date.now(),
      action: 'CONFIRMED',
    });

    this.batches.set(batchId, batch);
    
    return {
      success: true,
      txHash: `0x${Math.random().toString(16).slice(2)}`,
    };
  }

  /**
   * Get batch details
   */
  async getBatch(batchId) {
    await sleep(500); // Simulate network delay
    
    const batch = this.batches.get(batchId);
    if (!batch) {
      // Return demo batch if requesting demo ID
      if (batchId.includes('DEMO')) {
        return this.getDemoBatch();
      }
      throw new Error('Batch not found');
    }
    
    return batch;
  }

  /**
   * Get all batches for an address
   */
  async getBatchesByAddress(address) {
    await sleep(500);
    
    const userBatches = Array.from(this.batches.values()).filter(
      batch => batch.manufacturer === address || batch.currentHandler === address
    );
    
    return userBatches;
  }

  /**
   * Get demo batch for testing
   */
  getDemoBatch() {
    return {
      batchId: 'BATCH-2026-001-DEMO',
      productName: 'Premium Coffee Beans',
      batchSize: 500,
      location: 'Colombia',
      manufacturer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      currentHandler: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      status: 'DELIVERED',
      createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
      history: [
        {
          handler: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
          location: 'Medellin, Colombia',
          timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
          action: 'CREATED',
        },
        {
          handler: '0x1234567890123456789012345678901234567890',
          location: 'Miami, FL',
          timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
          action: 'TRANSFERRED',
        },
        {
          handler: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
          location: 'New York, NY',
          timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
          action: 'CONFIRMED',
        }
      ]
    };
  }

  /**
   * Listen to contract events (simulated)
   */
  onBatchCreated(callback) {
    // In real implementation, use: contract.on('BatchCreated', callback)
    console.log('Listening for BatchCreated events');
  }

  onBatchTransferred(callback) {
    // In real implementation, use: contract.on('BatchTransferred', callback)
    console.log('Listening for BatchTransferred events');
  }
}

// Export singleton instance
export const mockContract = new MockContractService();

/**
 * HOW TO REPLACE WITH REAL CONTRACT:
 * 
 * 1. Import ethers:
 *    import { ethers } from 'ethers';
 * 
 * 2. Import your contract ABI:
 *    import contractABI from './SupplyChainABI.json';
 * 
 * 3. Replace initialize() with:
 *    async initialize(provider, signer) {
 *      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
 *      this.contract = new ethers.Contract(contractAddress, contractABI, signer);
 *      return true;
 *    }
 * 
 * 4. Replace each method with actual contract calls:
 *    async createBatch(productName, batchSize, location) {
 *      const tx = await this.contract.createBatch(productName, batchSize, location);
 *      const receipt = await tx.wait();
 *      const batchId = receipt.events[0].args.batchId;
 *      return { batchId, txHash: receipt.transactionHash };
 *    }
 */
