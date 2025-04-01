/**
 * Logging utility for Back Office Core
 * Provides consistent logging across the application
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
    timestamp: Date;
    level: LogLevel;
    module: string;
    message: string;
    data?: any;
}

/**
 * Logging class for Back Office modules and components
 */

export class Logger {
    private readonly module: string;

    /**
     * Create a new logger instance
     * @param module - The module name
     */
    constructor(module: string) {
        this.module = module;
    }

    /**
     * Log a debug message
     * @param message - The message to log
     * @param data Optional data to log
     */
    debug(message: string, data?: any) {
        this.log('debug', message, data);
    }

    /**
     * Internal method to handle logging
     * @param level - The log level
     * @param message - The message to log
     * @param data Optional data to log
     */
    private log(level: LogLevel, message: string, data?: any): void {
        const entry: LogEntry = {
            timestamp: new Date(),
            level,
            module: this.module,
            message,
            data
        }
        this.logToConsole(entry);
    }

    /**
     * log to console output
     */
    private logToConsole(entry: LogEntry): void {
        switch (entry.level) {
            case 'debug':
                console.debug(`[${entry.module}] ${entry.timestamp.toISOString()} ${entry.level.toUpperCase()}: ${entry.message}`, entry.data);
                break;
            case 'info':
                console.info(`[${entry.module}] ${entry.timestamp.toISOString()} ${entry.level.toUpperCase()}: ${entry.message}`, entry.data);
                break;
            case 'warn':
                console.warn(`[${entry.module}] ${entry.timestamp.toISOString()} ${entry.level.toUpperCase()}: ${entry.message}`, entry.data);
                break;
            case 'error':
                console.error(`[${entry.module}] ${entry.timestamp.toISOString()} ${entry.level.toUpperCase()}: ${entry.message}`, entry.data);
                break;
        }
    }
}