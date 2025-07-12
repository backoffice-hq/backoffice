import { ensureApplicationInitialized } from './startup';

/**
 * Server-side initialization
 * This runs once when the server starts
 */
async function initializeServer() {
  console.log('⚡ Starting server initialization...');
  console.log('🔍 Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    isServer: typeof window === 'undefined'
  });
  
  try {
    // Initialize application
    const result = await ensureApplicationInitialized();
    
    console.log('✅ Server initialization completed:', {
      isInitialized: result.isInitialized,
      startupTime: result.startupTime,
      database: result.database,
      errors: result.errors
    });
  } catch (error) {
    console.error('❌ Server initialization failed:', error);
    // Don't crash the server - continue in degraded mode
  }
}

// Initialize server on import (only on server side)
if (typeof window === 'undefined') {
  initializeServer();
}

export { initializeServer }; 