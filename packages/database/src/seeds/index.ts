import { DrizzleClient } from '../client';
import { sql } from 'drizzle-orm';

/**
 * Root admin default credentials
 */
export const DEFAULT_ROOT_ADMIN = {
  email: 'root@backoffice.local',
  password: 'backoffice123', // This should be hashed in production
  firstName: 'Root',
  lastName: 'Admin',
  role: 'root'
};

/**
 * Default company settings
 */
export const DEFAULT_COMPANY = {
  name: 'Back Office',
  description: 'Default company for Back Office system',
  email: 'admin@backoffice.local',
  settings: JSON.stringify({
    timezone: 'UTC',
    language: 'en',
    currency: 'USD',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24h'
  })
};

/**
 * Run database seeds
 * @param client - Drizzle client instance
 * @param dbType - Database type ('postgres' | 'sqlite')
 */
export async function runSeeds(client: DrizzleClient, dbType: 'postgres' | 'sqlite' = 'sqlite') {
  console.log('🌱 Running database seeds...');
  
  try {
    // Create default company
    const companyId = await createDefaultCompany(client as any, dbType);
    
    // Create root admin user
    await createRootAdmin(client as any, dbType, companyId);
    
    console.log('✅ Database seeds completed successfully');
  } catch (error) {
    console.error('❌ Database seeds failed:', error);
    throw error;
  }
}

/**
 * Create default company
 */
async function createDefaultCompany(client: any, dbType: 'postgres' | 'sqlite'): Promise<string> {
  console.log('Creating default company...');
  
  try {
    if (dbType === 'postgres') {
      // Check if company already exists
      const existingCompany = await client.execute(sql`
        SELECT id FROM companies WHERE email = ${DEFAULT_COMPANY.email} LIMIT 1
      `);
      
      if (existingCompany.rows && existingCompany.rows.length > 0) {
        console.log('Default company already exists');
        return existingCompany.rows[0].id;
      }
      
      // Create new company
      const result = await client.execute(sql`
        INSERT INTO companies (name, description, email, settings)
        VALUES (${DEFAULT_COMPANY.name}, ${DEFAULT_COMPANY.description}, ${DEFAULT_COMPANY.email}, ${DEFAULT_COMPANY.settings})
        RETURNING id
      `);
      
      return result.rows[0].id;
    } else {
      // Check if company already exists
      const existingCompany = await client.get(sql`
        SELECT id FROM companies WHERE email = ${DEFAULT_COMPANY.email} LIMIT 1
      `);
      
      if (existingCompany) {
        console.log('Default company already exists');
        return existingCompany.id.toString();
      }
      
      // Create new company
      const result = await client.run(sql`
        INSERT INTO companies (name, description, email, settings)
        VALUES (${DEFAULT_COMPANY.name}, ${DEFAULT_COMPANY.description}, ${DEFAULT_COMPANY.email}, ${DEFAULT_COMPANY.settings})
      `);
      
      return result.lastInsertRowid.toString();
    }
  } catch (error) {
    console.error('Failed to create default company:', error);
    throw error;
  }
}

/**
 * Create root admin user
 */
async function createRootAdmin(client: any, dbType: 'postgres' | 'sqlite', companyId: string) {
  console.log('Creating root admin user...');
  
  try {
    if (dbType === 'postgres') {
      // Check if root admin already exists
      const existingUser = await client.execute(sql`
        SELECT id FROM users WHERE email = ${DEFAULT_ROOT_ADMIN.email} LIMIT 1
      `);
      
      if (existingUser.rows && existingUser.rows.length > 0) {
        console.log('Root admin already exists');
        return;
      }
      
      // Create root admin user
      await client.execute(sql`
        INSERT INTO users (email, password, first_name, last_name, role, is_active, email_verified, company_id)
        VALUES (${DEFAULT_ROOT_ADMIN.email}, ${DEFAULT_ROOT_ADMIN.password}, ${DEFAULT_ROOT_ADMIN.firstName}, ${DEFAULT_ROOT_ADMIN.lastName}, ${DEFAULT_ROOT_ADMIN.role}, true, true, ${companyId})
      `);
    } else {
      // Check if root admin already exists
      const existingUser = await client.get(sql`
        SELECT id FROM users WHERE email = ${DEFAULT_ROOT_ADMIN.email} LIMIT 1
      `);
      
      if (existingUser) {
        console.log('Root admin already exists');
        return;
      }
      
      // Create root admin user
      await client.run(sql`
        INSERT INTO users (email, password, first_name, last_name, role, is_active, email_verified, company_id)
        VALUES (${DEFAULT_ROOT_ADMIN.email}, ${DEFAULT_ROOT_ADMIN.password}, ${DEFAULT_ROOT_ADMIN.firstName}, ${DEFAULT_ROOT_ADMIN.lastName}, ${DEFAULT_ROOT_ADMIN.role}, 'true', 'true', ${companyId})
      `);
    }
    
    console.log('✅ Root admin user created successfully');
  } catch (error) {
    console.error('Failed to create root admin user:', error);
    throw error;
  }
}

/**
 * Check if seeds have been run
 * @param client - Drizzle client instance
 * @param dbType - Database type
 */
export async function isSeedingComplete(client: DrizzleClient, dbType: 'postgres' | 'sqlite' = 'sqlite'): Promise<boolean> {
  try {
    if (dbType === 'postgres') {
      const result = await (client as any).execute(sql`
        SELECT COUNT(*) as count FROM users WHERE role = 'root' AND email = ${DEFAULT_ROOT_ADMIN.email}
      `);
      return result.rows[0]?.count > 0;
    } else {
      const result = await (client as any).get(sql`
        SELECT COUNT(*) as count FROM users WHERE role = 'root' AND email = ${DEFAULT_ROOT_ADMIN.email}
      `);
      return result.count > 0;
    }
  } catch (error) {
    console.error('Error checking seeding status:', error);
    return false;
  }
} 