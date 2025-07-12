import { 
  setupDatabase, 
  initializeDatabaseWithRetry, 
  testDatabaseConnection,
  type DatabaseSetupResult 
} from '@backoffice/database';

/**
 * Application startup status
 */
export interface StartupStatus {
  isInitialized: boolean;
  database: {
    connected: boolean;
    initialized: boolean;
    seeded: boolean;
  };
  errors: string[];
  startupTime: number;
}

/**
 * Global startup state
 */
let startupStatus: StartupStatus = {
  isInitialized: false,
  database: {
    connected: false,
    initialized: false,
    seeded: false
  },
  errors: [],
  startupTime: 0
};

/**
 * Initialize the Back Office application
 */
export async function initializeApplication(): Promise<StartupStatus> {
  const startTime = Date.now();
  
  // Reset startup status
  startupStatus = {
    isInitialized: false,
    database: {
      connected: false,
      initialized: false,
      seeded: false
    },
    errors: [],
    startupTime: 0
  };

  console.log('🚀 Starting Back Office application initialization...');

  try {
    // Test database connection first
    console.log('📡 Testing database connection...');
    const connectionTest = await testDatabaseConnection();
    
    if (!connectionTest) {
      throw new Error('Database connection failed');
    }
    
    startupStatus.database.connected = true;
    console.log('✅ Database connection successful');

    // Initialize database with retry logic
    console.log('🔧 Initializing database...');
    const databaseResult = await initializeDatabaseWithRetry(3, 2000);
    
    startupStatus.database.initialized = databaseResult.isInitialized;
    startupStatus.database.seeded = databaseResult.isSeeded;
    
    console.log('✅ Database initialization successful');
    console.log(`📊 Database: ${databaseResult.config.type}`);
    console.log(`📍 Location: ${databaseResult.config.database || databaseResult.config.url}`);

    // Set application as initialized
    startupStatus.isInitialized = true;
    startupStatus.startupTime = Date.now() - startTime;
    
    console.log(`🎉 Back Office application initialized successfully in ${startupStatus.startupTime}ms`);
    
    return startupStatus;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    startupStatus.errors.push(errorMessage);
    startupStatus.startupTime = Date.now() - startTime;
    
    console.error('❌ Back Office application initialization failed:', errorMessage);
    
    // Don't throw error - let the application start in degraded mode
    return startupStatus;
  }
}

/**
 * Get current startup status
 */
export function getStartupStatus(): StartupStatus {
  return startupStatus;
}

/**
 * Check if application is ready
 */
export function isApplicationReady(): boolean {
  return startupStatus.isInitialized && startupStatus.database.connected;
}

/**
 * Check if database is ready
 */
export function isDatabaseReady(): boolean {
  return startupStatus.database.connected && startupStatus.database.initialized;
}

/**
 * Initialize application on server startup (only runs once)
 */
let initializationPromise: Promise<StartupStatus> | null = null;

export async function ensureApplicationInitialized(): Promise<StartupStatus> {
  // Only initialize once
  if (initializationPromise) {
    return initializationPromise;
  }

  // Only run on server side
  if (typeof window !== 'undefined') {
    return startupStatus;
  }

  console.log('🔄 Ensuring application is initialized...');
  initializationPromise = initializeApplication();
  
  return initializationPromise;
} 