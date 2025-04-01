import fs from 'fs';
import path from 'path';
import { BackOfficeConfig } from "./types";
import { Logger } from '../utils/logger';

const logger = new Logger('ConfigLoader');


/**
 * Loads the Back Office configuration
 * @param configPath - The path to the configuration file
 * @param defaults - The default configuration
 * @returns The loaded configuration
 */


export function loadConfig(configPath: string, defaultConfig: Partial<BackOfficeConfig>): BackOfficeConfig {
    logger.debug(`Loading config from ${configPath}`);
    
    try {
        // Resolve the full path to the config file
        const fullPath = path.isAbsolute(configPath) ? configPath : path.resolve(process.cwd(), configPath);

        // Check if the file exists
        if (!fs.existsSync(fullPath)) {
            return defaultConfig as BackOfficeConfig;
        }

        const config = import(fullPath);
        return { ...defaultConfig, ...config } as BackOfficeConfig;

    } catch (error) {
        console.error(`Error loading config from ${configPath}:`, error);
        return defaultConfig as BackOfficeConfig;
    }
}
