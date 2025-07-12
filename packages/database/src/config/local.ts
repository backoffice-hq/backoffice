import { DatabaseConfig } from '../types';
import path from 'path';

/**
 * Local development database configuration
 */
export const LOCAL_DATABASE_CONFIG: DatabaseConfig = {
  type: 'sqlite',
  database: path.join(process.cwd(), 'data', 'local.db'), // Use file-based SQLite
  migrations: {
    runOnStartup: true,
    path: path.join(__dirname, '../migrations')
  }
};

/**
 * Production database configuration (PostgreSQL)
 */
export const PRODUCTION_DATABASE_CONFIG: DatabaseConfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/backoffice',
  ssl: process.env.NODE_ENV === 'production',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    runOnStartup: true,
    path: path.join(__dirname, '../migrations')
  }
};

/**
 * Get database configuration based on environment
 */
export function getDatabaseConfig(): DatabaseConfig {
  const env = process.env.NODE_ENV || 'development';
  const dbType = process.env.DATABASE_TYPE as 'postgres' | 'sqlite';
  
  // Force SQLite for development if no DATABASE_TYPE is set
  if (env === 'development' && !dbType) {
    return LOCAL_DATABASE_CONFIG;
  }
  
  switch (env) {
    case 'production':
      return dbType === 'postgres' ? PRODUCTION_DATABASE_CONFIG : LOCAL_DATABASE_CONFIG;
    case 'development':
    case 'test':
    default:
      return dbType === 'postgres' ? PRODUCTION_DATABASE_CONFIG : LOCAL_DATABASE_CONFIG;
  }
}

/**
 * Environment variables template for .env file
 */
export const ENV_TEMPLATE = `# Database Configuration
DATABASE_TYPE=sqlite
DATABASE_URL=
NODE_ENV=development

# For PostgreSQL (production)
# DATABASE_TYPE=postgres
# DATABASE_URL=postgresql://username:password@localhost:5432/backoffice
# NODE_ENV=production
`;

/**
 * Create data directory if it doesn't exist
 */
export function ensureDataDirectory(): void {
  const fs = require('fs');
  const dataDir = path.join(process.cwd(), 'data');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('📁 Created data directory:', dataDir);
  }
} 