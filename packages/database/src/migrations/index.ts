import { DrizzleClient } from '../client';
import { sql } from 'drizzle-orm';
import { users, companies, sessions } from '../schema';

/**
 * Run database migrations
 * @param client - Drizzle client instance
 * @param dbType - Database type ('postgres' | 'sqlite')
 */
export async function runMigrations(client: DrizzleClient, dbType: 'postgres' | 'sqlite' = 'sqlite') {
  console.log('🚀 Running database migrations...');
  
  try {
    // Create tables if they don't exist
    if (dbType === 'postgres') {
      await createPostgresTables(client as any);
    } else {
      await createSQLiteTables(client as any);
    }
    
    console.log('✅ Database migrations completed successfully');
  } catch (error) {
    console.error('❌ Database migrations failed:', error);
    throw error;
  }
}

/**
 * Create PostgreSQL tables
 */
async function createPostgresTables(client: any) {
  console.log('Creating PostgreSQL tables...');
  
  // Create users table
  await client.execute(sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      is_active BOOLEAN NOT NULL DEFAULT true,
      email_verified BOOLEAN NOT NULL DEFAULT false,
      last_login TIMESTAMP,
      company_id TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  
  // Create companies table
  await client.execute(sql`
    CREATE TABLE IF NOT EXISTS companies (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      website TEXT,
      logo TEXT,
      settings TEXT,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  
  // Create sessions table
  await client.execute(sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      user_agent TEXT,
      ip_address TEXT,
      is_active TEXT NOT NULL DEFAULT 'true',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  
  console.log('✅ PostgreSQL tables created successfully');
}

/**
 * Create SQLite tables
 */
async function createSQLiteTables(client: any) {
  console.log('Creating SQLite tables...');
  
  // Create users table
  await client.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      is_active TEXT NOT NULL DEFAULT 'true',
      email_verified TEXT NOT NULL DEFAULT 'false',
      last_login TEXT,
      company_id TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create companies table
  await client.run(sql`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      website TEXT,
      logo TEXT,
      settings TEXT,
      is_active TEXT NOT NULL DEFAULT 'true',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create sessions table
  await client.run(sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      user_agent TEXT,
      ip_address TEXT,
      is_active TEXT NOT NULL DEFAULT 'true',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('✅ SQLite tables created successfully');
}

/**
 * Check if database has been initialized
 * @param client - Drizzle client instance
 * @param dbType - Database type
 */
export async function isDatabaseInitialized(client: DrizzleClient, dbType: 'postgres' | 'sqlite' = 'sqlite'): Promise<boolean> {
  try {
    if (dbType === 'postgres') {
      const result = await (client as any).execute(sql`
        SELECT COUNT(*) as count FROM information_schema.tables 
        WHERE table_name IN ('users', 'companies', 'sessions')
      `);
      return result.rows[0]?.count === 3;
    } else {
      const result = await (client as any).get(sql`
        SELECT COUNT(*) as count FROM sqlite_master 
        WHERE type='table' AND name IN ('users', 'companies', 'sessions')
      `);
      return result.count === 3;
    }
  } catch (error) {
    console.error('Error checking database initialization:', error);
    return false;
  }
} 