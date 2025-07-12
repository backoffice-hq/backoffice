import { createDrizzleClient } from './client';
import { runMigrations, isDatabaseInitialized } from './migrations';
import { runSeeds, isSeedingComplete } from './seeds';
import { getDatabaseConfig, ensureDataDirectory } from './config/local';
import { DatabaseConfig } from './types';

/**
 * Database setup result
 */
export interface DatabaseSetupResult {
  client: any;
  config: DatabaseConfig;
  isInitialized: boolean;
  isSeeded: boolean;
}

/**
 * Complete database setup process
 * @param config - Optional database configuration (defaults to environment-based config)
 * @returns Database setup result
 */
export async function setupDatabase(config?: DatabaseConfig): Promise<DatabaseSetupResult> {
  const dbConfig = config || getDatabaseConfig();
  
  console.log('🔧 Setting up database...');
  console.log('Database type:', dbConfig.type);
  console.log('Database path/url:', dbConfig.database || dbConfig.url);
  
  try {
    // Ensure data directory exists for SQLite
    if (dbConfig.type === 'sqlite') {
      ensureDataDirectory();
    }
    
    // Create database client
    const client = await createDrizzleClient(dbConfig);
    console.log('✅ Database connection established');
    
    // Check if database is initialized
    const isInitialized = await isDatabaseInitialized(client, dbConfig.type);
    
    // Run migrations if needed
    if (!isInitialized || dbConfig.migrations?.runOnStartup) {
      await runMigrations(client, dbConfig.type);
    }
    
    // Check if seeding is complete
    const isSeeded = await isSeedingComplete(client, dbConfig.type);
    
    // Run seeds if needed
    if (!isSeeded) {
      await runSeeds(client, dbConfig.type);
    }
    
    console.log('🎉 Database setup completed successfully');
    
    return {
      client,
      config: dbConfig,
      isInitialized: true,
      isSeeded: true
    };
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw new Error(`Database setup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Initialize database with error handling and retry logic
 * @param maxRetries - Maximum number of retry attempts
 * @param retryDelay - Delay between retries in milliseconds
 */
export async function initializeDatabaseWithRetry(
  maxRetries: number = 3,
  retryDelay: number = 2000
): Promise<DatabaseSetupResult> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Database initialization attempt ${attempt}/${maxRetries}`);
      
      const result = await setupDatabase();
      console.log('✅ Database initialized successfully');
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.error(`❌ Database initialization attempt ${attempt} failed:`, lastError.message);
      
      if (attempt < maxRetries) {
        console.log(`⏳ Retrying in ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  throw new Error(`Database initialization failed after ${maxRetries} attempts. Last error: ${lastError?.message}`);
}

/**
 * Test database connection
 */
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const config = getDatabaseConfig();
    const client = await createDrizzleClient(config);
    
    // Simple test query
    if (config.type === 'postgres') {
      await (client as any).execute('SELECT 1');
    } else {
      await (client as any).get('SELECT 1');
    }
    
    console.log('✅ Database connection test passed');
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
} 