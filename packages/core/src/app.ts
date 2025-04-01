import { BackOfficeConfig, defaultConfig, loadConfig } from "./config";
import { Logger } from "./utils/logger";
/**
 * Main Back Office application class
 * Act as the container for all modules, plugings, and application features
 */
export class BackOfficeApp {
    private readonly logger = new Logger('BackOfficeApp');

    /**
     * The application configuration
     */
    public readonly config: BackOfficeConfig;

    /**
     * Creates a new Back Office application instance
     * 
     * @param configPath Path to the configuration file or configuration object
     */
    constructor(configPath?: string | Partial<BackOfficeConfig>) {
        this.logger.debug('Initializing BackOfficeApp');

        this.config = typeof configPath === 'string'
            ? loadConfig(configPath, defaultConfig)
            : { ...defaultConfig, ...(configPath || {}) } as BackOfficeConfig;
    }

}
