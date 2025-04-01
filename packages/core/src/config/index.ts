import { BackOfficeConfig } from "./types";
import { getDefaultsForEnvironment } from "./default";
import deepmerge from "deepmerge";

// Export configuration types
export * from "./types";

// Export default configuration
export { defaultConfig, productionDefaults, developmentDefaults } from "./default";

// Export configuration loader
export { loadConfig } from "./loader";

// Export configuration functions
export function defineConfig(config: Partial<BackOfficeConfig>): BackOfficeConfig {
    const env = config.env || (process.env.NODE_ENV as 'development' | 'production') || 'development';

    const envDefaults = getDefaultsForEnvironment(env);

    const mergedConfig = deepmerge(envDefaults as any, config as any, {
        arrayMerge: (_: unknown[], sourceArray: unknown[]) => sourceArray,
    }) as BackOfficeConfig;


    validateConfig(mergedConfig);

    return mergedConfig;
}

/**
 * Validate the config
 * @param config - The config to validate
 * @throws Error if the config is invalid
 */

function validateConfig(config: BackOfficeConfig): void {
    if (!config.company.name) {
        throw new Error("Company name is required");
    }

    if (config.database?.type !== 'sqlite' && !config.database?.url) {
        if (!config.database?.url && !(config.database?.host && config.database?.port && config.database?.username && config.database?.password && config.database?.database)) {
            throw new Error("Database configuration is required");
        }
    }
}