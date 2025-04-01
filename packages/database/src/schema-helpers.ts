import { uuid, pgTable } from 'drizzle-orm/pg-core';
import { integer as sqliteInteger, sqliteTable } from 'drizzle-orm/sqlite-core';

type SupportedDatabase = 'postgres' | 'sqlite';


/**
 * Get the type of database being used
 * @returns The type of database being used
 */
export function getDatabaseType(): SupportedDatabase {
    const dbType = process.env.DATABASE_TYPE as SupportedDatabase;
    if (!dbType) {
        throw new Error('DATABASE_TYPE is not set');
    }
    return dbType;
}

/**
 * Create a table in the database
 * @param name - The name of the table
 * @returns The table object
 */
export function createTable(name: string, columns: Record<string, any>) {
    const dbType = getDatabaseType();

    switch (dbType) {
        case 'postgres':
            return pgTable(name, columns);
        case 'sqlite':
            return sqliteTable(name, columns);
        default:
            throw new Error(`Unsupported database type: ${dbType}`);
    }
}

/**
 * Create ID column for a table
 * @param table - The table object
 * @returns The ID column
 */
export function id(name: string = 'id'): ReturnType<typeof uuid> | ReturnType<typeof sqliteInteger> {
    const dbType = getDatabaseType();

    switch (dbType) {
        case 'postgres':
            return uuid(name).primaryKey();
        case 'sqlite':
            return sqliteInteger(name).primaryKey();
        default:
            throw new Error(`Unsupported database type: ${dbType}`);
    }
}
