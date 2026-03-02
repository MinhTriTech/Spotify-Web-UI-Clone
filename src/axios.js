// MOCK AXIOS REPLACEMENT FOR OFFLINE DEMO
// This file has been replaced with mock services for offline demonstration.
// All API calls are now handled by mock services in the /data and /services directories.
// 
// Original axios configuration has been removed as the app now works entirely offline
// using localStorage for data persistence.
//
// When switching back to a real backend:
// 1. Restore the original axios configuration
// 2. Update all service files to use axios instead of mock services
// 3. Remove mock data files

console.warn('🔄 Using mock services for offline demo. All API calls are simulated.');

// Export a placeholder object to prevent import errors
export default {
  get: () => Promise.reject(new Error('Mock services are active. Use mock service functions instead.')),
  post: () => Promise.reject(new Error('Mock services are active. Use mock service functions instead.')),
  put: () => Promise.reject(new Error('Mock services are active. Use mock service functions instead.')),
  delete: () => Promise.reject(new Error('Mock services are active. Use mock service functions instead.')),
};
