
/**
 * Database configuration
 */
export interface DatabaseConfig {
    type: 'postgres' | 'sqlite';
    url?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    ssl?: boolean;
    pool?: {
        min?: number;
        max?: number;
    };
    migrations?: {
        path?: string;
        runOnStartup?: boolean;
    };
}

