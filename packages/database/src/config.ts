import fs from 'fs';
import path from 'path';
import { Pool, PoolConfig } from "pg";
import SQLite from 'better-sqlite3';
import { DatabaseConfig } from "./types";
/**
 * Create a database pool for PostgreSQL
 * @param config - The database configuration
 * @returns PostgreSQL database pool
 */
export async function createPgPool(config: DatabaseConfig): Promise<Pool> {
    const poolConfig: PoolConfig = {};

    if (config.url) {
        poolConfig.connectionString = config.url;
    } else {
        poolConfig.host = config.host;
        poolConfig.port = config.port;
        poolConfig.user = config.username;
        poolConfig.password = config.password;
    }

    if (config.ssl) {
        poolConfig.ssl = config.ssl === true ? { rejectUnauthorized: false } : config.ssl;
    }

    if (config.pool) {
        poolConfig.min = config.pool.min;
        poolConfig.max = config.pool.max;
    }

    const pool = new Pool(poolConfig);

    try {
        const client = await pool.connect();
        client.release();
        console.log('Connected to PostgreSQL database successfully');
        return pool;
    } catch (error) {
        console.error('Failed to connect to PostgreSQL database:', error);
        throw error;
    }
}


/**
 * Create a SQLite database connection
 * @param config - The database configuration
 * @returns SQLite database connection
 */
export async function createSqliteConnection(config: DatabaseConfig): Promise<SQLite.Database> {
    try {
        if (config.database === ':memory:') {
            console.log('Using in-memory SQLite database');
            return new SQLite(':memory:');
        }

        const dbPath = config.url || config.database;

        if (!dbPath) {
            throw new Error('No database path specified for SQLite');
        }
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        console.log(`Connected to SQLite database at ${dbPath}`);
        return new SQLite(dbPath);
    } catch (error) {
        console.error('Failed to connect to SQLite database:', error);
        throw error;
    }
}
