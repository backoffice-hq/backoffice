import { DatabaseConfig } from "@backoffice/core/src/config/types";

export type DrizzleClient = any; // We'll type this properly at runtime

let connectionPool: any = null;
let drizzleInstant: DrizzleClient | null = null;

/**
 * Create the database connection
 * @param config - The database configuration
 * @returns The drizzle client
 */
export async function createDrizzleClient(config: DatabaseConfig): Promise<DrizzleClient> {
    if (drizzleInstant) {
        return drizzleInstant;
    }
    
    try {
        switch (config.type) {
            case 'postgres': {
                // Dynamic import for PostgreSQL
                const { drizzle } = await import('drizzle-orm/node-postgres');
                const { Pool } = await import('pg');
                const { createPgPool } = await import('./config.js');
                
                connectionPool = await createPgPool(config);
                drizzleInstant = drizzle(connectionPool);
                break;
            }
            case 'sqlite': {
                // Dynamic import for SQLite
                const SQLite = await import('better-sqlite3');
                const { drizzle } = await import('drizzle-orm/better-sqlite3');
                const { createSqliteConnection } = await import('./config.js');
                
                connectionPool = await createSqliteConnection(config);
                drizzleInstant = drizzle(connectionPool);
                break;
            }
            default:
                throw new Error(`Unsupported database type: ${config.type}`);
        }

        if (!drizzleInstant) {
            throw new Error('Failed to create database connection');
        }

        return drizzleInstant;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to connect to ${config.type} database: ${errorMessage}`);
    }
}