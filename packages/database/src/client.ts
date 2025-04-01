import { DatabaseConfig } from "@backoffice/core/src/config/types";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import SQLite from 'better-sqlite3';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { createPgPool, createSqliteConnection } from "./config";

export type DrizzleClient = NodePgDatabase | ReturnType<typeof drizzleSqlite>;

let connectionPool: Pool | SQLite.Database | null = null;
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
            case 'postgres':
                connectionPool = await createPgPool(config);
                drizzleInstant = drizzle(connectionPool as Pool);
                break;
            case 'sqlite':
                connectionPool = await createSqliteConnection(config);
                drizzleInstant = drizzleSqlite(connectionPool as SQLite.Database);
                break;
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