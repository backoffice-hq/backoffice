import { Module } from "../module";

/**
 * Company configuration
 */
export interface CompanyConfig {
    name: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    address: string;
}

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
    migrations?: {
        path?: string;
        runOnStart?: boolean;
    },
    pool?: {
        min?: number;
        max?: number;
    }
}

/**
 * Module configuration
 */
export interface ModuleConfig {
    module: Module<any>;
    options?: any;
    enabled?: boolean;
}

/**
 * Back Office configuration
 */
export interface BackOfficeConfig {
    company: CompanyConfig;
    database: DatabaseConfig;
    modules: ModuleConfig[];
    env?: 'development' | 'production';
}
