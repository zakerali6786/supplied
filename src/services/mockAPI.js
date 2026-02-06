import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { sleep } from '../utils/helpers';

/**
 * Mock API Service
 * Simulates backend API calls
 * Replace with real axios calls when backend is ready
 */

class MockAPIService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
  }

  /**
   * Set JWT token
   */
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Get JWT token
   */
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  /**
   * Clear token (logout)
   */
  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  /**
   * Login (mock)
   */
  async login(walletAddress, role) {
    await sleep(1000);
    
    const mockToken = `mock_jwt_${Date.now()}_${walletAddress.slice(0, 10)}`;
    this.setToken(mockToken);
    
    return {
      token: mockToken,
      user: {
        address: walletAddress,
        role: role,
      }
    };
  }

  /**
   * Get batch history
   */
  async getBatchHistory(batchId) {
    await sleep(800);
    
    // Return mock history
    if (batchId.includes('DEMO')) {
      return {
        batchId,
        events: [
          {
            id: 1,
            action: 'CREATED',
            handler: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            location: 'Medellin, Colombia',
            timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
            temperature: 22,
            humidity: 65,
          },
          {
            id: 2,
            action: 'TRANSFERRED',
            handler: '0x1234567890123456789012345678901234567890',
            location: 'Miami, FL',
            timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
            temperature: 24,
            humidity: 70,
          },
          {
            id: 3,
            action: 'CONFIRMED',
            handler: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
            location: 'New York, NY',
            timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
            temperature: 23,
            humidity: 68,
          }
        ]
      };
    }
    
    return {
      batchId,
      events: []
    };
  }

  /**
   * Get integrity score and status
   */
  async getIntegrityScore(batchId) {
    await sleep(1000);
    
    // Simulate anomaly detection
    if (batchId.includes('DEMO')) {
      return {
        batchId,
        score: 95,
        status: 'SAFE',
        alerts: [],
        checks: {
          temperatureInRange: true,
          humidityInRange: true,
          timelineConsistent: true,
          locationValid: true,
          noUnauthorizedAccess: true,
        }
      };
    }
    
    // Random score for other batches
    const score = Math.floor(Math.random() * 30) + 70;
    const status = score >= 90 ? 'SAFE' : score >= 70 ? 'WARNING' : 'TAMPERED';
    
    return {
      batchId,
      score,
      status,
      alerts: status === 'WARNING' ? [
        {
          type: 'TEMPERATURE',
          severity: 'MEDIUM',
          message: 'Temperature exceeded threshold for 2 hours',
          timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        }
      ] : [],
      checks: {
        temperatureInRange: status !== 'TAMPERED',
        humidityInRange: true,
        timelineConsistent: true,
        locationValid: true,
        noUnauthorizedAccess: status !== 'TAMPERED',
      }
    };
  }

  /**
   * Report anomaly
   */
  async reportAnomaly(batchId, anomalyType, description) {
    await sleep(500);
    
    return {
      success: true,
      message: 'Anomaly reported successfully',
      reportId: `RPT-${Date.now()}`,
    };
  }

  /**
   * Get analytics data
   */
  async getAnalytics(address) {
    await sleep(1000);
    
    return {
      totalBatches: 47,
      activeBatches: 12,
      averageIntegrityScore: 92,
      anomalyRate: 3.2,
      recentActivity: [
        { date: Date.now(), count: 5 },
        { date: Date.now() - 24 * 60 * 60 * 1000, count: 8 },
        { date: Date.now() - 2 * 24 * 60 * 60 * 1000, count: 3 },
      ]
    };
  }
}

// Export singleton instance
export const mockAPI = new MockAPIService();

/**
 * HOW TO REPLACE WITH REAL API:
 * 
 * 1. Create axios instance with interceptors:
 *    const api = axios.create({
 *      baseURL: API_BASE_URL,
 *      headers: { 'Content-Type': 'application/json' }
 *    });
 * 
 * 2. Add auth interceptor:
 *    api.interceptors.request.use(config => {
 *      const token = this.getToken();
 *      if (token) config.headers.Authorization = `Bearer ${token}`;
 *      return config;
 *    });
 * 
 * 3. Replace methods with real API calls:
 *    async getBatchHistory(batchId) {
 *      const response = await api.get(`/batch/${batchId}/history`);
 *      return response.data;
 *    }
 */
